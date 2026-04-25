'use client'

import type { TablerIcon } from '@tabler/icons-react'
import {
  IconDots,
  IconShare2,
  IconSquarePlus,
  IconX,
} from '@tabler/icons-react'
import { type ReactNode, useEffect, useId, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { cn } from '@/lib/utils'

const STORAGE_KEY = 'pastoral-digital-ios-install-prompt-dismissed'

function getSafariMajorVersion(): number | null {
  if (typeof navigator === 'undefined') return null
  const m = /Version\/(\d+)/.exec(navigator.userAgent)
  return m ? Number.parseInt(m[1], 10) : null
}

/** Evita `navigator.platform` (deprecado): iPadOS suele declararse como Macintosh en el UA. */
function isIosDevice(): boolean {
  if (typeof window === 'undefined') return false
  const ua = window.navigator.userAgent
  if (/iPad|iPhone|iPod/i.test(ua)) return true
  return /\bMacintosh\b/i.test(ua) && navigator.maxTouchPoints > 1
}

function isIosSystemSafari(): boolean {
  if (!isIosDevice()) return false
  const ua = navigator.userAgent
  if (
    /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|DuckDuckGo|GSA\/|Instagram|FBAN|FBAV|Line\/|MicroMessenger/.test(
      ua
    )
  ) {
    return false
  }
  return /Safari/i.test(ua) && /AppleWebKit/i.test(ua)
}

function isRunningAsInstalledPwa(): boolean {
  if (typeof window === 'undefined') return false
  const standalone = (window.navigator as Navigator & { standalone?: boolean })
    .standalone
  return (
    window.matchMedia('(display-mode: standalone)').matches ||
    standalone === true
  )
}

type PromptVariant = 'safari26' | 'safari-legacy' | 'ios-other-browser'

function StepBadge({ n }: { n: number }) {
  return (
    <span
      className='flex h-5 min-h-5 w-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-blue-900/10 text-[10px] leading-none font-semibold text-blue-900'
      aria-hidden
    >
      {n}
    </span>
  )
}

/**
 * Icono + etiqueta alineados al mismo eje que el texto corrido (inline-flex + align-middle).
 * El icono usa altura en em para seguir el tamaño de fuente del paso.
 */
function ActionLabel({
  icon: Icon,
  children,
}: {
  icon: TablerIcon
  children: string
}) {
  return (
    <span
      className={cn(
        'mx-0.5 inline-flex max-w-full align-middle',
        'items-center gap-1.5 rounded-sm px-0.5 font-medium text-blue-900',
        'first:ml-0 last:mr-0'
      )}
    >
      <Icon
        className='size-[1.15em] shrink-0 text-blue-900 opacity-90'
        stroke={1.75}
        aria-hidden
      />
      <span className='leading-snug'>{children}</span>
    </span>
  )
}

function StepRow({ n, children }: { n: number; children: ReactNode }) {
  return (
    <li className='flex items-start gap-3'>
      <span className='shrink-0 pt-[0.35em]'>
        <StepBadge n={n} />
      </span>
      <div className='min-w-0 flex-1 leading-relaxed text-pretty'>
        {children}
      </div>
    </li>
  )
}

export function IosInstallPrompt() {
  const [variant, setVariant] = useState<PromptVariant | null>(null)
  const titleId = useId()

  useEffect(() => {
    try {
      if (localStorage.getItem(STORAGE_KEY) === '1') return
    } catch {
      /* private mode */
    }

    if (!isIosDevice() || isRunningAsInstalledPwa()) return

    const safariMajor = getSafariMajorVersion()
    const systemSafari = isIosSystemSafari()

    let next: PromptVariant
    if (systemSafari && safariMajor !== null && safariMajor >= 26) {
      next = 'safari26'
    } else if (systemSafari) {
      next = 'safari-legacy'
    } else {
      next = 'ios-other-browser'
    }

    const showTimer = window.setTimeout(() => setVariant(next), 1600)
    return () => window.clearTimeout(showTimer)
  }, [])

  function dismiss() {
    setVariant(null)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {
      /* ignore */
    }
  }

  if (!variant) return null

  return (
    <div
      aria-live='polite'
      className={cn(
        'pointer-events-none fixed inset-x-0 bottom-0 z-1000 flex justify-center p-4',
        'pb-[max(1rem,env(safe-area-inset-bottom,0px))]'
      )}
    >
      <Card
        role='region'
        aria-labelledby={titleId}
        size='sm'
        className={cn(
          'pointer-events-auto w-full max-w-md shadow-lg',
          'border-neutral-200 bg-white text-left',
          'gap-0'
        )}
      >
        <CardHeader>
          <CardTitle id={titleId} className='text-blue-900'>
            Instala Pastoral Digital
          </CardTitle>
          <CardDescription>
            Instala la app en tu dispositivo.
          </CardDescription>
          <CardAction>
            <Button
              type='button'
              variant='ghost'
              size='icon'
              className='-mr-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800'
              onClick={dismiss}
              aria-label='Cerrar'
            >
              <IconX className='h-5 w-5' />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          {variant === 'safari26' && (
            <ol className='list-none space-y-3 text-sm text-slate-700'>
              <StepRow n={1}>
                Toca <ActionLabel icon={IconDots}>Menú</ActionLabel>
                al lado de la barra de direcciones.
              </StepRow>
              <StepRow n={2}>
                Pulsa <ActionLabel icon={IconShare2}>Compartir</ActionLabel>, desplázate hacia abajo y selecciona{' '}
                <ActionLabel icon={IconSquarePlus}>
                  Añadir a pantalla de inicio
                </ActionLabel>
                .
              </StepRow>
              <StepRow n={3}>
                Pulsa <span className='font-medium'>Añadir</span> para finalizar la instalación.
              </StepRow>
            </ol>
          )}
          {variant === 'safari-legacy' && (
            <ol className='list-none space-y-3 text-sm text-slate-700'>
              <StepRow n={1}>
                Busca <ActionLabel icon={IconShare2}>Compartir</ActionLabel>{' '}
                (icono de flecha hacia arriba). Si no aparece, entra primero en{' '}
                <ActionLabel icon={IconDots}>Menú</ActionLabel> y selecciona
                Compartir.
              </StepRow>
              <StepRow n={2}>
                Pulsa <ActionLabel icon={IconSquarePlus}>Añadir a pantalla de inicio</ActionLabel> y termina con <span className='font-medium'>Añadir</span>.
              </StepRow>
            </ol>
          )}
          {variant === 'ios-other-browser' && (
            <div className='space-y-3 text-sm leading-relaxed text-pretty text-slate-700'>
              <p>
                <span className='font-medium text-blue-900'>En Safari:</span>{' '}
                <ActionLabel icon={IconShare2}>Compartir</ActionLabel> o{' '}
                <ActionLabel icon={IconDots}>Menú</ActionLabel>, luego{' '}
                <span className='font-medium'>Añadir a pantalla de inicio</span>{' '}
                y confirma.
              </p>
              <p className='text-slate-600'>
                <span className='font-medium text-slate-700'>
                  En este navegador:
                </span>{' '}
                suele bastar con Compartir o con el menú (⋯); el nombre exacto
                puede cambiar según la app.
              </p>
            </div>
          )}
        </CardContent>
        <CardFooter className='border-t-0 bg-white'>
          <Button
            type='button'
            className='bg-primary hover:bg-primary/90 w-full'
            onClick={dismiss}
          >
            Entendido
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
