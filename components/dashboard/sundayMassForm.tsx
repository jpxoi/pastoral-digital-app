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
import es from '@/lib/uploadcare/locale/es'
import { IconLoader2 } from '@tabler/icons-react'

import { toast } from 'sonner'
import { getUploadcareSignature, removeFile } from '@/actions/file'
import { postNewMassRecord } from '@/actions/mass'

import { FileUploaderMinimal } from '@uploadcare/react-uploader'
import '@uploadcare/react-uploader/core.css'

const pubKey = process.env.NEXT_PUBLIC_UPLOADCARE_PUBLIC_KEY as string

export default function SundayMassForm() {
  const [isFileUploaded, setIsFileUploaded] = useState<boolean>(false)
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

  const handleOnFileUploadSuccess = (file: {
    name: string
    uuid: string
    cdnUrl: string
    mimeType: string
  }) => {
    form.setValue('evidenceUrl', file.cdnUrl)
    form.setValue('evidenceMimeType', file.mimeType)
    setIsFileUploaded(true)
    toast.success('Archivo subido correctamente.')
    setError(null)
  }

  const handleOnFileRemoved = async (e: { uuid: string | null }) => {
    setIsFileUploaded(false)

    if (!e.uuid) {
      toast.success(
        'El archivo se eliminó correctamente de nuestros servidores.'
      )
      return
    }

    await removeFile(e.uuid)
      .then((res) => {
        if (!res.success) {
          throw new Error(
            'Ocurrió un error al eliminar el archivo. No te preocupes, aún puedes subir uno nuevo.'
          )
        }
        toast.success(
          'El archivo se eliminó correctamente de nuestros servidores.'
        )
      })
      .catch((error) => {
        toast.warning(error.message)
      })
      .finally(() => {
        form.resetField('evidenceUrl')
        form.resetField('evidenceMimeType')
      })
  }

  const onSubmit = async (data: z.infer<typeof NewSundayMassFormSchema>) => {
    setSuccess(null)
    setError(null)

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
          }
        })
        .catch(() => {
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
              render={({}) => (
                <FormItem>
                  <FormLabel>Evidencia</FormLabel>
                  <FileUploaderMinimal
                    maxLocalFileSizeBytes={4000000}
                    multiple={false}
                    accept='image/*,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                    secureUploadsSignatureResolver={async () =>
                      await getUploadcareSignature()
                    }
                    localeDefinitionOverride={{
                      en: es,
                    }}
                    classNameUploader='uc-light'
                    pubkey={pubKey}
                    onFileUploadSuccess={handleOnFileUploadSuccess}
                    onFileRemoved={handleOnFileRemoved}
                    imageShrink='1440x1080 90%'
                  />
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
                !form.getValues('parish') || !isFileUploaded || isPending
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
