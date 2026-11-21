import type { FieldPath, FieldValues, UseFormReturn } from 'react-hook-form'
import type { FormActionError } from '@/types/form-actions'

export function applyFormErrors<T extends FieldValues>(
  form: Pick<UseFormReturn<T>, 'setError' | 'setFocus'>,
  result: Pick<FormActionError, 'error' | 'fieldErrors'>,
  fields: readonly FieldPath<T>[],
  options: { focus?: boolean; fallback?: string } = {}
) {
  let firstField: FieldPath<T> | undefined
  const generalErrors: string[] = result.error ? [result.error] : []

  for (const [name, messages] of Object.entries(result.fieldErrors ?? {})) {
    const message = messages?.[0]
    if (!message) continue

    const field = fields.find((candidate) => candidate === name)
    if (!field) {
      generalErrors.push(message)
      continue
    }
    form.setError(field, { type: 'server', message })
    firstField ??= field
  }

  if (!firstField && !generalErrors.length) {
    generalErrors.push(
      options.fallback ?? 'No se pudo guardar. Inténtalo nuevamente.'
    )
  }
  if (generalErrors.length) {
    form.setError('root.serverError', {
      type: 'server',
      message: generalErrors.join(' '),
    })
  }
  if (firstField && options.focus !== false) {
    const field = firstField
    requestAnimationFrame(() => form.setFocus(field))
  }
  return firstField
}
