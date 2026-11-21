'use client'

import * as React from 'react'
import { IconClock } from '@tabler/icons-react'

import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

interface TimePickerProps extends Omit<
  React.ComponentProps<typeof Button>,
  'value' | 'onChange'
> {
  value?: string
  onChange?: (value: string) => void
  /** Minute interval from 1 to 60. Defaults to 1. */
  minuteStep?: number
}

function TimeColumn({
  label,
  value,
  max,
  step = 1,
  onChange,
}: {
  label: string
  value: string
  max: number
  step?: number
  onChange: (value: string) => void
}) {
  const id = React.useId()
  const listRef = React.useRef<HTMLDivElement>(null)
  const selectedRef = React.useRef<HTMLLabelElement>(null)

  React.useEffect(() => {
    const list = listRef.current
    const selected = selectedRef.current
    if (list && selected) {
      list.scrollTop =
        selected.offsetTop - (list.clientHeight - selected.clientHeight) / 2
    }
  }, [value])

  return (
    <div className='flex min-w-0 flex-col gap-1'>
      <span id={id} className='text-muted-foreground text-center text-xs'>
        {label}
      </span>
      <div
        ref={listRef}
        role='radiogroup'
        aria-labelledby={id}
        className='relative h-40 [scrollbar-width:thin] [scrollbar-color:var(--border)_transparent] overflow-y-auto overscroll-contain rounded-md'
      >
        {Array.from({ length: Math.floor(max / step) + 1 }, (_, index) => {
          const option = String(index * step).padStart(2, '0')
          const selected = value === option

          return (
            <label
              key={option}
              ref={selected ? selectedRef : undefined}
              className='relative block cursor-pointer p-0.5'
            >
              <input
                type='radio'
                name={id}
                value={option}
                checked={selected}
                onChange={() => onChange(option)}
                className='peer sr-only'
              />
              <span className='hover:bg-muted peer-checked:bg-primary/10 peer-checked:text-primary peer-focus-visible:ring-ring mx-auto flex h-8 w-10 items-center justify-center rounded-md tabular-nums peer-checked:font-semibold peer-focus-visible:ring-2 peer-focus-visible:ring-inset'>
                {option}
              </span>
            </label>
          )
        })}
      </div>
    </div>
  )
}

function TimePicker({
  value = '',
  onChange,
  className,
  minuteStep = 1,
  ...props
}: TimePickerProps) {
  const [open, setOpen] = React.useState(false)
  const [hour, setHour] = React.useState('00')
  const [minute, setMinute] = React.useState('00')
  const contentRef = React.useRef<HTMLDivElement>(null)
  const step =
    Number.isInteger(minuteStep) && minuteStep >= 1 && minuteStep <= 60
      ? minuteStep
      : 1
  const normalizeMinute = (minutes: string) =>
    String(Math.floor(Number(minutes) / step) * step).padStart(2, '0')

  const updateTime = (hours: string, minutes: string) => {
    const normalizedMinute = normalizeMinute(minutes)
    setHour(hours)
    setMinute(normalizedMinute)
    onChange?.(`${hours}:${normalizedMinute}`)
  }

  const confirm = () => {
    if (!hour || !minute) return
    onChange?.(`${hour.padStart(2, '0')}:${normalizeMinute(minute)}`)
    setOpen(false)
  }

  return (
    <Popover
      open={open}
      onOpenChange={(nextOpen) => {
        if (nextOpen) {
          const [hours, minutes] = value ? value.split(':') : ['00', '00']
          setHour(hours)
          setMinute(normalizeMinute(minutes))
        }
        setOpen(nextOpen)
      }}
    >
      <PopoverTrigger asChild>
        <Button
          {...props}
          type='button'
          variant='outline'
          className={cn(
            'w-full min-w-0 justify-between gap-2 font-normal',
            className
          )}
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value || 'Elegir hora'}
          </span>
          <IconClock className='size-3.5' />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        ref={contentRef}
        align='end'
        collisionPadding={16}
        aria-label='Elegir hora en formato de 24 horas'
        className='max-h-(--radix-popover-content-available-height) w-36 max-w-[calc(100vw-2rem)] gap-2 overflow-y-auto p-2'
        onOpenAutoFocus={(event) => {
          event.preventDefault()
          contentRef.current
            ?.querySelector<HTMLInputElement>('input[type="radio"]:checked')
            ?.focus({ preventScroll: true })
        }}
      >
        <div className='grid grid-cols-2 [&>div:first-child]:border-r [&>div:first-child]:pr-1 [&>div:last-child]:pl-1'>
          <TimeColumn
            label='Horas'
            value={hour}
            max={23}
            onChange={(hours) => updateTime(hours, minute)}
          />
          <TimeColumn
            label='Minutos'
            value={normalizeMinute(minute)}
            max={59}
            step={step}
            onChange={(minutes) => updateTime(hour, minutes)}
          />
        </div>
        <div className='flex justify-end gap-2 border-t pt-2'>
          {value && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='mr-auto'
              onClick={() => {
                onChange?.('')
                setOpen(false)
              }}
            >
              Borrar
            </Button>
          )}
          <Button
            type='button'
            size='sm'
            disabled={!hour || !minute}
            onClick={confirm}
          >
            Listo
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}

export { TimePicker }
