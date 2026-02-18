'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { UploadDropzone } from '@/lib/uploadthing'
import { z } from 'zod'

import { NewSundayMassFormSchema } from '@/schema'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { IconLoader2, IconPhoto, IconTrash } from '@tabler/icons-react'

import { toast } from 'sonner'
import { removeFile } from '@/actions/file'
import { postNewMassRecord } from '@/actions/mass'
import { ClientUploadedFileData } from 'uploadthing/types'

interface Evidence {
  fileHash: string
  key: string
  name: string
  size: number
  type: string
  ufsUrl: string
}

export default function SundayMassForm() {
  const [evidence, setEvidence] = useState<Evidence | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewSundayMassFormSchema>>({
    resolver: zodResolver(NewSundayMassFormSchema),
    defaultValues: {
      parish: '',
      evidenceFileKey: '',
      evidenceFileHash: '',
    },
  })

  const handleOnClientUploadComplete = (
    res: ClientUploadedFileData<{
      uploadedBy: string
    }>[]
  ) => {
    const evidence = res[0]

    setError(null)
    setEvidence(evidence)
    form.setValue('evidenceFileKey', evidence.key)
    form.setValue('evidenceFileHash', evidence.fileHash)
  }

  const handleOnUploadError = (error: string) => {
    if (error.includes('FileSizeMismatch')) {
      setError('El archivo excede el tamaño máximo permitido.')
    } else if (error.includes('Unauthorized')) {
      setError('No tienes permiso para subir este archivo.')
    } else {
      setError('Ha ocurrido un error al subir el archivo.')
    }

    setEvidence(null)
    form.resetField('evidenceFileKey')
    form.resetField('evidenceFileHash')
  }

  const handleOnUploadAborted = () => {
    toast.dismiss()
    toast.error('Se canceló la subida del archivo.')

    setEvidence(null)
    form.resetField('evidenceFileKey')
    form.resetField('evidenceFileHash')
  }

  const handleRemoveEvidence = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!evidence) return

    const fileKey = evidence.key

    setEvidence(null)
    form.resetField('evidenceFileKey')
    form.resetField('evidenceFileHash')

    removeFile(fileKey)
      .then((res) => {
        console.log(res)
      })
      .catch((error) =>
        console.error('Network error during background deletion:', error)
      )
  }

  const onSubmit = (data: z.infer<typeof NewSundayMassFormSchema>) => {
    setSuccess(null)
    setError(null)

    // Note: startTransition takes a standard synchronous callback that wraps async code
    startTransition(async () => {
      try {
        const response = await postNewMassRecord(data)

        if ('error' in response) {
          setError(response.error)
          return
        }

        if ('success' in response) {
          setSuccess(response.success)
          form.reset()
          setEvidence(null)
        }
      } catch (error) {
        console.error('Submission error:', error)
        setError('Ocurrió un error inesperado. Por favor, inténtalo de nuevo.')
      }
    })
  }

  return (
    <>
      {success ? (
        <div className='rounded-lg border border-emerald-500 bg-emerald-50 p-4 text-sm font-medium text-emerald-600'>
          {success}
        </div>
      ) : (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className='space-y-4 text-left'
          >
            <FormField
              control={form.control}
              name='parish'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parroquia</FormLabel>
                  <FormControl>
                    <Input
                      placeholder='Nombre de la parroquia'
                      {...field}
                      minLength={3}
                      maxLength={45}
                      required
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='evidenceFileKey'
              render={({}) => (
                <FormItem>
                  <FormLabel>Evidencia</FormLabel>
                  {evidence ? (
                    <div className='border-border flex items-center justify-between gap-4 rounded-lg border p-1 pr-2'>
                      <div className='flex max-w-60 min-w-0 items-center gap-2 sm:max-w-96'>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={evidence.ufsUrl}
                          alt={evidence.name}
                          className='aspect-square size-12 shrink-0 rounded-md bg-gray-200 object-cover'
                        />
                        <div className='flex min-w-0 flex-col gap-0.5'>
                          <p className='truncate text-sm font-medium'>
                            {evidence.name}
                          </p>
                          <span className='text-muted-foreground text-xs'>
                            {formatFileSize(evidence.size)}
                          </span>
                        </div>
                      </div>
                      <Button
                        variant='ghost'
                        className='text-destructive hover:bg-destructive/10 hover:text-destructive shrink-0'
                        size='icon'
                        onClick={handleRemoveEvidence}
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint='massEvidenceUploader'
                      className='ut-button:bg-background ut-button:text-foreground ut-button:text-sm ut-button:border ut-button:border-border ut-button:border-solid ut-button:after:bg-primary ut-button:w-44'
                      onClientUploadComplete={handleOnClientUploadComplete}
                      onUploadError={(e) => handleOnUploadError(e.toString())}
                      onUploadAborted={handleOnUploadAborted}
                      onChange={() => {
                        setError(null)
                      }}
                      uploadProgressGranularity='fine'
                      config={{
                        appendOnPaste: true,
                        mode: 'auto',
                      }}
                      content={{
                        label: dynamicLabel,
                        button: dynamicButton,
                        uploadIcon: <IconPhoto />,
                        allowedContent: 'Imágenes de hasta 4MB',
                      }}
                    />
                  )}

                  <FormMessage />
                </FormItem>
              )}
            />

            {error && (
              <div className='text-destructive rounded-lg border border-red-500 bg-red-50 p-4 text-sm font-medium'>
                {error}
              </div>
            )}
            <Button
              disabled={!form.getValues('parish') || !evidence || isPending}
              type='submit'
            >
              {isPending ? (
                <div className='flex items-center gap-2'>
                  <IconLoader2 className='animate-spin' />
                  Registrando...
                </div>
              ) : (
                'Registrar Misa'
              )}
            </Button>
          </form>
        </Form>
      )}
    </>
  )
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
  if (isUploading) return 'Subiendo archivo...'
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
  if (isUploading && uploadProgress < 100) return `${uploadProgress}%`
  if (isUploading) return <IconLoader2 className='animate-spin' size={18} />
  if (ready) return 'Seleccionar imagen'
  return 'Cargando...'
}

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1000
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
