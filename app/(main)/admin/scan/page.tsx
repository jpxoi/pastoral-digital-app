import { PageBreadcrumb } from '@/components/shared/breadcrumbTrail'
import PageHeader from '@/components/shared/pageHeader'

import QrScannerTab from '@/components/admin/qrScannerTab'

export default function Page() {
  return (
    <>
      <PageHeader breadcrumb={<PageBreadcrumb label='Escanear Código QR' />} />
      <QrScannerTab />
    </>
  )
}
