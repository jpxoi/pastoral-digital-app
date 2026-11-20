'use client'

import { useRef, useState, useTransition } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { IconArrowLeft } from '@tabler/icons-react'
import { toast } from 'sonner'
import { rejectMassRecord, verifyMassRecord } from '@/actions/mass'
import type { PendingMassRecord } from '@/queries/select'
import { Button } from '@/components/ui/button'
import MassEvidenceImage, {
  type EvidenceImageState,
} from './mass-review/mass-evidence-image'
import type { MassReviewAction } from './mass-review/mass-review-actions'
import MassReviewDetails from './mass-review/mass-review-details'
import MassReviewEmpty from './mass-review/mass-review-empty'

function MassReviewRecord({
  record,
  pendingAction,
  onReview,
}: {
  record: PendingMassRecord
  pendingAction: MassReviewAction | null
  onReview: (action: MassReviewAction) => void
}) {
  const [imageState, setImageState] = useState<EvidenceImageState>('loading')
  const imageUrl = `https://jox4e78o3v.ufs.sh/f/${record.evidenceFileKey}`
  return (
    <div className='grid w-full min-w-0 items-start gap-4 pb-20 md:pb-0 lg:grid-cols-[minmax(0,1fr)_22.5rem]'>
      <MassEvidenceImage
        imageUrl={imageUrl}
        name={`${record.user.firstName} ${record.user.lastName}`}
        imageState={imageState}
        onImageStateChange={setImageState}
      />
      <MassReviewDetails
        record={record}
        imageUrl={imageUrl}
        imageState={imageState}
        pendingAction={pendingAction}
        onReview={onReview}
      />
    </div>
  )
}

export default function MassReviewClient({
  records,
}: {
  records: PendingMassRecord[]
}) {
  const router = useRouter()
  const busy = useRef(false)
  const [pendingAction, setPendingAction] = useState<MassReviewAction | null>(
    null
  )
  const [reviewedIds, setReviewedIds] = useState<Set<string>>(() => new Set())
  const [error, setError] = useState<string | null>(null)
  const [refreshing, startRefresh] = useTransition()
  const record = records.find((item) => !reviewedIds.has(item.id))

  async function review(action: MassReviewAction) {
    if (!record || busy.current) return
    busy.current = true
    setPendingAction(action)
    setError(null)
    const id = record.id

    try {
      const result = await (action === 'approve'
        ? verifyMassRecord(id)
        : rejectMassRecord(id))
      if ('error' in result) {
        if ('code' in result && result.code === 'MASS_REVIEW_CONFLICT') {
          toast.info(result.error)
          setReviewedIds((ids) => new Set(ids).add(id))
          router.refresh()
        } else {
          setError(
            result.error ??
              'No se pudo guardar la decisión. Inténtalo de nuevo.'
          )
        }
        return
      }
      setReviewedIds((ids) => new Set(ids).add(id))
      toast.success(action === 'approve' ? 'Misa aprobada.' : 'Misa rechazada.')
    } catch {
      setError(
        'No se pudo guardar la decisión. Revisa tu conexión e inténtalo de nuevo.'
      )
    } finally {
      busy.current = false
      setPendingAction(null)
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center'>
        <Button asChild variant='ghost'>
          <Link href='/admin/masses'>
            <IconArrowLeft />
            Volver a registros
          </Link>
        </Button>
      </div>
      {error && (
        <p
          role='alert'
          className='text-destructive rounded-lg border p-3 text-sm'
        >
          {error}
        </p>
      )}
      {record ? (
        <MassReviewRecord
          key={record.id}
          record={record}
          pendingAction={pendingAction}
          onReview={(action) => void review(action)}
        />
      ) : (
        <MassReviewEmpty
          refreshing={refreshing}
          busy={pendingAction !== null}
          onRefresh={() => startRefresh(() => router.refresh())}
        />
      )}
    </div>
  )
}
