import '@ncdai/react-wheel-picker/style.css'

import type { ComponentProps } from 'react'
import * as WheelPickerPrimitive from '@ncdai/react-wheel-picker'

import { cn } from '@/lib/utils'

type WheelPickerValue = WheelPickerPrimitive.WheelPickerValue

type WheelPickerOption<T extends WheelPickerValue = string> =
  WheelPickerPrimitive.WheelPickerOption<T>

type WheelPickerClassNames = WheelPickerPrimitive.WheelPickerClassNames

function WheelPickerWrapper({
  className,
  ...props
}: ComponentProps<typeof WheelPickerPrimitive.WheelPickerWrapper>) {
  return (
    <WheelPickerPrimitive.WheelPickerWrapper
      className={cn(
        'bg-background border-border w-56 rounded-lg border px-1 shadow-xs',
        '[&>:first-child_[data-rwp-highlight-wrapper]]:rounded-s-md',
        '[&>:last-child_[data-rwp-highlight-wrapper]]:rounded-e-md',
        className
      )}
      {...props}
    />
  )
}

function WheelPicker<T extends WheelPickerValue = string>({
  classNames,
  ...props
}: WheelPickerPrimitive.WheelPickerProps<T>) {
  return (
    <WheelPickerPrimitive.WheelPicker
      classNames={{
        optionItem: cn(
          'text-muted-foreground data-disabled:opacity-40',
          classNames?.optionItem
        ),
        highlightWrapper: cn(
          'bg-primary text-primary-foreground',
          'data-rwp-focused:inset-ring-2 data-rwp-focused:inset-ring-primary-foreground/60',
          classNames?.highlightWrapper
        ),
        highlightItem: cn(
          'data-disabled:opacity-40',
          classNames?.highlightItem
        ),
      }}
      {...props}
    />
  )
}

export { WheelPicker, WheelPickerWrapper }
export type { WheelPickerClassNames, WheelPickerOption }
