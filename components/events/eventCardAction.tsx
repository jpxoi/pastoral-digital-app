import { checkRole } from '@/lib/roles'
import { UserRole } from '@/types'
import { Button } from '../ui/button'
import Link from 'next/link'
import { SelectEvent } from '@/db/schema'
import { getRelativeEventDate } from '@/lib/events'

export async function EventCardAction({
  id,
  date,
}: {
  id: SelectEvent['id']
  date: Date
}) {
  const isAdmin = await checkRole(UserRole.ADMIN)

  return (
    <div className='flex gap-2'>
      {isAdmin ? (
        <Button asChild variant='link' className='text-primary h-6 p-1'>
          <Link href={`/admin/events/${id}`}>Ver Asistencia</Link>
        </Button>
      ) : (
        <span className='text-muted-foreground text-sm'>
          {getRelativeEventDate(new Date(date))}
        </span>
      )}
    </div>
  )
}
