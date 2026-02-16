import { UserRole } from '.'

export {}

declare global {
  interface CustomJwtSessionClaims {
    metadata?: {
      role?: UserRole
      onboardingComplete?: boolean
    }
  }
}
