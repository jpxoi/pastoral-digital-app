export type FormActionError = {
  error?: string
  fieldErrors?: Record<string, string[] | undefined>
  code?: string
  success?: never
}

export type FormActionResult =
  | { success: string; error?: never; fieldErrors?: never; code?: never }
  | FormActionError
