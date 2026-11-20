'use client'

import type { ComponentProps } from 'react'
import { IconFileTypeCsv } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export default function ExportCsvButton({
  onClick,
}: {
  onClick: ComponentProps<typeof Button>['onClick']
}) {
  return (
    <Button onClick={onClick} variant='default' size='sm'>
      <IconFileTypeCsv className='size-4' />
      <span>Exportar CSV</span>
    </Button>
  )
}
