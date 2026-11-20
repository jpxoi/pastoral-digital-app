import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from 'cn'
import { Slot } from 'radix-ui'

const badgeVariants = cva(
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-4xl border border-transparent px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-all focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 [&>svg]:pointer-events-none [&>svg]:size-3!',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground [a]:hover:bg-primary/80',
        secondary:
          'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80',
        destructive:
          'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20',
        outline:
          'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground',
        ghost:
          'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50',
        link: 'text-primary underline-offset-4 hover:underline',
        red: 'border-transparent bg-red-50 text-red-700 hover:bg-red-100',
        emerald:
          'border-transparent bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
        orange:
          'border-transparent bg-orange-50 text-orange-700 hover:bg-orange-100',
        amber:
          'border-transparent bg-amber-50 text-amber-700 hover:bg-amber-100',
        yellow:
          'border-transparent bg-yellow-50 text-yellow-700 hover:bg-yellow-100',
        green:
          'border-transparent bg-green-50 text-green-700 hover:bg-green-100',
        sky: 'border-transparent bg-sky-50 text-sky-700 hover:bg-sky-100',
        blue: 'border-transparent bg-blue-50 text-blue-700 hover:bg-blue-100',
        violet:
          'border-transparent bg-violet-50 text-violet-700 hover:bg-violet-100',
        purple:
          'border-transparent bg-purple-50 text-purple-700 hover:bg-purple-100',
        pink: 'border-transparent bg-pink-50 text-pink-700 hover:bg-pink-100',
        rose: 'border-transparent bg-rose-50 text-rose-700 hover:bg-rose-100',
        slate:
          'border-transparent bg-slate-50 text-slate-700 hover:bg-slate-100',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'span'> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : 'span'

  return (
    <Comp
      data-slot='badge'
      data-variant={variant}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export type BadgeProps = React.ComponentProps<typeof Badge>

export { Badge, badgeVariants }
