'use client'

import { useRef, useState } from 'react'
import { IconFileTypePdf, IconLoader2 } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import {
  filenameFromContentDisposition,
  PDF_FILENAMES,
} from '@/lib/pdf-filenames'

export default function ExportMassesPdfButton() {
  const [pending, setPending] = useState(false)
  const busy = useRef(false)

  async function download() {
    if (busy.current) return
    busy.current = true
    setPending(true)

    try {
      const response = await fetch('/api/admin/masses/pdf')
      if (!response.ok) {
        const failure = await response.json().catch(() => null)
        throw new Error(failure?.error || 'No se pudo generar el PDF.')
      }

      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = filenameFromContentDisposition(
        response.headers.get('Content-Disposition'),
        PDF_FILENAMES.attendanceMasses
      )
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(url), 60_000)
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'No se pudo generar el PDF.'
      )
    } finally {
      busy.current = false
      setPending(false)
    }
  }

  return (
    <Button
      size='sm'
      onClick={() => void download()}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? <IconLoader2 className='animate-spin' /> : <IconFileTypePdf />}
      {pending ? 'Generando PDF...' : 'Exportar PDF'}
    </Button>
  )
}
