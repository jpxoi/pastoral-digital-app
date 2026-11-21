import { z } from 'zod'
import type { FormActionError } from '@/types/form-actions'

export function formValidationError(error: z.ZodError): FormActionError {
  const { fieldErrors, formErrors } = z.flattenError(error)
  return {
    fieldErrors,
    ...(formErrors.length ? { error: formErrors.join(' ') } : {}),
  }
}
