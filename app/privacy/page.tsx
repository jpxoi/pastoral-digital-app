import Link from 'next/link'
import { Metadata } from 'next'
import {
  ArrowUp,
  Shield,
  Database,
  Server,
  ExternalLink,
  Lock,
  RefreshCw,
  Mail,
  Users,
  ChevronLeft,
  Printer,
} from 'lucide-react'
import PrintButton from '@/components/shared/print-button'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Pastoral Mariana',
  description:
    'Descubra cómo Pastoral Mariana recopila, utiliza y protege sus datos personales. Última actualización: 10 de marzo de 2025.',
}

export default function PrivacyPolicyPage() {
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
            <ChevronLeft className='mr-1 h-4 w-4' /> Volver al inicio
          </Link>
          <PrintButton />
        </div>

        {/* Encabezado */}
        <div className='mb-8 rounded-xl border-l-4 border-blue-500 bg-white p-8 shadow-md'>
          <h1 className='mb-4 text-4xl font-bold text-gray-800'>
            Política de Privacidad
          </h1>
          <p className='mb-6 text-gray-500'>
            Última actualización:{' '}
            <span className='font-medium'>{lastUpdated}</span>
          </p>
          <p className='mb-6 text-lg text-gray-700'>
            En{' '}
            <span className='font-semibold text-blue-600'>
              Pastoral Mariana
            </span>
            , respetamos y protegemos su privacidad. Esta política describe
            detalladamente cómo recolectamos, utilizamos y protegemos sus datos
            personales.
          </p>

          {/* Índice de contenidos */}
          <div className='my-8 rounded-lg bg-blue-50 p-6 print:border print:border-blue-200'>
            <h2
              className='mb-4 flex items-center text-xl font-semibold text-gray-800'
              id='tabla-contenido'
            >
              <Database
                className='mr-2 h-5 w-5 text-blue-500'
                aria-hidden='true'
              />
              Contenido de la política
            </h2>
            <ul
              className='gap-2 grid md:grid-cols-2'
              aria-labelledby='tabla-contenido'
            >
              {[
                'Recopilación de Datos',
                'Cookies y Tecnologías',
                'Servicios de Terceros',
                'Uso de la Información',
                'Derechos del Usuario',
                'Menores de Edad',
                'Seguridad',
                'Cambios en la Política',
                'Contacto',
              ].map((section) => (
                <li key={section}>
                  <a
                    href={`#${section.toLowerCase().replace(/ /g, '-')}`}
                    className='flex items-center text-blue-600 hover:text-blue-800 hover:underline'
                    aria-label={`Ir a la sección ${section}`}
                  >
                    <ArrowUp
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

        {/* Secciones de la política */}
        <div className='space-y-8'>
          {/* Recopilación de datos */}
          <section
            id='recopilación-de-datos'
            className='rounded-xl border-l-4 border-indigo-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Database className='mr-2 h-6 w-6 text-indigo-500' />
              Recopilación de Datos
            </h2>
            <p className='mb-4 text-gray-700'>
              Aunque no recopilamos directamente datos personales sensibles,
              podemos almacenar:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                Información básica de perfil (nombres, apellidos, fecha de nacimiento, etc.)
              </li>
              <li>Datos de contacto que usted proporcione voluntariamente</li>
              <li>
                Registros de actividad dentro de la aplicación para mejorar su
                experiencia
              </li>
              <li>
                Información técnica como direcciones IP y tipo de dispositivo
              </li>
            </ul>
            <p className='text-gray-700'>
              Todos los datos personales sensibles relacionados con
              autenticación son gestionados de manera segura por Clerk, conforme
              a sus políticas de privacidad y estándares de seguridad.
            </p>
          </section>

          {/* Cookies */}
          <section
            id='cookies-y-tecnologías'
            className='rounded-xl border-l-4 border-yellow-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Server className='mr-2 h-6 w-6 text-yellow-500' />
              Cookies y Tecnologías
            </h2>
            <p className='mb-4 text-gray-700'>
              Nuestra aplicación utiliza cookies y tecnologías similares para
              mejorar la experiencia del usuario:
            </p>
            <ul className='list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                <span className='font-medium'>Cookies esenciales:</span>{' '}
                Necesarias para el funcionamiento básico de la aplicación
              </li>
              <li>
                <span className='font-medium'>Cookies funcionales:</span> Para
                recordar sus preferencias y personalizar su experiencia
              </li>
              <li>
                <span className='font-medium'>Cookies analíticas:</span> Para
                entender cómo se utiliza nuestra aplicación
              </li>
            </ul>
            <p className='mt-4 text-gray-700'>
              Puede configurar su navegador para rechazar todas o algunas
              cookies, o para alertarle cuando los sitios web configuran o
              acceden a las cookies.
            </p>
          </section>

          {/* Servicios de Terceros */}
          <section
            id='servicios-de-terceros'
            className='rounded-xl border-l-4 border-green-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <ExternalLink className='mr-2 h-6 w-6 text-green-500' />
              Servicios de Terceros
            </h2>
            <p className='mb-6 text-gray-700'>
              Utilizamos los siguientes servicios de terceros para garantizar la
              seguridad y funcionalidad de nuestra aplicación:
            </p>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 text-lg font-semibold text-green-700'>
                  Clerk
                </h3>
                <p className='mb-2 text-gray-700'>
                  Gestiona la autenticación y los datos relacionados con el
                  acceso de los usuarios.
                </p>
                <a
                  href='https://clerk.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-sm text-green-600 hover:text-green-800'
                >
                  Ver política de privacidad de Clerk{' '}
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </div>
              <div className='rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 text-lg font-semibold text-green-700'>
                  Supabase
                </h3>
                <p className='mb-2 text-gray-700'>
                  Almacena información adicional de los usuarios, como datos no
                  sensibles necesarios para el funcionamiento de la aplicación.
                </p>
                <a
                  href='https://supabase.com/privacy'
                  target='_blank'
                  rel='noopener noreferrer'
                  className='flex items-center text-sm text-green-600 hover:text-green-800'
                >
                  Ver política de privacidad de Supabase{' '}
                  <ExternalLink className='ml-1 h-3 w-3' />
                </a>
              </div>
            </div>
          </section>

          {/* Uso de la Información */}
          <section
            id='uso-de-la-información'
            className='rounded-xl border-l-4 border-purple-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Users className='mr-2 h-6 w-6 text-purple-500' />
              Uso de la Información
            </h2>
            <p className='mb-4 text-gray-700'>
              La información recopilada se utiliza exclusivamente para:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                Proporcionar, mantener y mejorar los servicios de Pastoral
                Digital
              </li>
              <li>Personalizar su experiencia dentro de la aplicación</li>
              <li>Facilitar la comunicación entre miembros pastorales</li>
              <li>
                Enviar notificaciones relevantes sobre actividades pastorales
              </li>
              <li>
                Realizar análisis y estadísticas anónimas para mejorar la
                aplicación
              </li>
            </ul>
            <p className='text-gray-700'>
              No vendemos, alquilamos ni compartimos su información personal con
              terceros no afiliados para fines de marketing.
            </p>
          </section>

          {/* Derechos del usuario */}
          <section
            id='derechos-del-usuario'
            className='rounded-xl border-l-4 border-blue-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Shield className='mr-2 h-6 w-6 text-blue-500' />
              Derechos del Usuario
            </h2>
            <p className='mb-4 text-gray-700'>
              Como usuario de Pastoral Digital, usted tiene derecho a:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Acceder a sus datos personales almacenados</li>
              <li>Rectificar información incorrecta</li>
              <li>Solicitar la eliminación de sus datos (derecho al olvido)</li>
              <li>Limitar el procesamiento de su información</li>
              <li>Portabilidad de datos</li>
              <li>Oponerse al procesamiento de sus datos</li>
            </ul>
            <p className='text-gray-700'>
              Para ejercer cualquiera de estos derechos, por favor contáctenos a
              través de los canales indicados en la sección de Contacto.
            </p>
          </section>

          {/* Menores de edad */}
          <section
            id='menores-de-edad'
            className='rounded-xl border-l-4 border-orange-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Users className='mr-2 h-6 w-6 text-orange-500' />
              Menores de Edad
            </h2>
            <p className='mb-4 text-gray-700'>
              Pastoral Digital no está destinada a menores de 13 años. No
              recopilamos intencionalmente información personal de menores. Si
              es padre o tutor y cree que su hijo nos ha proporcionado
              información personal, contáctenos para que podamos tomar las
              medidas necesarias.
            </p>
            <p className='text-gray-700'>
              Para usuarios entre 13 y 18 años, requerimos el consentimiento de
              un padre o tutor legal para el uso de nuestra aplicación.
            </p>
          </section>

          {/* Seguridad */}
          <section
            id='seguridad'
            className='rounded-xl border-l-4 border-red-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Lock className='mr-2 h-6 w-6 text-red-500' />
              Seguridad
            </h2>
            <p className='mb-4 text-gray-700'>
              La seguridad de sus datos es nuestra prioridad. Implementamos
              medidas técnicas y organizativas para proteger su información:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Encriptación de datos en tránsito y en reposo</li>
              <li>Sistemas de autenticación robustos a través de Clerk</li>
              <li>Auditorías regulares de seguridad</li>
              <li>Acceso restringido a información personal</li>
              <li>Protocolos de respuesta ante incidentes</li>
            </ul>
            <p className='text-gray-700'>
              Aunque nos esforzamos por proteger su información personal, ningún
              método de transmisión por Internet o almacenamiento electrónico es
              100% seguro.
            </p>
          </section>

          {/* Cambios en la Política */}
          <section
            id='cambios-en-la-política'
            className='rounded-xl border-l-4 border-teal-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <RefreshCw className='mr-2 h-6 w-6 text-teal-500' />
              Cambios en la Política
            </h2>
            <p className='mb-4 text-gray-700'>
              Nos reservamos el derecho de actualizar esta política de
              privacidad periódicamente para reflejar cambios en nuestras
              prácticas o por otros motivos operativos, legales o regulatorios.
            </p>
            <p className='mb-4 text-gray-700'>
              Cuando realicemos cambios significativos en esta política:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                Mostraremos una notificación prominente dentro de la aplicación
              </li>
              <li>
                Actualizaremos la fecha de &ldquo;última actualización&rdquo; en
                la parte superior de esta política
              </li>
              <li>
                Podemos enviar un correo electrónico con los detalles de los
                cambios importantes
              </li>
            </ul>
            <p className='text-gray-700'>
              Le recomendamos revisar esta política periódicamente para estar
              informado sobre cómo protegemos su información.
            </p>
          </section>

          {/* Contacto */}
          <section
            id='contacto'
            className='rounded-xl border-l-4 border-pink-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Mail className='mr-2 h-6 w-6 text-pink-500' />
              Contacto
            </h2>
            <p className='mb-6 text-gray-700'>
              Si tiene alguna pregunta sobre esta política de privacidad o sobre
              el tratamiento de sus datos personales, puede contactar a Pastoral
              Mariana a través de:
            </p>
            <div className='rounded-lg bg-gray-50 p-5'>
              <p className='mb-3 text-gray-700'>
                <span className='font-medium'>Correo electrónico:</span>{' '}
                pastoral@ps.edu.pe
              </p>
              <p className='text-gray-700'>
                <span className='font-medium'>Dirección postal:</span> Jr.
                Haendel 118, Urbanización Primavera, Trujillo 13001, Perú
              </p>
            </div>
            <p className='mt-6 text-gray-700'>
              Pastoral Mariana se compromete a resolver cualquier consulta o
              preocupación que pueda tener sobre el uso de su información
              personal.
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
            <Link
              href='/'
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Inicio
            </Link>
            <Link
              href='/terms'
              className='mx-2 text-blue-600 hover:text-blue-800'
            >
              Términos de Uso
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}