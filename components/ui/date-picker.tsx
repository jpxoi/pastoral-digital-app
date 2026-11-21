'use client'

import * as React from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { es } from 'date-fns/locale'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { format } from 'date-fns'

interface DatePickerProps extends Omit<
  React.ComponentProps<typeof Button>,
  'value' | 'onChange'
> {
  value?: Date
  onChange?: (date: Date | undefined) => void
  id?: string
  placeholder?: string
  disabled?: boolean
  minDate?: Date
  maxDate?: Date
}

const DatePicker = ({
  value,
  onChange,
  id,
  placeholder,
  disabled,
  minDate,
  maxDate,
  ...props
}: DatePickerProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          {...props}
          id={id}
          className='w-full min-w-0 justify-between gap-2 font-normal'
          disabled={disabled}
        >
          <span
            className={value ? 'truncate' : 'text-muted-foreground truncate'}
          >
            {value
              ? format(value, 'dd/MM/yyyy')
              : placeholder || 'Seleccionar fecha'}
          </span>
          <IconCalendar className='size-3.5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className='max-h-(--radix-popover-content-available-height) w-auto max-w-[calc(100vw-2rem)] overflow-auto p-0'
        align='start'
        collisionPadding={16}
      >
        <Calendar
          locale={es}
          mode='single'
          defaultMonth={value}
          startMonth={minDate ?? new Date(new Date().getFullYear() - 100, 0)}
          endMonth={maxDate ?? new Date(new Date().getFullYear() + 10, 11)}
          disabled={[
            ...(minDate ? [{ before: minDate }] : []),
            ...(maxDate ? [{ after: maxDate }] : []),
          ]}
          selected={value}
          captionLayout='label'
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
