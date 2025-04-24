import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        emerald:
          'bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border-transparent',
        yellow:
          'bg-yellow-50 text-yellow-700 hover:bg-yellow-100 border-transparent',
        orange:
          'bg-orange-50 text-orange-700 hover:bg-orange-100 border-transparent',
        red: 'bg-red-50 text-red-700 hover:bg-red-100 border-transparent',
        purple:
          'bg-purple-50 text-purple-700 hover:bg-purple-100 border-transparent',
        blue: 'bg-blue-50 text-blue-700 hover:bg-blue-100 border-transparent',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
