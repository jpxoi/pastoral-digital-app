'use client'

import {
  IosSFChevronDown,
  IosSFEllipsisHorizontal,
  IosSFIconFrame,
  IosSFPlusSquare,
  IosSFSquareAndArrowUp,
} from '@/components/shared/ios-sf-symbol-icons'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import {
  getSafariMajorVersion,
  isAndroidDevice,
  isAppleHandheldViewport,
  isAppleTouchDevice,
  isHandheldViewport,
  isIosOtherBrowser,
  isRunningAsInstalledPwa,
} from '@/lib/pwa-platform'
import { cn } from '@/lib/utils'
import { IconX } from '@tabler/icons-react'
import Image from 'next/image'
import * as React from 'react'

const IOS_DISMISS_KEY = 'pastoral-digital-ios-install-dismissed'
const ANDROID_DISMISS_KEY = 'pastoral-digital-android-install-dismissed'
/** Safari `Version/x` ≥ este valor: flujo por menú (⋯ → Compartir → Ver más), alineado con iOS 26+. */
const SAFARI_MENU_UI_MAJOR = 26

/** Chips con texto: altura `h-6`, esquinas `rounded-md`; el ellipsis va aparte en `size-6` + `rounded-full`. */
const IOS_CHIP_ROW =
  'inline-flex h-6 min-h-6 max-w-full shrink-0 items-center gap-1.5 text-sm font-medium leading-none'
const IOS_CHIP_BORDER =
  'border border-zinc-300 bg-zinc-100 text-zinc-800 shadow-sm'

/** Solo `ellipsis`: cuadrado **size-6**, **rounded-full**, icono centrado. */
function IosEllipsisMenuPill({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-6 shrink-0 items-center justify-center rounded-full align-middle',
        IOS_CHIP_BORDER,
        className
      )}
      aria-hidden
    >
      <IosSFIconFrame className='size-4'>
        <IosSFEllipsisHorizontal width={12} />
      </IosSFIconFrame>
    </span>
  )
}

/** `square.and.arrow.up` / `chevron.down` / `plus.square` + etiqueta: **h-6**, **rounded-md**. */
function IosPillChipWithIcon({
  icon,
  label,
}: {
  icon: React.ReactNode
  label: string
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-md pr-2 pl-1.5 align-middle',
        IOS_CHIP_ROW,
        IOS_CHIP_BORDER
      )}
    >
      <IosSFIconFrame className='size-3.5'>{icon}</IosSFIconFrame>
      <span className='truncate pr-px'>{label}</span>
    </span>
  )
}

/** `square.and.arrow.up` en barra Safari: **size-6**, **rounded-md**. */
function IosShareToolbarIcon({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex size-6 shrink-0 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 text-zinc-800 shadow-sm',
        className
      )}
      aria-hidden
    >
      <IosSFIconFrame className='size-4'>
        <IosSFSquareAndArrowUp size={14} />
      </IosSFIconFrame>
    </span>
  )
}

function IosAddToHomeChip() {
  return (
    <IosPillChipWithIcon
      icon={<IosSFPlusSquare size={14} />}
      label='Añadir a pantalla de inicio'
    />
  )
}

/** Pasos estilo captura “menú”: `ellipsis` → `square.and.arrow.up` + Compartir → `chevron.down` + Ver más → `plus.square` (Chrome iOS, Safari 26+, etc.). */
function IosMenuBasedInstallSteps({ menuPhrase }: { menuPhrase: string }) {
  return (
    <ol className='text-left list-decimal space-y-5 pl-5 text-sm leading-relaxed text-zinc-700 marker:font-medium marker:text-zinc-900'>
      <li className='pl-1'>
        Pulsa <IosEllipsisMenuPill className='mx-0.5' /> para abrir el menú{' '}
        {menuPhrase}.
      </li>
      <li className='pl-1'>
        Toca{' '}
        <IosPillChipWithIcon
          icon={<IosSFSquareAndArrowUp size={14} />}
          label='Compartir'
        />{' '}
        y, a continuación,{' '}
        <IosPillChipWithIcon
          icon={<IosSFChevronDown size={12} />}
          label='Ver más'
        />
        .
      </li>
      <li className='pl-1'>
        Selecciona <IosAddToHomeChip />.
      </li>
    </ol>
  )
}

function AppInfoCard({ name, host }: { name: string; host: string }) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 rounded-2xl p-3',
        'border border-zinc-200 bg-zinc-50'
      )}
    >
      <Image
        src='/icons/icon-192.png'
        alt=''
        width={48}
        height={48}
        className='size-12 shrink-0 rounded-xl'
      />
      <div className='min-w-0 text-left'>
        <p className={cn('truncate font-semibold', 'text-zinc-900')}>{name}</p>
        <p className={cn('truncate text-sm', 'text-zinc-600')}>{host}</p>
      </div>
    </div>
  )
}

type IosPromptKind = 'other-browser' | 'safari-legacy' | 'safari-new'

function useIosPromptKind(): IosPromptKind | null {
  const [kind, setKind] = React.useState<IosPromptKind | null>(null)

  React.useEffect(() => {
    function compute() {
      const ua = navigator.userAgent
      if (
        !isAppleTouchDevice(ua, navigator.platform, navigator.maxTouchPoints)
      ) {
        setKind(null)
        return
      }
      if (!isHandheldViewport(window.innerWidth)) {
        setKind(null)
        return
      }
      if (isIosOtherBrowser(ua)) {
        setKind('other-browser')
        return
      }
      const major = getSafariMajorVersion(ua)
      if (major !== null && major >= SAFARI_MENU_UI_MAJOR) setKind('safari-new')
      else setKind('safari-legacy')
    }
    compute()
    window.addEventListener('resize', compute)
    return () => window.removeEventListener('resize', compute)
  }, [])

  return kind
}

export function IosInstallPrompt() {
  const [mounted, setMounted] = React.useState(false)
  const iosKind = useIosPromptKind()

  const [iosOpen, setIosOpen] = React.useState(false)
  const [androidOpen, setAndroidOpen] = React.useState(false)
  const [host, setHost] = React.useState('')

  const deferredAndroidPrompt = React.useRef<BeforeInstallPromptEvent | null>(
    null
  )

  React.useEffect(() => {
    setMounted(true)
    setHost(window.location.host)
  }, [])

  React.useEffect(() => {
    if (!mounted || isRunningAsInstalledPwa()) return

    const ua = navigator.userAgent
    const appleOk = isAppleHandheldViewport(
      ua,
      navigator.platform,
      navigator.maxTouchPoints,
      window.innerWidth
    )
    /** Solo Android usa `beforeinstallprompt` aquí; en Chrome Mac/Windows no mostramos el sheet. */
    const listenChromiumInstall =
      isAndroidDevice(ua) && !localStorage.getItem(ANDROID_DISMISS_KEY)

    let timer: number | undefined

    const onBeforeInstallPrompt = (e: BeforeInstallPromptEvent) => {
      e.preventDefault()
      deferredAndroidPrompt.current = e
      setAndroidOpen(true)
    }

    if (appleOk && iosKind && !localStorage.getItem(IOS_DISMISS_KEY)) {
      timer = window.setTimeout(() => setIosOpen(true), 600)
    }

    if (listenChromiumInstall) {
      window.addEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    }

    return () => {
      if (timer !== undefined) window.clearTimeout(timer)
      window.removeEventListener('beforeinstallprompt', onBeforeInstallPrompt)
    }
  }, [mounted, iosKind])

  const dismissIos = React.useCallback(() => {
    try {
      localStorage.setItem(IOS_DISMISS_KEY, '1')
    } catch {
      /* private mode */
    }
    setIosOpen(false)
  }, [])

  const dismissAndroid = React.useCallback(() => {
    try {
      localStorage.setItem(ANDROID_DISMISS_KEY, '1')
    } catch {
      /* private mode */
    }
    setAndroidOpen(false)
  }, [])

  const runAndroidInstall = React.useCallback(async () => {
    const ev = deferredAndroidPrompt.current
    if (!ev) return
    try {
      await ev.prompt()
      await ev.userChoice
      deferredAndroidPrompt.current = null
      dismissAndroid()
    } catch {
      /* InvalidStateError si el evento ya se usó, u otro fallo */
      deferredAndroidPrompt.current = null
      setAndroidOpen(false)
    }
  }, [dismissAndroid])

  if (!mounted) return null

  const appName = 'Pastoral Digital'
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : ''
  const appleHandheld = isAppleHandheldViewport(
    ua,
    typeof navigator !== 'undefined' ? navigator.platform : '',
    typeof navigator !== 'undefined' ? navigator.maxTouchPoints : 0,
    typeof window !== 'undefined' ? window.innerWidth : 0
  )
  const showChromiumInstallSheet =
    androidOpen &&
    !isRunningAsInstalledPwa() &&
    !appleHandheld &&
    isAndroidDevice(ua)

  return (
    <>
      {/* iOS / iPadOS en mano */}
      {iosKind && !isRunningAsInstalledPwa() ? (
        <Sheet
          open={iosOpen}
          onOpenChange={(o) => {
            if (!o) dismissIos()
            else setIosOpen(o)
          }}
        >
          <SheetContent
            side='bottom'
            showCloseButton={false}
            className='rounded-t-3xl border-0 border-t border-zinc-200 bg-white px-4 pt-5 pb-8 text-zinc-900 sm:max-w-lg'
          >
            <div className='flex items-start justify-between gap-3'>
              <SheetHeader className='flex-1 space-y-0 p-0 text-left'>
                <SheetTitle className='text-lg font-semibold text-zinc-900'>
                  Instala la app
                </SheetTitle>
                <SheetDescription className='sr-only'>
                  Pasos para añadir la aplicación web a la pantalla de inicio
                </SheetDescription>
              </SheetHeader>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-8 w-8 shrink-0 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                onClick={() => dismissIos()}
                aria-label='Cerrar'
              >
                <IconX stroke={2} className='h-5 w-5' />
              </Button>
            </div>

            <div className='mt-4 space-y-5'>
              <AppInfoCard name={appName} host={host} />

              {iosKind === 'other-browser' ? (
                <IosMenuBasedInstallSteps menuPhrase='del navegador' />
              ) : iosKind === 'safari-new' ? (
                <IosMenuBasedInstallSteps menuPhrase='de Safari' />
              ) : (
                <ol className='text-left list-decimal space-y-5 pl-5 text-sm leading-relaxed text-zinc-700 marker:font-medium marker:text-zinc-900'>
                  <li className='pl-1'>
                    Pulsa{' '}
                    <IosShareToolbarIcon className='mx-0.5 align-middle' /> en
                    la barra de herramientas del navegador.
                  </li>
                  <li className='pl-1'>
                    Desplázate hacia abajo y elige <IosAddToHomeChip />.
                  </li>
                  <li className='pl-1'>
                    <span className='inline-flex flex-wrap items-center gap-x-1.5 gap-y-1'>
                      Busca el icono de la app en tu pantalla de inicio:
                      <span className='inline-flex size-6 items-center justify-center rounded-md border border-zinc-300 bg-zinc-100 p-0.5 align-middle shadow-sm'>
                        <Image
                          src='/icons/icon-192.png'
                          alt=''
                          width={20}
                          height={20}
                          className='size-5 rounded-sm'
                        />
                      </span>
                    </span>
                  </li>
                </ol>
              )}
            </div>
          </SheetContent>
        </Sheet>
      ) : null}

      {/* Chromium: solo Android (`beforeinstallprompt`). iOS/iPadOS arriba; escritorio sin sheet automático. */}
      {showChromiumInstallSheet ? (
        <Sheet
          open={androidOpen}
          onOpenChange={(o) => {
            if (!o) dismissAndroid()
            else setAndroidOpen(o)
          }}
        >
          <SheetContent
            side='bottom'
            showCloseButton={false}
            className='rounded-t-3xl border-t border-zinc-200 bg-white px-4 pt-5 pb-8 text-zinc-900 sm:max-w-lg'
          >
            <div className='flex items-start justify-between gap-3'>
              <SheetHeader className='flex-1 space-y-1 p-0 text-left'>
                <SheetTitle className='text-lg font-semibold text-zinc-900'>
                  Instala la app
                </SheetTitle>
                <SheetDescription className='text-zinc-600'>
                  Añade {appName} a tu pantalla de inicio o al dock para un
                  acceso más rápido.
                </SheetDescription>
              </SheetHeader>
              <Button
                type='button'
                variant='ghost'
                size='icon'
                className='h-8 w-8 shrink-0 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900'
                onClick={() => dismissAndroid()}
                aria-label='Cerrar'
              >
                <IconX stroke={2} className='h-5 w-5' />
              </Button>
            </div>
            <div className='mt-4'>
              <AppInfoCard name={appName} host={host} />
            </div>
            <div className='mt-6 flex flex-col gap-2'>
              <Button
                type='button'
                className='h-12 w-full rounded-2xl text-base font-medium'
                onClick={() => void runAndroidInstall()}
              >
                Instalar aplicación
              </Button>
              <Button
                type='button'
                variant='outline'
                className='h-11 rounded-2xl'
                onClick={() => dismissAndroid()}
              >
                Ahora no
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      ) : null}
    </>
  )
}
