import { DashboardSvg } from '@/components/marketing/dashboard-svg'
import { IdCardSvg } from '@/components/marketing/id-card-svg'
import { ScanSvg } from '@/components/marketing/scan-svg'

const chapters = [
  {
    title: 'Pastoral ID',
    text: 'Cada catequista tiene un carnet digital con su código QR. Lo abre al llegar y queda identificado en la reunión, la misa o el evento.',
    visual: (
      <IdCardSvg className='mx-auto h-auto w-full max-w-[16rem] drop-shadow-md' />
    ),
    wide: false,
  },
  {
    title: 'Asistencias y misas',
    text: 'En el inicio aparecen las llegadas a tiempo, las tardanzas y las faltas, junto al detalle de cada fecha. También se confirma la misa dominical.',
    visual: (
      <DashboardSvg className='h-auto w-full drop-shadow-md' />
    ),
    wide: true,
  },
  {
    title: 'Escaneo en la puerta',
    text: 'Coordinación abre el lector, apunta al carnet y la asistencia queda anotada. El catequista la ve después en su propio historial.',
    visual: (
      <ScanSvg className='mx-auto h-auto w-full max-w-[22rem] drop-shadow-md' />
    ),
    wide: false,
  },
] as const

export function LandingProduct() {
  return (
    <section
      id='la-app'
      className='mx-auto w-full max-w-6xl scroll-mt-24 px-4 py-16 md:px-6 md:py-24'
    >
      <div className='max-w-2xl'>
        <h2 className='text-3xl font-semibold tracking-tight sm:text-4xl'>
          Carnet, asistencias y coordinación
        </h2>
        <p className='text-foreground/70 mt-4 text-base leading-relaxed'>
          Pastoral Digital cubre lo que ocurre antes, durante y después de cada
          encuentro: identificarte, registrar la llegada y revisar el historial.
        </p>
      </div>

      <div className='mt-14 flex flex-col gap-16 md:gap-20'>
        {chapters.map((chapter, index) => (
          <article
            key={chapter.title}
            className={`grid items-center gap-8 md:gap-12 ${
              chapter.wide
                ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]'
                : 'lg:grid-cols-2'
            }`}
          >
            <div
              className={`bg-muted/50 overflow-hidden rounded-3xl border p-5 sm:p-8 ${
                index === 1 ? 'lg:order-2' : ''
              }`}
            >
              {chapter.visual}
            </div>
            <div className={index === 1 ? 'lg:order-1' : ''}>
              <h3 className='text-2xl font-semibold tracking-tight'>
                {chapter.title}
              </h3>
              <p className='text-muted-foreground mt-3 max-w-md text-base leading-relaxed'>
                {chapter.text}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
