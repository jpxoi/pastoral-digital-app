'use server'

import { logger } from '@/lib/logger'
import { auth } from '@clerk/nextjs/server'
import { eq } from 'drizzle-orm'
import { updateTag } from 'next/cache'
import { z } from 'zod'
import { db } from '@/db/drizzle'
import { communitiesTable, programsTable } from '@/db/schema'
import { cacheTags } from '@/lib/cache'
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

const communityNameSchema = z.string().trim().min(1).max(200)
const createSchema = z.object({
  programId: z.uuid(),
  name: communityNameSchema,
})
const updateSchema = z.object({ id: z.uuid(), name: communityNameSchema })

async function canManageCommunities() {
  const { userId } = await auth()
  return !!userId && (await checkPermission(Permission.COMMUNITIES_MANAGE))
}

function invalidateCommunities() {
  updateTag(cacheTags.assignmentCatalog())
  // Community names are embedded in cached catechist and attendance queries.
  updateTag(cacheTags.usersList())
  updateTag(cacheTags.assignments())
}

function communityError(
  error: unknown,
  foreignKeyError: string
): { error: string } {
  // Drizzle wraps the database error as its cause.
  const cause = error instanceof Error && error.cause ? error.cause : error
  if (typeof cause === 'object' && cause !== null && 'code' in cause) {
    if (cause.code === '23505') {
      return { error: 'Ya existe una comunidad con ese nombre en el programa.' }
    }
    if (cause.code === '23503') {
      return { error: foreignKeyError }
    }
  }
  logger.error('Error managing community:', { error })
  return { error: 'No se pudo guardar el cambio. Inténtalo nuevamente.' }
}

export async function createCommunity(values: unknown) {
  if (!(await canManageCommunities())) {
    return { error: 'No estás autorizado para administrar comunidades.' }
  }
  const parsed = createSchema.safeParse(values)
  if (!parsed.success)
    return {
      error:
        'Selecciona un programa e ingresa un nombre de hasta 200 caracteres.',
    }

  try {
    const [program] = await db
      .select({ id: programsTable.id })
      .from(programsTable)
      .where(eq(programsTable.id, parsed.data.programId))
      .limit(1)
    if (!program)
      return { error: 'El programa seleccionado ya no está disponible.' }
    await db.insert(communitiesTable).values(parsed.data)
    invalidateCommunities()
    return { success: 'Comunidad creada correctamente.' }
  } catch (error) {
    return communityError(
      error,
      'El programa seleccionado ya no está disponible.'
    )
  }
}

export async function updateCommunity(values: unknown) {
  if (!(await canManageCommunities())) {
    return { error: 'No estás autorizado para administrar comunidades.' }
  }
  const parsed = updateSchema.safeParse(values)
  if (!parsed.success)
    return { error: 'Ingresa un nombre de hasta 200 caracteres.' }

  try {
    // Keep the program fixed so existing assignments remain consistent.
    const updated = await db
      .update(communitiesTable)
      .set({ name: parsed.data.name })
      .where(eq(communitiesTable.id, parsed.data.id))
      .returning({ id: communitiesTable.id })
    if (!updated.length) return { error: 'La comunidad ya no está disponible.' }
    invalidateCommunities()
    return { success: 'Comunidad actualizada correctamente.' }
  } catch (error) {
    return communityError(error, 'La comunidad ya no está disponible.')
  }
}

export async function deleteCommunity(id: unknown) {
  if (!(await canManageCommunities())) {
    return { error: 'No estás autorizado para administrar comunidades.' }
  }
  const parsed = z.uuid().safeParse(id)
  if (!parsed.success) return { error: 'La comunidad no es válida.' }

  try {
    // The restrictive foreign key also protects against concurrent assignments.
    const deleted = await db
      .delete(communitiesTable)
      .where(eq(communitiesTable.id, parsed.data))
      .returning({ id: communitiesTable.id })
    if (!deleted.length) return { error: 'La comunidad ya no está disponible.' }
    invalidateCommunities()
    return { success: 'Comunidad eliminada correctamente.' }
  } catch (error) {
    return communityError(
      error,
      'No se puede eliminar una comunidad con catequistas asignados. Modifica sus asignaciones antes de eliminarla.'
    )
  }
}
