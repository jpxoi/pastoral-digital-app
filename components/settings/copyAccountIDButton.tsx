'use client'

import { useState } from 'react'
import { CopyIconMicro } from '@/components/icons/icons16'

export function CopyAccountIDButton({
  accountID,
}: Readonly<{
  accountID: string
}>) {
  const [copied, setCopied] = useState(false)

  const handleCopyID = () => {
    navigator.clipboard.writeText(accountID)
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }
  return (
    <button
      className='flex flex-row items-center justify-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-sm text-gray-800 hover:bg-gray-200'
      onClick={handleCopyID}
      disabled={copied}
    >
      <CopyIconMicro />
      {copied ? 'Copiado' : 'Copiar'}
    </button>
  )
}
