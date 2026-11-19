'use client'

import { IconMail } from '@tabler/icons-react'
import { InputGroup, InputGroupAddon, InputGroupInput } from './input-group'
import { cn } from '@/lib/utils'

const EmailInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <InputGroup>
      <InputGroupInput className={cn(className)} {...props} />
      <InputGroupAddon>
        <IconMail />
      </InputGroupAddon>
    </InputGroup>
  )
}

export { EmailInput }
