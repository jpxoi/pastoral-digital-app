'use client'

import * as React from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { es } from 'date-fns/locale'

import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from '@/components/ui/input-group'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { WheelPicker, WheelPickerWrapper } from '@/components/wheel-picker'

type BirthDateInputProps = Omit<
  React.ComponentProps<'input'>,
  'value' | 'onChange' | 'type'
> & {
  value: string
  onChange: (value: string) => void
}

function parseDate(value: string) {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(value)
  if (!match) return undefined
  const [, day, month, year] = match.map(Number)
  const date = new Date(0)
  date.setFullYear(year, month - 1, day)
  date.setHours(0, 0, 0, 0)
  return date.getFullYear() === year &&
    date.getMonth() === month - 1 &&
    date.getDate() === day
    ? date
    : undefined
}

function formatDate(date: Date) {
  return `${String(date.getDate()).padStart(2, '0')}/${String(date.getMonth() + 1).padStart(2, '0')}/${String(date.getFullYear()).padStart(4, '0')}`
}

function formatInput(value: string) {
  // Browsers may supply an ISO date when autofilling a birthday.
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value.split('-').reverse().join('/')
  }
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length < 2) return digits
  if (digits.length < 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`
}

export function BirthDateInput({
  value,
  onChange,
  disabled,
  className,
  ...props
}: BirthDateInputProps) {
  const isMobile = useIsMobile()
  const [open, setOpen] = React.useState(false)
  const [draft, setDraft] = React.useState({ day: 1, month: 1, year: 2000 })
  const labelId = React.useId()
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const selected = parseDate(value)
  const firstYear = Math.min(1900, selected?.getFullYear() ?? 1900)
  const lastYear = today.getFullYear()
  const lastMonth = draft.year === lastYear ? today.getMonth() + 1 : 12
  const lastDay = Math.min(
    new Date(draft.year, draft.month, 0).getDate(),
    draft.year === lastYear && draft.month === lastMonth ? today.getDate() : 31
  )

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      const initial =
        selected && selected <= today ? selected : new Date(lastYear - 18, 0, 1)
      setDraft({
        day: initial.getDate(),
        month: initial.getMonth() + 1,
        year: initial.getFullYear(),
      })
    }
    setOpen(nextOpen)
  }

  function updateDraft(part: 'day' | 'month' | 'year', nextValue: number) {
    setDraft((previous) => {
      const next = { ...previous, [part]: nextValue }
      next.month = Math.min(
        next.month,
        next.year === lastYear ? today.getMonth() + 1 : 12
      )
      next.day = Math.min(
        next.day,
        new Date(next.year, next.month, 0).getDate(),
        next.year === lastYear && next.month === today.getMonth() + 1
          ? today.getDate()
          : 31
      )
      return next
    })
  }

  const trigger = (
    <InputGroupButton
      size='icon-sm'
      disabled={disabled}
      aria-label='Seleccionar fecha de nacimiento'
      className='size-11 md:size-8'
    >
      <IconCalendar aria-hidden='true' />
    </InputGroupButton>
  )

  const input = (button: React.ReactNode) => (
    <InputGroup className='h-11 md:h-9'>
      <InputGroupInput
        {...props}
        value={value}
        disabled={disabled}
        type='text'
        inputMode='numeric'
        autoComplete='bday'
        placeholder='DD/MM/AAAA'
        maxLength={10}
        className={`text-base md:text-sm ${className ?? ''}`}
        onChange={(event) => {
          let next = event.target.value
          if (
            (event.nativeEvent as InputEvent).inputType ===
              'deleteContentBackward' &&
            value.endsWith('/') &&
            next === value.slice(0, -1)
          )
            next = next.slice(0, -1)
          onChange(formatInput(next))
        }}
      />
      <InputGroupAddon align='inline-end'>{button}</InputGroupAddon>
    </InputGroup>
  )

  if (!isMobile) {
    return (
      <Popover open={open} onOpenChange={handleOpenChange}>
        {input(<PopoverTrigger asChild>{trigger}</PopoverTrigger>)}
        <PopoverContent
          align='end'
          className='w-auto p-0'
          collisionPadding={16}
        >
          <Calendar
            locale={es}
            mode='single'
            captionLayout='dropdown'
            startMonth={new Date(firstYear, 0)}
            endMonth={today}
            disabled={{ after: today }}
            selected={selected}
            defaultMonth={
              selected && selected <= today
                ? selected
                : new Date(lastYear - 18, 0)
            }
            autoFocus
            onSelect={(date) => {
              if (!date) return
              onChange(formatDate(date))
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      handleOnly
      repositionInputs={false}
    >
      {input(<DrawerTrigger asChild>{trigger}</DrawerTrigger>)}
      <DrawerContent className='overflow-y-auto pb-[env(safe-area-inset-bottom)]'>
        <DrawerHeader>
          <DrawerTitle>Fecha de nacimiento</DrawerTitle>
          <DrawerDescription>
            Selecciona el día, mes y año y confirma tu fecha.
          </DrawerDescription>
        </DrawerHeader>
        <div className='mx-auto w-full max-w-sm px-4' data-vaul-no-drag>
          <div className='text-muted-foreground mb-2 grid grid-cols-3 text-center text-sm'>
            <span id={`${labelId}-day`}>Día</span>
            <span id={`${labelId}-month`}>Mes</span>
            <span id={`${labelId}-year`}>Año</span>
          </div>
          <WheelPickerWrapper className='border-border bg-background dark:border-border dark:bg-background w-full'>
            <div
              role='group'
              aria-labelledby={`${labelId}-day`}
              className='flex-1'
            >
              <WheelPicker
                value={draft.day}
                options={Array.from({ length: lastDay }, (_, i) => ({
                  value: i + 1,
                  label: String(i + 1).padStart(2, '0'),
                }))}
                onValueChange={(day) => updateDraft('day', day)}
                visibleCount={16}
                optionItemHeight={36}
              />
            </div>
            <div
              role='group'
              aria-labelledby={`${labelId}-month`}
              className='flex-1'
            >
              <WheelPicker
                value={draft.month}
                options={Array.from({ length: lastMonth }, (_, i) => ({
                  value: i + 1,
                  label: new Intl.DateTimeFormat('es-PE', {
                    month: 'short',
                  }).format(new Date(2000, i, 1)),
                }))}
                onValueChange={(month) => updateDraft('month', month)}
                visibleCount={16}
                optionItemHeight={36}
              />
            </div>
            <div
              role='group'
              aria-labelledby={`${labelId}-year`}
              className='flex-1'
            >
              <WheelPicker
                value={draft.year}
                options={Array.from(
                  { length: lastYear - firstYear + 1 },
                  (_, i) => ({
                    value: lastYear - i,
                    label: String(lastYear - i),
                  })
                )}
                onValueChange={(year) => updateDraft('year', year)}
                visibleCount={16}
                optionItemHeight={36}
              />
            </div>
          </WheelPickerWrapper>
          <p
            aria-live='polite'
            aria-atomic='true'
            className='text-muted-foreground mt-3 text-center text-sm'
          >
            {new Intl.DateTimeFormat('es-PE', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            }).format(new Date(draft.year, draft.month - 1, draft.day))}
          </p>
        </div>
        <DrawerFooter className='mx-auto w-full max-w-sm'>
          <Button
            type='button'
            onClick={() => {
              onChange(
                formatDate(new Date(draft.year, draft.month - 1, draft.day))
              )
              setOpen(false)
            }}
          >
            Confirmar
          </Button>
          <DrawerClose asChild>
            <Button type='button' variant='outline'>
              Cancelar
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
