'use client'

import { type CSSProperties, useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import {
  IconLoader2,
  IconPhotoOff,
  IconRefresh,
  IconRotateClockwise,
} from '@tabler/icons-react'
import { Button } from '@/components/ui/button'

export type EvidenceImageState = 'loading' | 'loaded' | 'error'

export default function MassEvidenceImage({
  imageUrl,
  name,
  imageState,
  onImageStateChange,
}: {
  imageUrl: string
  name: string
  imageState: EvidenceImageState
  onImageStateChange: (state: EvidenceImageState) => void
}) {
  const [imageAttempt, setImageAttempt] = useState(0)
  const [rotation, setRotation] = useState(0)
  const [imageSize, setImageSize] = useState<{
    width: number
    height: number
  } | null>(null)
  const [frameSize, setFrameSize] = useState({ width: 0, height: 0 })
  const frameRef = useRef<HTMLDivElement>(null)
  const sideways = rotation % 2 !== 0
  const orientedWidth = imageSize
    ? sideways
      ? imageSize.height
      : imageSize.width
    : 4
  const orientedHeight = imageSize
    ? sideways
      ? imageSize.width
      : imageSize.height
    : 3
  const scale = Math.min(
    frameSize.width / orientedWidth,
    frameSize.height / orientedHeight,
    1
  )

  useEffect(() => {
    const frame = frameRef.current
    if (!frame) return
    const observer = new ResizeObserver(([entry]) => {
      setFrameSize({
        width: entry.contentRect.width,
        height: entry.contentRect.height,
      })
    })
    observer.observe(frame)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={frameRef}
      className={`bg-muted/40 relative flex aspect-[var(--evidence-ratio)] max-h-[65dvh] w-full min-w-0 items-center justify-center overflow-hidden rounded-xl border p-2 lg:max-h-[calc(100dvh-13rem)] ${imageState !== 'loaded' ? 'min-h-64' : ''}`}
      style={
        {
          '--evidence-ratio': `${orientedWidth} / ${orientedHeight}`,
        } as CSSProperties
      }
    >
      {imageState !== 'error' && (
        <Image
          key={imageAttempt}
          src={imageUrl}
          alt={`Evidencia de misa de ${name}`}
          width={imageSize?.width ?? 1920}
          height={imageSize?.height ?? 1920}
          unoptimized={true}
          className='absolute top-1/2 left-1/2 h-auto max-h-full w-auto max-w-full -translate-x-1/2 -translate-y-1/2 rounded-lg object-contain'
          style={
            imageSize && scale > 0
              ? {
                  width: imageSize.width * scale,
                  height: imageSize.height * scale,
                  maxWidth: 'none',
                  maxHeight: 'none',
                  transform: `rotate(${rotation * 90}deg)`,
                }
              : undefined
          }
          onLoad={(event) => {
            const image = event.currentTarget
            setImageSize({
              width: image.naturalWidth,
              height: image.naturalHeight,
            })
            onImageStateChange('loaded')
          }}
          onError={() => onImageStateChange('error')}
        />
      )}
      {imageState === 'loaded' && scale > 0 && (
        <Button
          variant='secondary'
          size='icon-sm'
          className='absolute top-4 right-4 shadow-sm'
          aria-label='Girar foto 90 grados'
          title='Girar foto 90°'
          onClick={() => setRotation((value) => (value + 1) % 4)}
        >
          <IconRotateClockwise />
        </Button>
      )}
      {imageState === 'loading' && (
        <div
          role='status'
          className='bg-background/90 absolute flex items-center gap-2 rounded-md px-3 py-2 text-sm'
        >
          <IconLoader2 className='size-4 animate-spin' />
          Cargando evidencia...
        </div>
      )}
      {imageState === 'error' && (
        <div
          role='alert'
          className='flex max-w-sm flex-col items-center gap-3 p-6 text-center'
        >
          <IconPhotoOff className='text-muted-foreground size-8' />
          <p className='text-sm'>
            No se pudo mostrar la evidencia. Puedes abrir el archivo original o
            volver a cargarla.
          </p>
          <Button
            variant='outline'
            size='sm'
            onClick={() => {
              onImageStateChange('loading')
              setImageAttempt((attempt) => attempt + 1)
            }}
          >
            <IconRefresh />
            Reintentar
          </Button>
        </div>
      )}
    </div>
  )
}
