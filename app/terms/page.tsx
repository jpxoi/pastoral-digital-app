import Link from 'next/link'
import { Metadata } from 'next'
import {
  IconArrowUp,
  IconFileText,
  IconShield,
  IconAlertTriangle,
  IconUser,
  IconExternalLink,
  IconChevronLeft,
  IconBan,
  IconScale,
  IconCircleCheck,
  IconMessageChatbot,
} from '@tabler/icons-react'
import PrintButton from '@/components/shared/printButton'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Pastoral Mariana',
  description:
    'Términos y condiciones de uso de la plataforma Pastoral Digital App. Última actualización: 10 de marzo de 2025.',
}

export default function TermsAndConditionsPage() {
  // Fecha de última actualización
  const lastUpdated = '10 de marzo de 2025'

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 print:bg-white'>
      <div className='mx-auto max-w-5xl px-4 py-12'>
        <div className='mb-6 flex items-center justify-between'>
          <Link
            href='/'
            className='inline-flex items-center text-blue-600 hover:text-blue-800'
          >
            <IconChevronLeft className='mr-1 h-4 w-4' /> Volver al inicio
          </Link>
          <PrintButton />
        </div>

        {/* Encabezado */}
        <div className='mb-8 rounded-xl border-l-4 border-blue-500 bg-white p-8 shadow-md'>
          <h1 className='mb-4 text-4xl font-bold text-gray-800'>
            Términos y Condiciones de Uso
          </h1>
          <p className='mb-6 text-gray-500'>
            Última actualización:{' '}
            <span className='font-medium'>{lastUpdated}</span>
          </p>
          <p className='mb-6 text-lg text-gray-700'>
            Bienvenido a{' '}
            <span className='font-semibold text-blue-600'>
              Pastoral Digital App
            </span>
            . Estos términos y condiciones establecen las reglas y regulaciones
            para el uso de nuestra aplicación. Al acceder y utilizar esta
            plataforma, aceptas cumplir y estar sujeto a estos términos.
          </p>

          {/* Índice de contenidos */}
          <div className='my-8 rounded-lg bg-blue-50 p-6 print:border print:border-blue-200'>
            <h2
              className='mb-4 flex items-center text-xl font-semibold text-gray-800'
              id='tabla-contenido'
            >
              <IconFileText
                className='mr-2 h-5 w-5 text-blue-500'
                aria-hidden='true'
              />
              Contenido de los términos
            </h2>
            <ul
              className='grid gap-2 md:grid-cols-2'
              aria-labelledby='tabla-contenido'
            >
              {[
                'Aceptación de Términos',
                'Registro y Cuentas',
                'Propiedad Intelectual',
                'Uso Aceptable',
                'Contenido del Usuario',
                'Limitación de Responsabilidad',
                'Enlaces a Terceros',
                'Terminación de Acceso',
                'Modificaciones',
                'Legislación Aplicable',
              ].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase().replace(/ /g, '-')}`}
                    className='flex items-center text-blue-600 hover:text-blue-800 hover:underline'
                    aria-label={`Ir a la sección ${section}`}
                  >
                    <IconArrowUp
                      className='mr-2 h-4 w-4 rotate-45'
                      aria-hidden='true'
                    />
                    {section}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Secciones de los términos */}
        <div className='space-y-8'>
          {/* Aceptación de Términos */}
          <section
            id='aceptación-de-términos'
            className='rounded-xl border-l-4 border-indigo-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconCircleCheck className='mr-2 h-6 w-6 text-indigo-500' />
              Aceptación de Términos
            </h2>
            <p className='mb-4 text-gray-700'>
              Al acceder o utilizar la aplicación Pastoral Digital App (&quot;la
              Aplicación&quot;), usted reconoce que ha leído, entendido y acepta
              estar sujeto a estos Términos y Condiciones, junto con nuestra
              Política de Privacidad.
            </p>
            <p className='mb-4 text-gray-700'>
              Si no está de acuerdo con alguna parte de estos términos, no podrá
              acceder ni utilizar nuestros servicios. El uso continuado de la
              Aplicación constituye la aceptación continua de estos términos.
            </p>
            <p className='text-gray-700'>
              Estos términos se aplican a todos los usuarios, incluidos sin
              limitación, usuarios que son navegadores, agentes pastorales,
              coordinadores, administradores, y/o contribuyentes de contenido.
            </p>
          </section>

          {/* Registro y Cuentas */}
          <section
            id='registro-y-cuentas'
            className='rounded-xl border-l-4 border-yellow-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconUser className='mr-2 h-6 w-6 text-yellow-500' />
              Registro y Cuentas
            </h2>
            <p className='mb-4 text-gray-700'>
              Al registrarse en Pastoral Digital App, usted se compromete a:
            </p>
            <ul className='list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                Proporcionar información verdadera, precisa, actual y completa
                sobre usted
              </li>
              <li>
                Mantener y actualizar prontamente sus datos para mantener la
                información verdadera, precisa, actual y completa
              </li>
              <li>
                Mantener la seguridad de su contraseña y ser responsable de
                todas las actividades realizadas con su cuenta
              </li>
              <li>
                Notificar inmediatamente cualquier uso no autorizado de su
                cuenta o cualquier otra violación de seguridad
              </li>
            </ul>
            <p className='mt-4 text-gray-700'>
              Nos reservamos el derecho de suspender o terminar su cuenta si
              determinamos que ha proporcionado información falsa o que viola
              estos términos.
            </p>
          </section>

          {/* Propiedad Intelectual */}
          <section
            id='propiedad-intelectual'
            className='rounded-xl border-l-4 border-green-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconShield className='mr-2 h-6 w-6 text-green-500' />
              Propiedad Intelectual
            </h2>
            <p className='mb-4 text-gray-700'>
              El contenido de la Aplicación, incluyendo pero no limitado a
              textos, gráficos, logotipos, iconos, imágenes, clips de audio,
              descargas digitales, compilaciones de datos y software, es
              propiedad de Pastoral Mariana o de sus proveedores de contenido y
              está protegido por las leyes de propiedad intelectual.
            </p>
            <p className='mb-4 text-gray-700'>
              No está permitido utilizar, reproducir, modificar, distribuir o
              mostrar ninguna parte del contenido sin nuestro permiso previo por
              escrito, excepto según lo permitido para el uso personal y no
              comercial relacionado con actividades pastorales.
            </p>
            <p className='text-gray-700'>
              Todas las marcas comerciales, marcas de servicio, nombres
              comerciales y logotipos utilizados en la Aplicación son propiedad
              de Pastoral Mariana o de sus respectivos propietarios.
            </p>
          </section>

          {/* Uso Aceptable */}
          <section
            id='uso-aceptable'
            className='rounded-xl border-l-4 border-purple-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconCircleCheck className='mr-2 h-6 w-6 text-purple-500' />
              Uso Aceptable
            </h2>
            <p className='mb-4 text-gray-700'>
              Al utilizar nuestra Aplicación, usted se compromete a no:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Violar cualquier ley, reglamento o normativa aplicable</li>
              <li>
                Infringir los derechos de propiedad intelectual u otros derechos
                de terceros
              </li>
              <li>
                Publicar o transmitir material obsceno, amenazante, difamatorio
                o ilegal
              </li>
              <li>
                Utilizar la Aplicación para fines fraudulentos o engañosos
              </li>
              <li>
                Interferir o interrumpir la integridad o el rendimiento de la
                Aplicación
              </li>
              <li>
                Intentar obtener acceso no autorizado a los sistemas o redes
                relacionados
              </li>
              <li>
                Recopilar o almacenar datos personales de otros usuarios sin su
                consentimiento
              </li>
              <li>
                Utilizar la Aplicación de manera que pueda dañar, sobrecargar o
                deteriorar nuestros servicios
              </li>
            </ul>
            <p className='text-gray-700'>
              Nos reservamos el derecho de suspender o terminar el acceso a la
              Aplicación a cualquier usuario que incumpla estas restricciones.
            </p>
          </section>

          {/* Contenido del Usuario */}
          <section
            id='contenido-del-usuario'
            className='rounded-xl border-l-4 border-blue-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconMessageChatbot className='mr-2 h-6 w-6 text-blue-500' />
              Contenido del Usuario
            </h2>
            <p className='mb-4 text-gray-700'>
              Al compartir, publicar o cargar contenido en nuestra Aplicación,
              usted:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Garantiza que tiene derecho a compartir dicho contenido</li>
              <li>
                Otorga a Pastoral Mariana una licencia no exclusiva, mundial,
                libre de regalías, sublicenciable y transferible para usar,
                reproducir, distribuir y mostrar dicho contenido en relación con
                el funcionamiento de la Aplicación
              </li>
              <li>
                Comprende que es responsable de cualquier contenido que publique
              </li>
              <li>
                Acepta que podemos eliminar cualquier contenido que consideremos
                inapropiado o que viole estos términos
              </li>
            </ul>
            <p className='text-gray-700'>
              Nos reservamos el derecho, pero no la obligación, de supervisar y
              moderar cualquier contenido publicado en la Aplicación.
            </p>
          </section>

          {/* Limitación de Responsabilidad */}
          <section
            id='limitación-de-responsabilidad'
            className='rounded-xl border-l-4 border-orange-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconAlertTriangle className='mr-2 h-6 w-6 text-orange-500' />
              Limitación de Responsabilidad
            </h2>
            <p className='mb-4 text-gray-700'>
              En la medida permitida por la ley aplicable, Pastoral Mariana y
              sus colaboradores:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                No serán responsables por daños indirectos, incidentales,
                especiales, consecuentes o punitivos
              </li>
              <li>
                No garantizan que la Aplicación estará disponible de forma
                ininterrumpida, oportuna, segura o libre de errores
              </li>
              <li>
                No garantizan que los resultados obtenidos del uso de la
                Aplicación serán precisos o confiables
              </li>
              <li>
                Proveen la Aplicación &quot;tal cual&quot; y &quot;según
                disponibilidad&quot; sin garantías de ningún tipo
              </li>
            </ul>
            <p className='text-gray-700'>
              El usuario acepta que utiliza la Aplicación bajo su propio riesgo
              y que asume la responsabilidad por su uso.
            </p>
          </section>

          {/* Enlaces a Terceros */}
          <section
            id='enlaces-a-terceros'
            className='rounded-xl border-l-4 border-red-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconExternalLink className='mr-2 h-6 w-6 text-red-500' />
              Enlaces a Terceros
            </h2>
            <p className='mb-4 text-gray-700'>
              Nuestra Aplicación puede contener enlaces a sitios web o servicios
              de terceros que no son propiedad ni están controlados por Pastoral
              Mariana.
            </p>
            <p className='mb-4 text-gray-700'>
              No tenemos control sobre el contenido, políticas de privacidad o
              prácticas de sitios o servicios de terceros y no asumimos ninguna
              responsabilidad por ellos. Recomendamos encarecidamente que revise
              los términos y políticas de cualquier sitio de terceros que
              visite.
            </p>
            <p className='text-gray-700'>
              La inclusión de cualquier enlace no implica aprobación, respaldo o
              recomendación por parte de Pastoral Mariana.
            </p>
          </section>

          {/* Terminación de Acceso */}
          <section
            id='terminación-de-acceso'
            className='rounded-xl border-l-4 border-teal-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconBan className='mr-2 h-6 w-6 text-teal-500' />
              Terminación de Acceso
            </h2>
            <p className='mb-4 text-gray-700'>
              Podemos terminar o suspender su acceso a la Aplicación
              inmediatamente, sin previo aviso o responsabilidad, por cualquier
              motivo, incluido, sin limitación, si incumple estos Términos y
              Condiciones.
            </p>
            <p className='mb-4 text-gray-700'>
              Tras la terminación, su derecho a utilizar la Aplicación cesará
              inmediatamente. Si desea terminar su cuenta, puede simplemente
              discontinuar el uso de la Aplicación o solicitar la eliminación de
              su cuenta.
            </p>
            <p className='text-gray-700'>
              Todas las disposiciones de los Términos que por su naturaleza
              deban sobrevivir a la terminación seguirán vigentes, incluyendo,
              sin limitación, las disposiciones de propiedad, renuncias de
              garantía y limitaciones de responsabilidad.
            </p>
          </section>

          {/* Modificaciones */}
          <section
            id='modificaciones'
            className='rounded-xl border-l-4 border-pink-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconFileText className='mr-2 h-6 w-6 text-pink-500' />
              Modificaciones
            </h2>
            <p className='mb-4 text-gray-700'>
              Nos reservamos el derecho, a nuestra sola discreción, de modificar
              o reemplazar estos Términos en cualquier momento. Los cambios
              entrarán en vigor inmediatamente después de su publicación en la
              Aplicación.
            </p>
            <p className='mb-4 text-gray-700'>
              Si realizamos cambios materiales a estos Términos:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Publicaremos una notificación visible en la Aplicación</li>
              <li>
                Actualizaremos la fecha de &quot;última actualización&quot; en
                estos Términos
              </li>
              <li>
                Podemos enviar una notificación a través de la Aplicación o por
                correo electrónico
              </li>
            </ul>
            <p className='text-gray-700'>
              Su uso continuado de la Aplicación después de la publicación de
              cualquier modificación constituye la aceptación de esos cambios.
              Es su responsabilidad revisar periódicamente estos Términos.
            </p>
          </section>

          {/* Legislación Aplicable */}
          <section
            id='legislación-aplicable'
            className='rounded-xl border-l-4 border-indigo-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <IconScale className='mr-2 h-6 w-6 text-indigo-500' />
              Legislación Aplicable
            </h2>
            <p className='mb-4 text-gray-700'>
              Estos Términos se regirán e interpretarán de acuerdo con las leyes
              de la República del Perú, sin tener en cuenta sus disposiciones
              sobre conflicto de leyes.
            </p>
            <p className='mb-4 text-gray-700'>
              Nuestra falta de ejercicio o aplicación de cualquier derecho o
              disposición de estos Términos no constituirá una renuncia a tal
              derecho o disposición. Si alguna disposición de estos Términos es
              considerada inválida o inaplicable por un tribunal, las
              disposiciones restantes de estos Términos permanecerán en vigor.
            </p>
            <p className='text-gray-700'>
              Cualquier controversia que surja de estos Términos se resolverá
              mediante arbitraje en la ciudad de Trujillo, Perú, de conformidad
              con las reglas de la Cámara de Comercio de Lima.
            </p>
          </section>
        </div>

        {/* Pie de página */}
        <div className='mt-12 text-center text-gray-500'>
          <p>
            Pastoral Mariana © {new Date().getFullYear()} - Desarrollado por{' '}
            <a
              href='https://jpxoi.com'
              className='text-blue-600 hover:text-blue-800'
            >
              Jean Paul Fernandez
            </a>
            . Todos los derechos reservados.
          </p>
          <div className='mt-2'>
            <Link href='/' className='mx-2 text-blue-600 hover:text-blue-800'>
              Inicio
            </Link>
            <Link
              href='/privacy'
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Política de Privacidad
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
