'use client'

import * as React from 'react'
import { subYears } from 'date-fns'

import { useIsMobile } from '@/hooks/use-mobile'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
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
import { WheelPicker, WheelPickerWrapper } from '@/components/wheel-picker'

type BirthDateInputProps = Pick<
  React.ComponentProps<'input'>,
  'id' | 'name' | 'disabled' | 'className' | 'aria-invalid' | 'aria-describedby'
> & {
  value: string
  onChange: (value: string) => void
  onBlur?: () => void
  ref?: React.RefCallback<HTMLInputElement | HTMLButtonElement>
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

function formatDateInput(value: string) {
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
  const maxDate = subYears(today, 13)
  const selected = parseDate(value)
  const firstYear = Math.min(1900, selected?.getFullYear() ?? 1900)
  const lastYear = maxDate.getFullYear()
  const lastMonth = draft.year === lastYear ? maxDate.getMonth() + 1 : 12
  const lastDay = Math.min(
    new Date(draft.year, draft.month, 0).getDate(),
    draft.year === lastYear && draft.month === lastMonth
      ? maxDate.getDate()
      : 31
  )

  function handleOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      const initial = selected
        ? selected <= maxDate
          ? selected
          : maxDate
        : new Date(today.getFullYear() - 18, 0, 1)
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
        next.year === lastYear ? maxDate.getMonth() + 1 : 12
      )
      next.day = Math.min(
        next.day,
        new Date(next.year, next.month, 0).getDate(),
        next.year === lastYear && next.month === maxDate.getMonth() + 1
          ? maxDate.getDate()
          : 31
      )
      return next
    })
  }

  if (!isMobile) {
    return (
      <Input
        {...props}
        value={value}
        disabled={disabled}
        type='text'
        inputMode='numeric'
        autoComplete='bday'
        placeholder='DD/MM/AAAA'
        maxLength={10}
        className={className}
        onChange={(event) => {
          let next = event.target.value
          if (
            (event.nativeEvent as InputEvent).inputType ===
              'deleteContentBackward' &&
            value.endsWith('/') &&
            next === value.slice(0, -1)
          )
            next = next.slice(0, -1)
          onChange(formatDateInput(next))
        }}
      />
    )
  }

  return (
    <Drawer
      open={open}
      onOpenChange={handleOpenChange}
      handleOnly
      repositionInputs={false}
    >
      <DrawerTrigger asChild>
        <Button
          {...props}
          type='button'
          variant='outline'
          disabled={disabled}
          className={cn(
            'h-9 w-full min-w-0 justify-start text-left font-normal',
            className
          )}
        >
          <span className={cn('truncate', !value && 'text-muted-foreground')}>
            {value || 'DD/MM/AAAA'}
          </span>
        </Button>
      </DrawerTrigger>
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
