'use client'
import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '../ui/sidebar'
import { IconBrandTabler, IconListCheck, IconQrcode } from '@tabler/icons-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ClerkLoaded, ClerkLoading, UserButton, useUser } from '@clerk/nextjs'
import { Skeleton } from '../ui/skeleton'
import { checkRole } from '@/lib/roles'

export function CustomSidebar() {
  const { user } = useUser()
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    checkRole('admin').then((result) => {
      setIsAdmin(result)
    })
  }, [])

  const links = [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: <IconBrandTabler className='h-5 w-5 shrink-0 text-neutral-200' />,
      show: true,
    },
    {
      label: 'Escanear QR',
      href: '/admin/scan',
      icon: <IconQrcode className='h-5 w-5 shrink-0 text-neutral-200' />,
      show: isAdmin,
    },
    {
      label: 'Registro de Asistencia',
      href: '/admin/records',
      icon: <IconListCheck className='h-5 w-5 shrink-0 text-neutral-200' />,
      show: isAdmin,
    },
  ]
  const [open, setOpen] = useState(false)
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
          {open ? <Logo /> : <LogoIcon />}
          <div className='mt-8 flex flex-col gap-2'>
            {links
              .filter((link) => link.show)
              .map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
          </div>
        </div>
        <div>
          <ClerkLoading>
            <SidebarLink
              link={{
                label: 'Loading...',
                href: '#',
                icon: (
                  <Skeleton className='h-7 w-7 shrink-0 rounded-full text-neutral-200' />
                ),
              }}
            />
          </ClerkLoading>
          <ClerkLoaded>
            <SidebarLink
              link={{
                label: user ? (user.fullName as string) : 'Guest',
                href: '#',
                icon: <UserButton />,
              }}
            />
          </ClerkLoaded>
        </div>
      </SidebarBody>
    </Sidebar>
  )
}
export const Logo = () => {
  return (
    <Link
      href='/dashboard'
      className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white'
    >
      <div className='h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-white' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='whitespace-pre font-medium text-white'
      >
        Pastoral Digital App
      </motion.span>
    </Link>
  )
}
export const LogoIcon = () => {
  return (
    <Link
      href='/dashboard'
      className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white'
    >
      <div className='h-5 w-6 shrink-0 rounded-bl-sm rounded-br-lg rounded-tl-lg rounded-tr-sm bg-white' />
    </Link>
  )
}
