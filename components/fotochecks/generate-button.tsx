'use client'

import { useRef, useState } from 'react'
import { IconIdBadge2, IconLoader2 } from '@tabler/icons-react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

export function useFotocheckDownload() {
  const [pending, setPending] = useState(false)
  const busy = useRef(false)

  async function download(userId?: string) {
    if (busy.current) return
    busy.current = true
    setPending(true)
    try {
      const response = await fetch('/api/admin/fotochecks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userId ? { userId } : {}),
      })
      if (!response.ok) {
        const failure = await response.json()
        throw new Error(failure.error || 'No se pudo generar el PDF.')
      }
      const url = URL.createObjectURL(await response.blob())
      const link = document.createElement('a')
      link.href = url
      link.download = userId
        ? 'fotocheck-pastoral.pdf'
        : 'fotochecks-pastoral.pdf'
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

  return { download, pending }
}

export function GenerateFotochecksButton() {
  const { download, pending } = useFotocheckDownload()
  return (
    <Button
      size='sm'
      onClick={() => void download()}
      disabled={pending}
      aria-busy={pending}
    >
      {pending ? <IconLoader2 className='animate-spin' /> : <IconIdBadge2 />}
      {pending ? 'Generando fotochecks...' : 'Generar fotochecks'}
    </Button>
  )
}
