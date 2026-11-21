'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useClerk, useUser } from '@clerk/nextjs'
import {
  IconBuildingChurch,
  IconBell,
  IconCake,
  IconCalendar,
  IconDots,
  IconHome2,
  IconListCheck,
  IconLogout,
  IconQrcode,
  IconSettings,
  IconTable,
  IconUsers,
  IconUsersGroup,
} from '@tabler/icons-react'
import { Permission } from '@/types/permissions'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from '@/components/ui/sidebar'
import { Skeleton } from '@/components/ui/skeleton'
import { PastoralAppMark } from '@/components/shared/pastoral-signature'
import { removeDevicePushSubscription } from '@/lib/push/client'
import { toast } from 'sonner'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import PushNotificationsControl from '@/components/shared/pushNotificationsControl'

type NavLink = {
  label: string
  href: string
  icon: React.JSX.Element
}

export function CustomSidebar({
  permissions: allowedPermissions,
}: {
  permissions: readonly Permission[]
}) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const permissions = new Set(allowedPermissions)
  const pathname = usePathname()

  const navIconClass = 'size-5 shrink-0'
  const links: NavLink[] = [
    permissions.has(Permission.DASHBOARD_VIEW) && {
      label: 'Inicio',
      href: '/dashboard',
      icon: <IconHome2 className={navIconClass} />,
    },
    permissions.has(Permission.EVENTS_VIEW) && {
      label: 'Eventos',
      href: '/events',
      icon: <IconCalendar className={navIconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_VIEW_OWN) && {
      label: 'Mis asistencias',
      href: '/attendance',
      icon: <IconListCheck className={navIconClass} />,
    },
    permissions.has(Permission.MASSES_VIEW_OWN) && {
      label: 'Mis misas',
      href: '/masses',
      icon: <IconBuildingChurch className={navIconClass} />,
    },
    permissions.has(Permission.BIRTHDAYS_VIEW) && {
      label: 'Cumpleaños',
      href: '/birthdays',
      icon: <IconCake className={navIconClass} />,
    },
  ].filter((link): link is NavLink => Boolean(link))

  const adminLinks = [
    (permissions.has(Permission.EVENTS_CREATE) ||
      permissions.has(Permission.EVENTS_EDIT)) && {
      label: 'Administrar Eventos',
      href: '/admin/events',
      icon: <IconCalendar className={navIconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_SCAN) && {
      label: 'Escanear QR',
      href: '/admin/scan',
      icon: <IconQrcode className={navIconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_VIEW_RECORDS) && {
      label: 'Registro de Asistencia',
      href: '/admin/records',
      icon: <IconListCheck className={navIconClass} />,
    },
    permissions.has(Permission.ATTENDANCE_VIEW_CALENDAR) && {
      label: 'Calendario de Asistencia',
      href: '/admin/calendar',
      icon: <IconTable className={navIconClass} />,
    },
    permissions.has(Permission.CATECHISTS_VIEW) && {
      label: 'Administrar Catequistas',
      href: '/admin/users',
      icon: <IconUsers className={navIconClass} />,
    },
    permissions.has(Permission.COMMUNITIES_MANAGE) && {
      label: 'Administrar Comunidades',
      href: '/admin/communities',
      icon: <IconUsersGroup className={navIconClass} />,
    },
    permissions.has(Permission.MASSES_VIEW_RECORDS) && {
      label: 'Administrar Misas',
      href: '/admin/masses',
      icon: <IconBuildingChurch className={navIconClass} />,
    },
  ].filter((link): link is NavLink => Boolean(link))

  return (
    <>
      <Sidebar
        variant='floating'
        collapsible='icon'
        className='border-sidebar-border'
      >
        <SidebarHeader className='items-start px-3 pt-6 pb-2'>
          <Link
            href='/dashboard'
            aria-label='Pastoral Digital App'
            className='flex gap-3 px-2 transition-all group-data-[collapsible=icon]:px-0'
          >
            <PastoralAppMark className='aspect-square size-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-white' />
            <span className='truncate font-semibold group-data-[collapsible=icon]:hidden'>
              Pastoral Digital App
            </span>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
              Principal
            </SidebarGroupLabel>
            <SidebarMenu>
              {links.map((link) => (
                <NavItem
                  key={link.href}
                  link={link}
                  active={isRouteActive(pathname, link.href)}
                />
              ))}
            </SidebarMenu>
          </SidebarGroup>
          {adminLinks.length > 0 && (
            <SidebarGroup>
              <SidebarGroupLabel className='group-data-[collapsible=icon]:hidden'>
                Administración
              </SidebarGroupLabel>
              <SidebarMenu>
                {adminLinks.map((link) => (
                  <NavItem
                    key={link.href}
                    link={link}
                    active={isRouteActive(pathname, link.href)}
                  />
                ))}
              </SidebarMenu>
            </SidebarGroup>
          )}
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarUserButton
                notificationsOpen={notificationsOpen}
                onOpenNotifications={() => setNotificationsOpen(true)}
              />
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <Dialog open={notificationsOpen} onOpenChange={setNotificationsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Notificaciones</DialogTitle>
            <DialogDescription>
              Gestiona los avisos de Pastoral Digital en este dispositivo.
            </DialogDescription>
          </DialogHeader>
          <PushNotificationsControl variant='settings' />
        </DialogContent>
      </Dialog>
    </>
  )
}

function isRouteActive(pathname: string, href: string) {
  return (
    pathname === href ||
    (href !== '/dashboard' && pathname.startsWith(`${href}/`))
  )
}

function NavItem({ link, active }: { link: NavLink; active: boolean }) {
  const { setOpenMobile } = useSidebar()
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild isActive={active} tooltip={link.label}>
        <Link href={link.href} onClick={() => setOpenMobile(false)}>
          {link.icon}
          <span>{link.label}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}

function SidebarUserButton({
  notificationsOpen,
  onOpenNotifications,
}: {
  notificationsOpen: boolean
  onOpenNotifications: () => void
}) {
  const { user, isLoaded } = useUser()
  const { isMobile, setOpenMobile } = useSidebar()
  const { openUserProfile, signOut } = useClerk()

  if (!isLoaded) {
    return (
      <SidebarMenuButton
        size='lg'
        className='h-14 gap-3 px-3 group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0!'
      >
        <Skeleton className='size-10 rounded-full group-data-[collapsible=icon]:size-8!' />
        <Skeleton className='h-4 flex-1 group-data-[collapsible=icon]:hidden' />
      </SidebarMenuButton>
    )
  }
  if (!user) return null

  const name =
    user.fullName || user.primaryEmailAddress?.emailAddress || 'Mi cuenta'
  const initials = name.slice(0, 1).toUpperCase()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton
          size='lg'
          tooltip={name}
          className='hover:text-sidebar-foreground active:text-sidebar-foreground data-[state=open]:text-sidebar-foreground data-[state=open]:hover:text-sidebar-foreground h-14 gap-3 px-3 text-base group-data-[collapsible=icon]:size-8! group-data-[collapsible=icon]:p-0! hover:bg-white/10 active:bg-white/15 data-[state=open]:bg-white/10 data-[state=open]:hover:bg-white/10 [&>svg]:size-5'
        >
          <Avatar className='size-10 rounded-full group-data-[collapsible=icon]:size-8! after:border-0'>
            <AvatarImage src={user.imageUrl} alt={name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <span className='grid min-w-0 flex-1 text-left leading-tight group-data-[collapsible=icon]:hidden'>
            <span className='truncate text-base font-medium'>{name}</span>
          </span>
          <IconDots className='ml-auto size-5 group-data-[collapsible=icon]:hidden' />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        onCloseAutoFocus={(event) => {
          if (notificationsOpen) event.preventDefault()
        }}
        align='end'
        side={isMobile ? 'bottom' : 'right'}
        sideOffset={8}
        className='w-72 max-w-[calc(100vw-1rem)] min-w-0 text-left'
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel className='text-foreground p-3 text-sm font-normal'>
            <div className='flex items-center gap-3 text-left'>
              <Avatar className='size-10'>
                <AvatarImage src={user.imageUrl} alt={name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
              <div className='grid min-w-0 flex-1 leading-tight'>
                <span className='truncate text-sm font-medium'>{name}</span>
                <span className='text-muted-foreground truncate text-xs'>
                  {user.primaryEmailAddress?.emailAddress}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className='px-3 py-2'
          onSelect={() => openUserProfile()}
        >
          <IconSettings /> Administrar cuenta
        </DropdownMenuItem>
        <DropdownMenuItem
          className='px-3 py-2'
          onSelect={() => {
            setOpenMobile(false)
            onOpenNotifications()
          }}
        >
          <IconBell /> Notificaciones
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          variant='destructive'
          className='px-3 py-2'
          onSelect={() => {
            void (async () => {
              try {
                await removeDevicePushSubscription()
                await signOut()
              } catch {
                toast.error('No se pudo cerrar sesión. Vuelve a intentarlo.')
              }
            })()
          }}
        >
          <IconLogout /> Cerrar sesión
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
