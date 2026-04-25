/** Major Safari marketing version from WebKit UA, e.g. Version/18.2 → 18 */
export function getSafariMajorVersion(ua: string): number | null {
  const m = /Version\/(\d+)/i.exec(ua)
  if (!m?.[1]) return null
  const n = Number.parseInt(m[1], 10)
  return Number.isFinite(n) ? n : null
}

const IOS_IN_APP_OR_ALTERNATE_BROWSER =
  /CriOS|FxiOS|EdgiOS|OPiOS|OPT\/|Brave\/|DuckDuckGo|Instagram|FBAN|FBAV|Line\//i

export function isAppleTouchDevice(
  ua: string,
  platform: string,
  maxTouchPoints: number
): boolean {
  if (/iPhone|iPod/i.test(ua)) return true
  if (/iPad/i.test(ua)) return true
  if (platform === 'MacIntel' && maxTouchPoints > 1) return true
  return false
}

export function isIosOtherBrowser(ua: string): boolean {
  return IOS_IN_APP_OR_ALTERNATE_BROWSER.test(ua)
}

export function isAndroidPhone(ua: string): boolean {
  return /Android/i.test(ua) && /Mobile/i.test(ua)
}

/** Android (teléfono o tablet); para prompts PWA vía `beforeinstallprompt`, no escritorio Mac/Windows. */
export function isAndroidDevice(ua: string): boolean {
  return /Android/i.test(ua)
}

export function isRunningAsInstalledPwa(): boolean {
  if (typeof window === 'undefined') return false
  if (window.matchMedia('(display-mode: standalone)').matches) return true
  const nav = window.navigator as Navigator & { standalone?: boolean }
  return nav.standalone === true
}

export function isHandheldViewport(width: number): boolean {
  return width <= 1024
}

/** iPhone / iPod / iPad en viewport “mano”; ahí usamos el flujo iOS, no `beforeinstallprompt`. */
export function isAppleHandheldViewport(
  ua: string,
  platform: string,
  maxTouchPoints: number,
  width: number
): boolean {
  return (
    isAppleTouchDevice(ua, platform, maxTouchPoints) &&
    isHandheldViewport(width)
  )
}
