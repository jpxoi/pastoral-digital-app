'use client'

import imageCompression from 'browser-image-compression'
import { zodResolver } from '@hookform/resolvers/zod'
import { UploadDropzone } from '@/lib/uploadthing'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import heic2any from 'heic2any'
import { z } from 'zod'

import { NewSundayMassFormSchema } from '@/schema'

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
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

interface Evidence {
  fileHash: string
  key: string
  name: string
  size: number
  type: string
  ufsUrl: string
}

export default function SundayMassForm() {
  const [isOptimizing, setIsOptimizing] = useState(false)
  const [optimizationProgress, setOptimizationProgress] = useState(0)

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

  const handleBeforeUploadBegin = async (files: File[]) => {
    let file = files[0]

    if (!file || !file.type.startsWith('image/')) {
      handleOnUploadError('InvalidFileType')
      return []
    }

    if (file.size > 4 * 1024 * 1024) {
      handleOnUploadError('FileSizeMismatch')
      return files
    }

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
      onProgress: (progress: number) => {
        setOptimizationProgress(progress)
      },
    }

    try {
      setIsOptimizing(true)

      if (
        file.name.toLowerCase().endsWith('.heic') ||
        file.name.toLowerCase().endsWith('.heif')
      ) {
        const converted = await heic2any({ blob: file, toType: 'image/jpeg' })
        file = new File(
          Array.isArray(converted) ? converted : [converted],
          file.name.replace(/\.[^/.]+$/, '.jpg'),
          { type: 'image/jpeg' }
        )
      }

      const compressedFile = await imageCompression(file, options)
      return [compressedFile]
    } catch (error) {
      console.error(error)
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

    setError(null)
    setEvidence(evidence)
    form.setValue('evidenceFileKey', evidence.key, { shouldValidate: true })
    form.setValue('evidenceFileHash', evidence.fileHash, {
      shouldValidate: true,
    })
  }

  const handleOnUploadError = (error: string) => {
    if (error.includes('FileSizeMismatch')) {
      setError('El archivo excede el tamaño máximo permitido (4MB).')
    } else if (error.includes('Unauthorized')) {
      setError('No tienes permiso para subir este archivo.')
    } else if (error.includes('InvalidFileType')) {
      setError('El archivo debe ser una imagen.')
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
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='evidenceFileKey'
              render={() => (
                <FormItem>
                  <FormLabel>Evidencia</FormLabel>
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
                        disabled={isPending}
                      >
                        <IconTrash size={16} />
                      </Button>
                    </div>
                  ) : (
                    <UploadDropzone
                      endpoint='massEvidenceUploader'
                      className='ut-button:bg-background ut-button:text-foreground ut-button:text-sm ut-button:border ut-button:border-border ut-button:border-solid ut-button:after:bg-primary ut-button:w-44'
                      disabled={isOptimizing}
                      onBeforeUploadBegin={handleBeforeUploadBegin}
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
                        uploadIcon: dynamicIcon,
                        allowedContent: 'Imágenes de hasta 4MB',
                      }}
                    />
                  )}
                  <FormMessage />
                  <FormDescription>
                    La imagen seleccionada será procesada y optimizada
                    localmente antes de su envío.
                  </FormDescription>
                </FormItem>
              )}
            />

            {error && (
              <div className='text-destructive rounded-lg border border-red-500 bg-red-50 p-4 text-sm font-medium'>
                {error}
              </div>
            )}
            <Button disabled={!evidence || isPending} type='submit'>
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

const formatFileSize = (bytes: number) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1000
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
