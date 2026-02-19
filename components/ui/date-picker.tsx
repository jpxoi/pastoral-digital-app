'use client'

import * as React from 'react'
import { CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

interface DatePickerProps {
  value?: Date
  onChange?: (date: Date | undefined) => void
  id?: string
  placeholder?: string
  disabled?: boolean
}

const DatePicker = ({
  value,
  onChange,
  id,
  placeholder,
  disabled,
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          id={id}
          className='w-full justify-between font-normal'
          disabled={disabled}
        >
          {value
            ? format(value, 'PPP', { locale: es })
            : placeholder || 'Seleccionar fecha'}
          <CalendarIcon className='size-3.5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto overflow-hidden p-0' align='end'>
        <Calendar
          mode='single'
          selected={value}
          captionLayout='dropdown'
          onSelect={(date) => {
            onChange?.(date)
            setOpen(false)
          }}
        />
      </PopoverContent>
    </Popover>
  )
}

export { DatePicker }
