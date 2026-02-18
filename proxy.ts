import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isOnboardingRoute = createRouteMatcher(['/onboarding'])
const isMaintenanceRoute = createRouteMatcher(['/maintenance'])
const isAdminRoute = createRouteMatcher(['/admin(.*)'])

const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/fallback(.*)',
  '/api(.*)',
  '/home(.*)',
  '/maintenance(.*)',
  '/privacy(.*)',
  '/terms(.*)',
])

export default clerkMiddleware(async (auth, req) => {
  const isInMaintenanceMode = false

  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }

  if (isMaintenanceRoute(req) && !isInMaintenanceMode) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  const { isAuthenticated, sessionClaims, redirectToSignIn } = await auth()

  if (isAuthenticated && isOnboardingRoute(req)) {
    return NextResponse.next()
  }

  if (!isAuthenticated && !isPublicRoute(req))
    return redirectToSignIn({ returnBackUrl: req.url })

  if (isAuthenticated && !sessionClaims?.metadata?.onboardingComplete) {
    const onboardingUrl = new URL('/onboarding', req.url)
    return NextResponse.redirect(onboardingUrl)
  }

  if (
    isAuthenticated &&
    isAdminRoute(req) &&
    sessionClaims?.metadata?.role !== 'admin' &&
    sessionClaims?.metadata?.role !== 'manager'
  ) {
    const url = new URL('/dashboard', req.url)
    return NextResponse.redirect(url)
  }

  if (isAuthenticated && !isPublicRoute(req)) return NextResponse.next()
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
