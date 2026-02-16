'use client'
import React, { useEffect, useState } from 'react'
import { Sidebar, SidebarBody, SidebarLink } from '@/components/ui/sidebar'
import {
  IconBuildingChurch,
  IconCake,
  IconCalendar,
  IconHome2,
  IconListCheck,
  IconQrcode,
  IconTable,
  IconUsers,
} from '@tabler/icons-react'
import Link from 'next/link'
import { motion } from 'motion/react'
import { ClerkLoaded, ClerkLoading, UserButton } from '@clerk/nextjs'
import { Skeleton } from '@/components/ui/skeleton'
import { checkRole } from '@/lib/roles'
import { UserRole } from '@/types'

export function CustomSidebar() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [isManager, setIsManager] = useState(false)

  useEffect(() => {
    checkRole(UserRole.ADMIN).then((result) => {
      setIsAdmin(result)
    })

    checkRole(UserRole.MANAGER).then((result) => {
      setIsManager(result)
    })
  }, [])

  const links = [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: <IconHome2 className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
    {
      label: 'Eventos',
      href: '/events',
      icon: <IconCalendar className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
    {
      label: 'Cumpleaños',
      href: '/birthdays',
      icon: <IconCake className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
  ]

  const adminLinks = [
    {
      label: 'Escanear QR',
      href: '/admin/scan',
      icon: <IconQrcode className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
    {
      label: 'Registro de Asistencia',
      href: '/admin/records',
      icon: <IconListCheck className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
    {
      label: 'Calendario de Asistencia',
      href: '/admin/calendar',
      icon: <IconTable className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
    {
      label: 'Administrar Catequistas',
      href: '/admin/users',
      icon: <IconUsers className='h-5 w-5 shrink-0 text-neutral-200' />,
    },
  ]

  const managerLinks = [
    {
      label: 'Administrar Misas',
      href: '/admin/masses',
      icon: (
        <IconBuildingChurch className='h-5 w-5 shrink-0 text-neutral-200' />
      ),
    },
  ]

  const [open, setOpen] = useState(false)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-1 flex-col overflow-x-hidden overflow-y-auto'>
          {open ? <Logo /> : <LogoIcon />}
          <div className='mt-8 flex flex-col gap-2'>
            {links.map((link, idx) => (
              <SidebarLink key={idx} link={link} />
            ))}
            {}
          </div>
          {isAdmin && (
            <div className='mt-8 flex flex-col gap-2'>
              {adminLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          )}
          {(isManager || isAdmin) && (
            <div className='mt-8 flex flex-col gap-2'>
              {managerLinks.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          )}
        </div>
        <div>
          <ClerkLoading>
            <div className='flex items-center justify-start gap-2 max-md:hidden'>
              <Skeleton className='aspect-square size-7 rounded-full' />
              <Skeleton className='h-4 w-32' />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <div className='flex items-center justify-start gap-2 max-md:hidden'>
              <UserButton
                showName={open}
                appearance={{
                  elements: {
                    userButtonBox: 'flex-row-reverse',
                    userButtonOuterIdentifier: 'text-white text-nowrap',
                  },
                }}
              />
            </div>
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
      <div className='h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white' />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className='font-medium whitespace-pre text-white'
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
      <div className='h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white' />
    </Link>
  )
}
