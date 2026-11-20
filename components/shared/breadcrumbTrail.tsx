import Link from 'next/link'
import { Fragment, type ReactNode } from 'react'
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { cn } from '@/lib/utils'

export interface BreadcrumbCrumb {
  label: string
  href?: string
}

export default function BreadcrumbTrail({
  crumbs,
}: {
  crumbs: BreadcrumbCrumb[]
}) {
  if (!crumbs.length) return null

  return (
    <Breadcrumb className='min-w-0 flex-1 overflow-hidden'>
      <BreadcrumbList className='flex-nowrap'>
        {crumbs.map((crumb, index) => {
          const isLast = index === crumbs.length - 1
          const isMiddle = index > 0 && !isLast
          const collapseMiddle = crumbs.length > 2

          return (
            <Fragment key={crumb.href ?? crumb.label}>
              {index > 0 && (
                <BreadcrumbSeparator
                  className={cn(
                    'shrink-0',
                    (isMiddle || (isLast && collapseMiddle)) && 'max-sm:hidden'
                  )}
                />
              )}
              {isLast && collapseMiddle && (
                <>
                  <BreadcrumbSeparator className='shrink-0 sm:hidden' />
                  <BreadcrumbItem className='shrink-0 sm:hidden'>
                    <BreadcrumbEllipsis className='size-4' />
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className='shrink-0 sm:hidden' />
                </>
              )}
              <BreadcrumbItem
                className={cn(
                  'min-w-0',
                  isMiddle && 'max-sm:hidden',
                  isLast ? 'shrink' : 'max-w-[40%] shrink-0 sm:max-w-none'
                )}
              >
                {isLast || !crumb.href ? (
                  <BreadcrumbPage title={crumb.label} className='truncate'>
                    {crumb.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild className='truncate'>
                    <Link href={crumb.href} title={crumb.label}>
                      {crumb.label}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}

export function PageBreadcrumb({
  label,
  administration = false,
}: {
  label: string
  administration?: boolean
}): ReactNode {
  return (
    <BreadcrumbTrail
      crumbs={
        administration ? [{ label: 'Administración' }, { label }] : [{ label }]
      }
    />
  )
}

export function AdminEventBreadcrumb({ label }: { label: string }) {
  return (
    <BreadcrumbTrail
      crumbs={[
        { label: 'Administración' },
        { label: 'Eventos', href: '/admin/events' },
        { label },
      ]}
    />
  )
}
