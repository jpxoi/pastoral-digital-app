import Link from 'next/link'
import { SiteFooter } from '@/components/marketing/site-footer'
import { SiteHeader } from '@/components/marketing/site-header'
import PrintButton from '@/components/shared/printButton'
import { cn } from '@/lib/utils'
import '@/components/marketing/marketing.css'

export type LegalTocItem = {
  id: string
  title: string
}

export function LegalDocument({
  title,
  updated,
  intro,
  sections,
  related,
  children,
}: {
  title: string
  updated: string
  intro: React.ReactNode
  sections: LegalTocItem[]
  related: { href: string; label: string }
  children: React.ReactNode
}) {
  return (
    <div className='marketing-root'>
      <a
        href='#contenido'
        className='focus:bg-background focus:text-foreground sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:rounded-md focus:p-3 print:hidden'
      >
        Ir al contenido
      </a>
      <SiteHeader variant='legal' />
      <main
        id='contenido'
        tabIndex={-1}
        className='mx-auto w-full max-w-6xl px-4 py-12 outline-none md:px-6 md:py-16'
      >
        <div className='flex flex-col gap-10 lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:items-start lg:gap-16'>
          <aside className='print:hidden lg:sticky lg:top-24'>
            <p className='text-muted-foreground text-xs font-medium tracking-wide uppercase'>
              En esta página
            </p>
            <nav aria-label='Contenido' className='mt-4'>
              <ol className='flex flex-col gap-1.5'>
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className='text-muted-foreground hover:text-foreground flex gap-3 rounded-md py-1 text-sm leading-snug transition-colors'
                    >
                      <span className='font-mono text-xs tabular-nums'>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>

          <article className='min-w-0'>
            <header className='border-border flex flex-col gap-4 border-b pb-8'>
              <div className='flex flex-wrap items-start justify-between gap-3'>
                <p className='text-primary text-xs font-medium tracking-wide'>
                  Pastoral Digital
                </p>
                <PrintButton />
              </div>
              <h1 className='text-3xl font-semibold tracking-tight text-balance sm:text-4xl'>
                {title}
              </h1>
              <p className='text-muted-foreground text-sm'>
                Última actualización: {updated}
              </p>
              <div className='text-foreground/80 max-w-prose text-base leading-relaxed'>
                {intro}
              </div>
              <p className='text-muted-foreground text-sm'>
                También puedes leer{' '}
                <Link
                  href={related.href}
                  className='text-foreground underline decoration-[color-mix(in_oklch,var(--border)_100%,transparent)] underline-offset-4 hover:decoration-current'
                >
                  {related.label}
                </Link>
                .
              </p>
            </header>

            <div
              className={cn(
                'text-muted-foreground mt-2 max-w-prose text-sm leading-relaxed md:text-base',
                '[&_section]:scroll-mt-24 [&_section]:border-border [&_section]:border-b [&_section]:py-10 [&_section:last-child]:border-b-0',
                '[&_h2]:text-foreground [&_h2]:mb-3 [&_h2]:flex [&_h2]:items-baseline [&_h2]:gap-3 [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:tracking-tight',
                '[&_h2_.legal-index]:text-muted-foreground [&_h2_.legal-index]:font-mono [&_h2_.legal-index]:text-xs [&_h2_.legal-index]:font-normal',
                '[&_h3]:text-foreground [&_h3]:mt-6 [&_h3]:mb-2 [&_h3]:text-base [&_h3]:font-semibold',
                '[&_p+_p]:mt-4 [&_ul]:mt-3 [&_ul]:grid [&_ul]:list-disc [&_ul]:gap-y-2 [&_ul]:pl-5',
                '[&_ul_ul]:mt-2 [&_ul_ul]:gap-y-1',
                '[&_strong]:text-foreground [&_strong]:font-medium',
                '[&_a]:text-foreground [&_a]:underline [&_a]:decoration-[color-mix(in_oklch,var(--border)_100%,transparent)] [&_a]:underline-offset-4 [&_a]:hover:decoration-current'
              )}
            >
              {children}
            </div>
          </article>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}

export function LegalHeading({
  index,
  children,
}: {
  index: number
  children: React.ReactNode
}) {
  return (
    <h2>
      <span className='legal-index' aria-hidden='true'>
        {String(index).padStart(2, '0')}
      </span>
      {children}
    </h2>
  )
}
