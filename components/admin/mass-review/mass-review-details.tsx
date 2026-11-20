'use client'

import { useState } from 'react'
import { format, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'
import { tz } from '@date-fns/tz'
import {
  IconBuildingChurch,
  IconCalendar,
  IconCalendarClock,
  IconExternalLink,
} from '@tabler/icons-react'
import type { PendingMassRecord } from '@/queries/select'
import { UserCategory } from '@/types'
import type { EvidenceImageState } from './mass-evidence-image'
import MassReviewActions, { type MassReviewAction } from './mass-review-actions'

const categoryLabels: Record<UserCategory, string> = {
  [UserCategory.STUDENT]: 'Alumno',
  [UserCategory.ALUMNI]: 'Exalumno',
  [UserCategory.TEACHER]: 'Docente',
}

export default function MassReviewDetails({
  record,
  imageUrl,
  imageState,
  pendingAction,
  onReview,
}: {
  record: PendingMassRecord
  imageUrl: string
  imageState: EvidenceImageState
  pendingAction: MassReviewAction | null
  onReview: (action: MassReviewAction) => void
}) {
  const [openedOriginal, setOpenedOriginal] = useState(false)
  const name = `${record.user.firstName} ${record.user.lastName}`
  return (
    <section
      className='flex min-w-0 flex-col gap-6 rounded-xl border p-5 text-left'
      aria-label='Datos de la misa'
    >
      <div className='space-y-1.5' aria-live='polite' aria-atomic='true'>
        <h2 className='text-lg leading-snug font-semibold wrap-break-word'>
          {name}
        </h2>
        <p className='text-muted-foreground text-sm'>
          {categoryLabels[record.user.category]}
        </p>
      </div>
      <dl className='space-y-4 text-sm'>
        <div className='space-y-1'>
          <dt className='text-muted-foreground flex items-center gap-2 text-xs'>
            <IconBuildingChurch className='size-4' aria-hidden='true' />
            Parroquia
          </dt>
          <dd className='pl-6 font-medium wrap-break-word'>{record.parish}</dd>
        </div>
        <div className='space-y-1'>
          <dt className='text-muted-foreground flex items-center gap-2 text-xs'>
            <IconCalendar className='size-4' aria-hidden='true' />
            Domingo
          </dt>
          <dd className='pl-6 font-medium'>
            <time dateTime={record.sundayDate}>
              {format(parseISO(record.sundayDate), 'PPP', { locale: es })}
            </time>
          </dd>
        </div>
        <div className='space-y-1'>
          <dt className='text-muted-foreground flex items-center gap-2 text-xs'>
            <IconCalendarClock className='size-4' aria-hidden='true' />
            Fecha de registro
          </dt>
          <dd className='pl-6 font-medium'>
            <time dateTime={new Date(record.createdAt).toISOString()}>
              {format(new Date(record.createdAt), "PP '·' p", {
                locale: es,
                in: tz('America/Lima'),
              })}
            </time>
          </dd>
        </div>
      </dl>
      <a
        href={imageUrl}
        target='_blank'
        rel='noopener noreferrer'
        className='text-primary hover:text-primary/80 focus-visible:ring-primary/30 inline-flex items-center gap-1.5 self-start rounded-sm text-sm font-medium underline-offset-4 hover:underline focus-visible:ring-2 focus-visible:outline-none'
        onClick={() => setOpenedOriginal(true)}
      >
        <IconExternalLink className='size-4' aria-hidden='true' />
        Abrir archivo original
      </a>
      <MassReviewActions
        pendingAction={pendingAction}
        canReject={imageState !== 'loading'}
        canApprove={
          imageState === 'loaded' || (imageState === 'error' && openedOriginal)
        }
        onReview={onReview}
      />
    </section>
  )
}
