import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'
import { redis } from './lib/upstash'

const isHomeRoute = createRouteMatcher(['/'])

const isMaintenanceRoute = createRouteMatcher(['/maintenance'])

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/birthdays(.*)',
  '/admin(.*)',
  '/onboarding(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])

export default clerkMiddleware(async (auth, req) => {
  const isInMaintenanceMode = await redis.get('isInMaintenanceMode')

  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }

  if (isMaintenanceRoute(req) && !isInMaintenanceMode) {
    const url = new URL('/', req.url)
    return NextResponse.redirect(url)
  }

  if (isProtectedRoute(req)) await auth.protect()

  if (isHomeRoute(req) && (await auth()).sessionClaims) {
    const url = new URL('/dashboard', req.url)
    return NextResponse.redirect(url)
  }

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== 'admin' &&
    (await auth()).sessionClaims?.metadata?.role !== 'manager'
  ) {
    const url = new URL('/dashboard', req.url)
    return NextResponse.redirect(url)
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
