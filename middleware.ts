import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'



const isHomeRoute = createRouteMatcher(['/'])

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/birthdays(.*)',
  '/admin(.*)',
  '/onboarding(.*)',
])

const isAdminRoute = createRouteMatcher(['/admin(.*)'])


export default clerkMiddleware(async (auth, req) => {
  const isInMaintenanceMode = true // Replace with your actual maintenance mode check

  if (isInMaintenanceMode) {
    req.nextUrl.pathname = `/maintenance`
    return NextResponse.rewrite(req.nextUrl)
  }

  if (isProtectedRoute(req)) await auth.protect()

  if (isHomeRoute(req) && (await auth()).sessionClaims) {
    const url = new URL('/dashboard', req.url)
    return NextResponse.redirect(url)
  }

  if (
    isAdminRoute(req) &&
    (await auth()).sessionClaims?.metadata?.role !== 'admin'
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
