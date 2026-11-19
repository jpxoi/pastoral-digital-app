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
import { checkPermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'

export function CustomSidebar() {
  const [permissions, setPermissions] = useState<Set<Permission>>(new Set())

  useEffect(() => {
    const availablePermissions = [
      Permission.EVENTS_MANAGE,
      Permission.ATTENDANCE_SCAN,
      Permission.ATTENDANCE_VIEW_RECORDS,
      Permission.ATTENDANCE_VIEW_CALENDAR,
      Permission.CATECHISTS_VIEW,
      Permission.MASSES_MANAGE,
    ]

    Promise.all(
      availablePermissions.map(async (permission) =>
        (await checkPermission(permission)) ? permission : null
      )
    ).then((results) => {
      setPermissions(
        new Set(results.filter((value): value is Permission => value !== null))
      )
    })
  }, [])

  const iconClass = 'h-5 w-5 shrink-0 text-neutral-200'
  const links = [
    {
      label: 'Inicio',
      href: '/dashboard',
      icon: <IconHome2 className={iconClass} />,
    },
    {
      label: 'Eventos',
      href: '/events',
      icon: <IconCalendar className={iconClass} />,
    },
    {
      label: 'Cumpleaños',
      href: '/birthdays',
      icon: <IconCake className={iconClass} />,
    },
  ]

  const adminLinks = [
    permissions.has(Permission.EVENTS_MANAGE) && {
      label: 'Administrar Eventos',
      href: '/admin/events',
      icon: <IconCalendar className={iconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_SCAN) && {
      label: 'Escanear QR',
      href: '/admin/scan',
      icon: <IconQrcode className={iconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_VIEW_RECORDS) && {
      label: 'Registro de Asistencia',
      href: '/admin/records',
      icon: <IconListCheck className={iconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_VIEW_CALENDAR) && {
      label: 'Calendario de Asistencia',
      href: '/admin/calendar',
      icon: <IconTable className={iconClass} />,
    },
    permissions.has(Permission.CATECHISTS_VIEW) && {
      label: 'Administrar Catequistas',
      href: '/admin/users',
      icon: <IconUsers className={iconClass} />,
    },
    permissions.has(Permission.MASSES_MANAGE) && {
      label: 'Administrar Misas',
      href: '/admin/masses',
      icon: <IconBuildingChurch className={iconClass} />,
    },
  ].filter((link) => link !== false)

  const [open, setOpen] = useState(false)

  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className='justify-between gap-10'>
        <div className='flex flex-1 flex-col overflow-x-hidden overflow-y-auto'>
          {open ? <Logo /> : <LogoIcon />}
          <nav className='mt-8 flex flex-col gap-3'>
            <div className='flex flex-col gap-1'>
              {links.map((link) => (
                <SidebarLink key={link.href} link={link} />
              ))}
            </div>
            {adminLinks.length > 0 ? (
              <div className='flex flex-col gap-1'>
                {adminLinks.map((link) => (
                  <SidebarLink key={link.href} link={link} />
                ))}
              </div>
            ) : null}
          </nav>
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
                    userButtonBox: 'flex-row-reverse!',
                    userButtonOuterIdentifier:
                      'text-white! line-clamp-1! text-left!',
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
const Logo = () => {
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
const LogoIcon = () => {
  return (
    <Link
      href='/dashboard'
      className='relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-white'
    >
      <div className='h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white' />
    </Link>
  )
}
