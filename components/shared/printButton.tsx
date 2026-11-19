'use client'

import { IconPrinter } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export default function PrintButton() {
  return (
    <Button
      type='button'
      variant='outline'
      size='sm'
      onClick={() => window.print()}
      className='print:hidden'
    >
      <IconPrinter className='size-4' />
      Imprimir
    </Button>
  )
}
