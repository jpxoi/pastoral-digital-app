import { UserRole } from '.'

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: UserRole
      onboardingComplete?: boolean
    }
  }

  interface BeforeInstallPromptEvent extends Event {
    readonly platforms: Array<string>
    readonly userChoice: Promise<{
      outcome: 'accepted' | 'dismissed'
      platform: string
    }>
    prompt(): Promise<void>
  }

  interface WindowEventMap {
    beforeinstallprompt: BeforeInstallPromptEvent
  }
}
