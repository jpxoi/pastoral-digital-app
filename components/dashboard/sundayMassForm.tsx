'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { NewSundayMassFormSchema } from '@/schema'

import { Button } from '@/components/ui/button'
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
import { UploadButton } from '@/lib/uploadthing'
import { useState, useTransition } from 'react'
import { IconFile, IconLoader2, IconTrash } from '@tabler/icons-react'
import { postNewMassRecord } from '@/actions/mass'

export default function SundayMassForm() {
  const [fileName, setFileName] = useState<string>('')
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [fileUploadError, setFileUploadError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof NewSundayMassFormSchema>>({
    resolver: zodResolver(NewSundayMassFormSchema),
    defaultValues: {
      parish: '',
      evidenceUrl: '',
    },
  })

  const onSubmit = async (data: z.infer<typeof NewSundayMassFormSchema>) => {
    setSuccess(null)
    setError(null)
    setFileUploadError(null)

    startTransition(async () => {
      await postNewMassRecord(data)
        .then((response: { success?: string; error?: string }) => {
          if (response.error) {
            setError(response.error)
            return
          }

          if (response.success) {
            setSuccess(response.success)
            form.reset()
            setFileName('')
            setFileUploadError(null)
          }
        })
        .catch((error) => {
          setError(
            'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.'
          )
        })
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
                    <Input placeholder='Nombre de la parroquia' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name='evidenceUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidencia</FormLabel>
                  {field.value ? (
                    <div className='flex flex-row items-center justify-between gap-4 rounded-md border border-dashed border-muted-foreground bg-muted p-2 text-primary'>
                      <div className='flex flex-row items-center gap-2 text-muted-foreground'>
                        <IconFile size={20} />
                        <span className='truncate text-sm font-medium text-muted-foreground'>
                          {fileName}
                        </span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                        onClick={() => {
                          field.onChange('')
                          setFileName('')
                        }}
                      >
                        <IconTrash className='size-4' />
                      </Button>
                    </div>
                  ) : (
                    <div className='flex flex-row items-center justify-start gap-2'>
                      <UploadButton
                        className='ut-button:cursor-pointer ut-button:border ut-button:border-input ut-button:bg-background ut-button:text-sm ut-button:text-accent-foreground ut-button:hover:bg-accent ut-button:hover:text-accent-foreground ut-allowed-content:hidden ut-button:ut-readying:opacity-50'
                        content={{
                          button({ ready, uploadProgress, isUploading }) {
                            if (isUploading) {
                              if (uploadProgress === 100) {
                                return (
                                  <div className='z-50 text-white'>
                                    <IconLoader2 className='animate-spin' />
                                  </div>
                                )
                              }
                              return <div>{uploadProgress}%</div>
                            }
                            if (ready) return <div>Subir archivo</div>
                            return 'Cargando...'
                          },
                        }}
                        endpoint='imageUploader'
                        onUploadBegin={() => {
                          setFileUploadError(null)
                        }}
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].ufsUrl)
                          setFileName(res[0].name)
                          setFileUploadError(null)
                        }}
                        onUploadError={(error: Error) => {
                          field.onChange('')
                          setFileName('')
                          setError(
                            'Ha ocurrido un error al subir la imagen. Asegúrate de que la imagen no exceda los 4 MB.'
                          )
                        }}
                      />
                    </div>
                  )}
                  <FormDescription>
                    Sube como evidencia de tu participación una foto de la
                    celebración (máx. 4MB), o un documento con tu reflexión
                    sobre el evangelio del día en formato PDF o Word (máx. 1MB).
                  </FormDescription>
                  <FormMessage />
                  {fileUploadError && (
                    <p className='text-sm font-medium text-destructive'>
                      {fileUploadError}
                    </p>
                  )}
                </FormItem>
              )}
            />
            {error && (
              <div className='rounded-lg border border-red-500 bg-red-50 p-4 text-sm font-medium text-destructive'>
                {error}
              </div>
            )}
            <Button
              disabled={
                !form.getValues('parish') ||
                !form.getValues('evidenceUrl') ||
                isPending
              }
              type='submit'
            >
              {isPending ? (
                <div className='flex items-center gap-2'>
                  <IconLoader2 className='animate-spin' />
                  Procesando...
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
