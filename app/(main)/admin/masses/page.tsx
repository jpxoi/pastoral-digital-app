import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'
import { Suspense } from 'react'
import { Metadata } from 'next'
import MassesTable from '@/components/admin/massesTable'
import MassesTableSkeleton from '@/components/admin/massesTableSkeleton'
import RevalidateButton from '@/components/shared/revalidateButton'
import { checkPermission, requirePermission } from '@/lib/roles'
import { Permission } from '@/types/permissions'
import ExportMassesPdfButton from '@/components/admin/exportMassesPdfButton'
import Link from 'next/link'
import { IconPhotoCheck } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import PageActions from '@/components/shared/pageActions'

export const metadata: Metadata = {
  title: 'Administrar misas',
}

export default async function Page() {
  await requirePermission(Permission.MASSES_VIEW_RECORDS)
  const canReview = await checkPermission(Permission.MASSES_REVIEW_RECORDS)

  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Misas' />} />
      <Suspense fallback={<MassesTableSkeleton canReview={canReview} />}>
        <MassesTable>
          <PageActions>
            <RevalidateButton resource='masses' />
            {canReview && (
              <Button
                asChild
                size='sm'
                className='order-first col-span-2 h-9 w-full sm:order-last sm:h-8 sm:w-auto'
              >
                <Link href='/admin/masses/review'>
                  <IconPhotoCheck />
                  Revisar pendientes
                </Link>
              </Button>
            )}
            <ExportMassesPdfButton />
          </PageActions>
        </MassesTable>
      </Suspense>
    </>
  )
}
