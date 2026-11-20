import { clerkMiddleware } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

function matchesPath(pathname: string, route: string) {
  return pathname === route || pathname.startsWith(`${route}/`)
}

function isPublicPath(pathname: string) {
  return (
    pathname === '/' ||
    matchesPath(pathname, '/home') ||
    matchesPath(pathname, '/sign-in') ||
    matchesPath(pathname, '/sign-up') ||
    matchesPath(pathname, '/oauth-consent') ||
    matchesPath(pathname, '/privacy') ||
    matchesPath(pathname, '/terms')
  )
}

const isOnboardingPath = (pathname: string) =>
  matchesPath(pathname, '/onboarding')

export default clerkMiddleware(async (auth, req) => {
  const pathname = req.nextUrl.pathname

  if (isPublicPath(pathname)) return NextResponse.next()

  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth()

  if (!isAuthenticated) return redirectToSignIn({ returnBackUrl: req.url })

  if (isOnboardingPath(pathname)) {
    if (sessionClaims?.metadata?.onboardingComplete === true) {
      return NextResponse.redirect(new URL('/dashboard', req.url))
    }

    return NextResponse.next()
  }

  if (sessionClaims?.metadata?.onboardingComplete !== true) {
    return NextResponse.redirect(new URL('/onboarding', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals, static files, and machine routes.
    '/((?!_next|api/internal(?:/|$)|api/webhooks(?:/|$)|api/schedules(?:/|$)|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|avif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest|txt)).*)',
    // Keep Clerk context for API routes that authorize themselves, except machine routes.
    '/(api(?!/internal(?:/|$)|/webhooks(?:/|$)|/schedules(?:/|$))|trpc)(.*)',
    // Keep Clerk's frontend API proxy active.
    '/__clerk/(.*)',
  ],
}
