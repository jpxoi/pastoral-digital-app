'use client'

import { Spinner } from '@/components/ui/spinner'

import { applyFormErrors } from '@/lib/form-errors'
import { FormServerError } from '@/components/shared/form-server-error'

import imageCompression from 'browser-image-compression'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadDropzone } from '@/lib/uploadthing'
import { useEffect, useId, useState, useTransition } from 'react'
import {
  getMassRegistrationWindow,
  MASS_REGISTRATION_CLOSED_MESSAGE,
} from '@/lib/mass-registration'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'

import { NewSundayMassFormSchema } from '@/schema'

import { Field, FieldLabel, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  IconLoader2,
  IconPhoto,
  IconPhotoBolt,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react'

import { toast } from 'sonner'
import { removeFile } from '@/actions/file'
import { postNewMassRecord } from '@/actions/mass'
import { ClientUploadedFileData } from 'uploadthing/types'
import Image from 'next/image'
import MassRegistrationNotice from './massRegistrationNotice'

interface Evidence {
  key: string
  name: string
  size: number
  type: string
  ufsUrl: string
}

export default function SundayMassForm({
  closesAt,
  onSuccess,
}: {
  closesAt: number
  onSuccess: () => void
}) {
  const formId = useId()
  const [isRegistrationClosed, setIsRegistrationClosed] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(
      () => setIsRegistrationClosed(true),
      Math.max(0, closesAt - Date.now())
    )
    return () => clearTimeout(timeout)
  }, [closesAt])

  const [isOptimizing, setIsOptimizing] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)

  const [evidence, setEvidence] = useState<Evidence | null>(null)

  const [success, setSuccess] = useState<string | null>(null)

  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewSundayMassFormSchema>>({
    resolver: zodResolver(NewSundayMassFormSchema),
    defaultValues: {
      parish: '',
      evidenceFileKey: '',
    },
  })

  const handleBeforeUploadBegin = async (files: File[]) => {
    const window = getMassRegistrationWindow()
    if (!window.isOpen || window.closesAt.getTime() !== closesAt) {
      setIsRegistrationClosed(true)
      return []
    }
    let file = files[0]

    if (!file || !file.type.startsWith('image/')) {
      handleOnUploadError('InvalidFileType')
      return []
    }

    if (file.size > 4 * 1024 * 1024) {
      handleOnUploadError('FileSizeMismatch')
      return files
    }

    const isHeicOrHeif =
      /\.(heic|heif)$/i.test(file.name) ||
      /^image\/(heic|heif)(-sequence)?$/i.test(file.type)

    const options = {
      maxSizeMB: 4,
      maxWidthOrHeight: 1920,
      initialQuality: 0.8,
      useWebWorker: true,
      onProgress: (progress: number) => {
        setOptimizationProgress(progress)
      },
    }

    try {
      setIsOptimizing(true)

      if (isHeicOrHeif) {
        try {
          const { default: heic2any } = await import('heic2any')
          const converted = await heic2any({
            blob: file,
            toType: 'image/jpeg',
            quality: 1,
          })
          const blob = Array.isArray(converted) ? converted[0] : converted
          if (!blob || blob.type !== 'image/jpeg' || !blob.size)
            throw new Error('No se pudo convertir la imagen HEIC/HEIF a JPEG.')
          file = new File([blob], file.name.replace(/\.[^/.]+$/, '.jpg'), {
            type: 'image/jpeg',
            lastModified: file.lastModified,
          })
        } catch (error) {
          // Safari may still decode the original HEIC/HEIF natively.
          console.warn('Failed to convert HEIC/HEIF image to JPEG', { error })
        }
      }

      const hasCompatibleBase =
        file.type === 'image/jpeg' || file.type === 'image/webp'

      for (const fileType of ['image/webp', 'image/jpeg']) {
        try {
          const compressedFile = await imageCompression(file, {
            ...options,
            fileType,
          })

          // Unsupported encoders can silently return PNG instead.
          if (compressedFile.type !== fileType) continue
          if (!compressedFile.size) continue
          if (compressedFile.size > 4 * 1024 * 1024) continue
          if (hasCompatibleBase && compressedFile.size >= file.size) continue

          const extension = fileType === 'image/webp' ? 'webp' : 'jpg'
          const name = `${file.name.replace(/\.[^/.]+$/, '')}.${extension}`
          return [
            new File([compressedFile], name, {
              type: fileType,
              lastModified: file.lastModified,
            }),
          ]
        } catch (error) {
          console.warn('Failed to compress image', { fileType, error })
        }
      }

      return hasCompatibleBase && file.size <= 4 * 1024 * 1024 ? [file] : files
    } catch (error) {
      console.warn('Failed to optimize image, falling back to original', {
        error,
      })
      return files
    } finally {
      setIsOptimizing(false)
      setOptimizationProgress(0)
    }
  }

  const handleOnClientUploadComplete = (
    res: ClientUploadedFileData<{
      uploadedBy: string
    }>[]
  ) => {
    const evidence = res[0]

    form.clearErrors('root.serverError')
    setEvidence(evidence)
    form.setValue('evidenceFileKey', evidence.key, { shouldValidate: true })
  }

  const handleOnUploadError = (error: string) => {
    form.clearErrors('root.serverError')
    setEvidence(null)
    form.resetField('evidenceFileKey')

    if (error.includes(MASS_REGISTRATION_CLOSED_MESSAGE)) {
      setIsRegistrationClosed(true)
      return
    }

    let message = 'No se pudo subir la imagen. Inténtalo de nuevo.'
    if (error.includes('FileSizeMismatch')) {
      message = 'La imagen supera los 4 MB. Selecciona una imagen más pequeña.'
    } else if (error.includes('Ya registraste tu asistencia a misa')) {
      message = error
    } else if (error.includes('Unauthorized')) {
      message =
        'No se pudo autorizar la subida. Vuelve a iniciar sesión e inténtalo de nuevo.'
    } else if (error.includes('InvalidFileType')) {
      message =
        'El archivo seleccionado no es una imagen. Selecciona una imagen.'
    }

    form.setError('evidenceFileKey', { type: 'upload', message })
  }

  const handleOnUploadAborted = () => {
    form.clearErrors('root.serverError')
    setEvidence(null)
    form.resetField('evidenceFileKey')
    form.setError('evidenceFileKey', {
      type: 'upload',
      message:
        'Se canceló la subida. Selecciona la imagen para volver a intentarlo.',
    })
  }

  const handleRemoveEvidence = async () => {
    if (!evidence || isPending || isRemoving) return

    setIsRemoving(true)
    form.clearErrors('root.serverError')
    try {
      const result = await removeFile(evidence.key)
      if (!result.success) {
        form.setError('root.serverError', {
          type: 'server',
          message: 'No se pudo eliminar la imagen. Inténtalo de nuevo.',
        })
        return
      }
      setEvidence(null)
      form.resetField('evidenceFileKey')
      form.clearErrors('root.serverError')
    } catch {
      form.setError('root.serverError', {
        type: 'server',
        message: 'No se pudo eliminar la imagen. Inténtalo de nuevo.',
      })
    } finally {
      setIsRemoving(false)
    }
  }

  const onSubmit = (data: z.infer<typeof NewSundayMassFormSchema>) => {
    const window = getMassRegistrationWindow()
    if (!window.isOpen || window.closesAt.getTime() !== closesAt) {
      setIsRegistrationClosed(true)
      return
    }
    setSuccess(null)
    form.clearErrors()

    // Note: startTransition takes a standard synchronous callback that wraps async code
    startTransition(async () => {
      try {
        const response = await postNewMassRecord(data)

        if (!response.success) {
          applyFormErrors(form, response, ['parish', 'evidenceFileKey'])
          return
        }

        if (response.success) {
          toast.success(response.success)
          setSuccess(response.success)
          form.reset()
          setEvidence(null)
          onSuccess()
        }
      } catch (error) {
        console.error('Submission error', { error })
        applyFormErrors(
          form,
          {
            error:
              'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.',
          },
          []
        )
      }
    })
  }

  const dynamicIcon = ({
    isUploading,
    isDragActive,
  }: {
    isUploading: boolean
    isDragActive: boolean
  }) => {
    if (isDragActive) return <IconPhotoBolt />
    if (isUploading) return <IconLoader2 className='animate-spin' />
    if (isOptimizing) return <IconSettings className='animate-spin' />
    return <IconPhoto />
  }

  const dynamicLabel = ({
    ready,
    isUploading,
    isDragActive,
  }: {
    ready: boolean
    isUploading: boolean
    isDragActive: boolean
  }) => {
    if (isDragActive) return 'Suelta la imagen aquí'
    if (isUploading) return 'Subiendo imagen...'
    if (isOptimizing) return 'Optimizando imagen...'
    if (ready) return 'Añadir evidencia de la misa'
    return 'Cargando...'
  }

  const dynamicButton = ({
    ready,
    isUploading,
    uploadProgress,
  }: {
    ready: boolean
    isUploading: boolean
    uploadProgress: number
  }) => {
    if (isUploading && uploadProgress < 100)
      return `Subiendo ${uploadProgress}%`
    if (isOptimizing && optimizationProgress < 100)
      return `Optimizando ${optimizationProgress}%`
    if (isUploading || isOptimizing)
      return <IconLoader2 className='animate-spin' size={18} />
    if (ready) return 'Seleccionar imagen'
    return 'Cargando...'
  }

  if (isRegistrationClosed)
    return (
      <MassRegistrationNotice
        title='Plazo de registro finalizado'
        description={MASS_REGISTRATION_CLOSED_MESSAGE}
      />
    )

  return (
    <>
      {success ? (
        <div className='rounded-lg border border-emerald-500 bg-emerald-50 p-4 text-sm font-medium text-emerald-600'>
          {success}
        </div>
      ) : (
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-4 text-left'
        >
          <Controller
            control={form.control}
            name='parish'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel htmlFor={`${formId}-${field.name}`}>
                  Parroquia
                </FieldLabel>
                <Input
                  id={`${formId}-${field.name}`}
                  aria-invalid={fieldState.invalid}
                  aria-describedby={
                    fieldState.invalid
                      ? `${formId}-${field.name}-error`
                      : undefined
                  }
                  placeholder='Nombre de la parroquia'
                  {...field}
                  minLength={3}
                  maxLength={45}
                  required
                  disabled={isPending || isRemoving}
                />
                {fieldState.invalid && (
                  <FieldError
                    id={`${formId}-${field.name}-error`}
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <Controller
            control={form.control}
            name='evidenceFileKey'
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid} className='gap-2'>
                <FieldLabel id={`${formId}-${field.name}-label`}>
                  Evidencia
                </FieldLabel>
                <div
                  role='group'
                  aria-labelledby={`${formId}-${field.name}-label`}
                  aria-describedby={
                    fieldState.invalid
                      ? `${formId}-${field.name}-error`
                      : undefined
                  }
                >
                  {evidence ? (
                    <div className='border-border flex items-center justify-between gap-4 rounded-lg border p-1 pr-2'>
                      <div className='flex max-w-60 min-w-0 items-center gap-2 sm:max-w-96'>
                        <Image
                          src={evidence.ufsUrl}
                          alt={evidence.name}
                          width={48}
                          height={48}
                          unoptimized={true}
                          className='aspect-square size-12 shrink-0 rounded-md bg-gray-200 object-cover'
                        />
                        <div className='flex min-w-0 flex-col gap-0.5'>
                          <p className='truncate text-sm font-medium'>
                            {evidence.name}
                          </p>
                          <span
                            className='text-muted-foreground text-xs'
                            role='status'
                            aria-live='polite'
                          >
                            {isRemoving
                              ? 'Eliminando imagen…'
                              : formatFileSize(evidence.size)}
                          </span>
                        </div>
                      </div>
                      <Button
                        type='button'
                        variant='destructive-ghost'
                        className='shrink-0'
                        size='icon'
                        aria-label={
                          isRemoving
                            ? 'Eliminando imagen'
                            : 'Eliminar evidencia'
                        }
                        aria-busy={isRemoving}
                        onClick={() => void handleRemoveEvidence()}
                        disabled={isPending || isRemoving}
                      >
                        {isRemoving ? (
                          <Spinner aria-hidden='true' />
                        ) : (
                          <IconTrash size={16} />
                        )}
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint='sundayMassEvidenceUploader'
                      className='ut-button:bg-background ut-button:text-foreground ut-button:text-sm ut-button:border ut-button:border-border ut-button:border-solid ut-button:after:bg-primary ut-button:w-44'
                      disabled={isOptimizing || isPending || isRemoving}
                      onBeforeUploadBegin={handleBeforeUploadBegin}
                      onClientUploadComplete={handleOnClientUploadComplete}
                      onUploadError={(e) => handleOnUploadError(e.message)}
                      onUploadAborted={handleOnUploadAborted}
                      onChange={() => {
                        form.clearErrors('root.serverError')
                        if (
                          form.getFieldState('evidenceFileKey').error?.type ===
                          'upload'
                        ) {
                          form.clearErrors('evidenceFileKey')
                        }
                      }}
                      uploadProgressGranularity='fine'
                      config={{
                        appendOnPaste: true,
                        mode: 'auto',
                      }}
                      content={{
                        label: dynamicLabel,
                        button: dynamicButton,
                        uploadIcon: dynamicIcon,
                        allowedContent: 'Imágenes de hasta 4MB',
                      }}
                    />
                  )}
                </div>
                {fieldState.invalid && (
                  <FieldError
                    id={`${formId}-${field.name}-error`}
                    errors={[fieldState.error]}
                  />
                )}
              </Field>
            )}
          />

          <FormServerError
            message={form.formState.errors.root?.serverError?.message}
          />
          <div className='flex justify-end'>
            <Button
              disabled={!evidence || isPending || isRemoving}
              aria-busy={isPending}
              type='submit'
            >
              {isPending && <Spinner aria-hidden='true' />}
              {isPending ? 'Registrando…' : 'Registrar misa'}
            </Button>
          </div>
        </form>
      )}
    </>
  )
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1000
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
