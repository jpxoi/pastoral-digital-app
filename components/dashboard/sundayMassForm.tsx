'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
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
import { UploadButton } from '@/lib/uploadthing'
import { IconFile, IconLoader2, IconTrash } from '@tabler/icons-react'

import { toast } from 'sonner'
import { FileInfoProps } from '@/types'
import { deleteFile } from '@/actions/file'
import { postNewMassRecord } from '@/actions/mass'

export default function SundayMassForm() {
  const [fileInfo, setFileInfo] = useState<FileInfoProps>({
    name: '',
    hash: '',
    key: '',
  })

  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
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

    startTransition(async () => {
      await postNewMassRecord(data, fileInfo.hash)
        .then((response: { success?: string; error?: string }) => {
          if (response.error) {
            setError(response.error)
            return
          }

          if (response.success) {
            setSuccess(response.success)
            form.reset()
            setFileInfo({ name: '', hash: '', key: '' })
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
              name='evidenceUrl'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Evidencia</FormLabel>
                  {field.value ? (
                    <div className='flex flex-row items-center justify-between gap-4 rounded-md border border-dashed border-muted-foreground bg-muted p-2 text-primary'>
                      <div className='flex flex-row items-center gap-2 text-muted-foreground'>
                        <IconFile size={20} />
                        <span className='max-w-56 truncate text-sm font-medium text-muted-foreground sm:max-w-80'>
                          {fileInfo.name}
                        </span>
                      </div>
                      <Button
                        variant='ghost'
                        size='sm'
                        className='text-destructive hover:bg-destructive/10 hover:text-destructive'
                        onClick={async () => {
                          field.onChange('')
                          await deleteFile(fileInfo.key)
                            .then(() => {
                              toast.success(
                                'El archivo se eliminó correctamente.'
                              )
                            })
                            .catch((error) => {
                              toast.warning(
                                'Ocurrió un error al eliminar el archivo. No te preocupes, aún puedes subir uno nuevo.'
                              )
                            })
                            .finally(() => {
                              setFileInfo({ name: '', hash: '', key: '' })
                            })
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
                          setError(null)
                        }}
                        onClientUploadComplete={(res) => {
                          field.onChange(res[0].ufsUrl)
                          setFileInfo({
                            name: res[0].name,
                            hash: res[0].fileHash,
                            key: res[0].key,
                          })
                          setError(null)
                        }}
                        onUploadError={(error: Error) => {
                          field.onChange('')
                          setFileInfo({ name: '', hash: '', key: '' })
                          setError(
                            'Ha ocurrido un error al subir el archivo. Asegúrate de que el archivo no exceda los 4 MB.'
                          )
                        }}
                      />
                    </div>
                  )}
                  <FormDescription>
                    Sube como evidencia de tu participación una foto de la
                    celebración, o un documento con tu reflexión sobre el
                    evangelio del día en formato PDF o Word (máx. 4 MB).
                  </FormDescription>
                  <FormMessage />
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
