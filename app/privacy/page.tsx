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
    'Descubra cómo Pastoral Mariana recopila, utiliza y protege sus datos personales. Última actualización: 14 de marzo de 2025.',
}

export default function PrivacyPolicyPage() {
  // Fecha de última actualización
  const lastUpdated = '14 de marzo de 2025'

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
                'Cumplimiento de Normativas',
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
              Recopilamos información para proporcionar mejores servicios a todos nuestros usuarios. A continuación, detallamos los datos que podemos recopilar:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                <strong>Información que usted nos proporciona:</strong> Al registrarse, proporcionará información básica de perfil (nombres, apellidos, fecha de nacimiento, correo electrónico).
              </li>
              <li>
                <strong>Información que recopilamos cuando utiliza nuestros servicios:</strong>
                <ul className='mt-2 ml-6 list-inside list-disc space-y-1 text-gray-700'>
                  <li>Información del dispositivo (modelo de hardware, versión del sistema operativo)</li>
                  <li>Registros de uso y actividad dentro de la aplicación</li>
                  <li>Información de ubicación (si ha otorgado los permisos correspondientes)</li>
                  <li>Dirección IP y otros identificadores únicos</li>
                </ul>
              </li>
            </ul>
            <p className='text-gray-700'>
              La autenticación y gestión de credenciales se realiza a través de Clerk, quien procesa y almacena datos de autenticación conforme a sus políticas de privacidad y estándares de seguridad.
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
              Nuestra aplicación utiliza cookies y tecnologías similares para mejorar la experiencia del usuario:
            </p>
            <ul className='list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                <span className='font-medium'>Cookies esenciales:</span>{' '}
                Necesarias para el funcionamiento básico de la aplicación y no pueden ser desactivadas.
              </li>
              <li>
                <span className='font-medium'>Cookies funcionales:</span>{' '}
                Para recordar sus preferencias y personalizar su experiencia.
              </li>
              <li>
                <span className='font-medium'>Cookies analíticas:</span>{' '}
                Para entender cómo se utiliza nuestra aplicación y mejorar nuestros servicios.
              </li>
            </ul>
            <p className='mt-4 text-gray-700'>
              Puede configurar su navegador para rechazar todas o algunas cookies, o para alertarle cuando los sitios web configuran o acceden a las cookies. Sin embargo, si desactiva o rechaza cookies, algunas partes de nuestra aplicación podrían no funcionar correctamente.
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
              Utilizamos los siguientes servicios de terceros para garantizar la seguridad y funcionalidad de nuestra aplicación:
            </p>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='rounded-lg bg-gray-50 p-4'>
                <h3 className='mb-2 text-lg font-semibold text-green-700'>
                  Clerk
                </h3>
                <p className='mb-2 text-gray-700'>
                  Gestiona la autenticación y los datos relacionados con el acceso de los usuarios. Clerk procesa datos personales como correos electrónicos y contraseñas.
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
                  Almacena información de los usuarios y datos de la aplicación. Supabase procesa datos como perfiles de usuario e información relacionada con las actividades pastorales.
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
            <p className='mt-4 text-gray-700'>
              Cuando utilizamos proveedores de servicios externos, estos solo procesan su información en nuestro nombre y de conformidad con nuestras instrucciones y esta política de privacidad.
            </p>
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
                Proporcionar, mantener y mejorar los servicios de Pastoral Mariana
              </li>
              <li>Personalizar su experiencia dentro de la aplicación</li>
              <li>Facilitar la comunicación entre miembros pastorales</li>
              <li>
                Enviar notificaciones relevantes sobre actividades pastorales
              </li>
              <li>
                Realizar análisis y estadísticas anónimas para mejorar la aplicación
              </li>
              <li>
                Detectar, investigar y prevenir actividades fraudulentas y abusos
              </li>
              <li>
                Cumplir con obligaciones legales aplicables
              </li>
            </ul>
            <p className='text-gray-700'>
              <strong>No vendemos ni alquilamos sus datos personales a terceros con fines comerciales o publicitarios.</strong> La información compartida con terceros se limita a lo necesario para proporcionar nuestros servicios y siempre bajo estrictas garantías de confidencialidad.
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
              Como usuario de Pastoral Mariana, usted tiene los siguientes derechos sobre sus datos personales:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li><strong>Acceso:</strong> Derecho a solicitar copias de sus datos personales</li>
              <li><strong>Rectificación:</strong> Derecho a solicitar la corrección de información inexacta</li>
              <li><strong>Supresión:</strong> Derecho a solicitar la eliminación de sus datos (derecho al olvido)</li>
              <li><strong>Limitación:</strong> Derecho a solicitar la restricción del procesamiento de sus datos</li>
              <li><strong>Portabilidad:</strong> Derecho a solicitar la transferencia de sus datos a otra organización</li>
              <li><strong>Oposición:</strong> Derecho a oponerse al procesamiento de sus datos</li>
              <li><strong>Revocación del consentimiento:</strong> Derecho a retirar su consentimiento en cualquier momento</li>
            </ul>
            <p className='text-gray-700'>
              Para ejercer cualquiera de estos derechos, contáctenos a través del correo electrónico pastoral@ps.edu.pe. Responderemos a su solicitud dentro del plazo establecido por la ley aplicable, normalmente en un plazo máximo de 30 días.
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
              Pastoral Mariana no está destinada a menores de 13 años. No recopilamos intencionalmente información personal de niños menores de 13 años. Si detectamos que hemos recopilado datos personales de un niño menor de 13 años sin la verificación del consentimiento parental, tomaremos medidas para eliminar esa información lo antes posible.
            </p>
            <p className='text-gray-700'>
              Para usuarios entre 13 y 18 años, requerimos el consentimiento verificable de un padre o tutor legal para el uso de nuestra aplicación. Si es padre o tutor y cree que su hijo nos ha proporcionado información personal sin su consentimiento, contáctenos inmediatamente a pastoral@ps.edu.pe.
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
              La seguridad de sus datos es nuestra prioridad. Implementamos medidas técnicas y organizativas para proteger su información:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Encriptación de datos en tránsito mediante protocolos SSL/TLS</li>
              <li>Encriptación de datos en reposo en nuestras bases de datos</li>
              <li>Sistemas de autenticación robustos a través de Clerk</li>
              <li>Auditorías regulares de seguridad y pruebas de penetración</li>
              <li>Acceso restringido a información personal basado en principios de necesidad de conocimiento</li>
              <li>Protocolos de respuesta ante incidentes de seguridad</li>
              <li>Formación regular del personal sobre prácticas de seguridad de datos</li>
            </ul>
            <p className='text-gray-700'>
              Aunque implementamos salvaguardias diseñadas para proteger su información, ningún sistema de seguridad es impenetrable. No podemos garantizar que la información no será vista, divulgada, alterada o destruida por incumplimiento de cualquiera de nuestras salvaguardias físicas, técnicas o administrativas.
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
              Nos reservamos el derecho de actualizar esta política de privacidad periódicamente. Los cambios entrarán en vigor inmediatamente después de su publicación en la aplicación.
            </p>
            <p className='mb-4 text-gray-700'>
              Cuando realicemos cambios significativos en esta política:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>
                Mostraremos una notificación prominente dentro de la aplicación
              </li>
              <li>
                Actualizaremos la fecha de &ldquo;última actualización&rdquo; en la parte superior de esta política
              </li>
              <li>
                Podemos enviar un correo electrónico con los detalles de los cambios importantes
              </li>
              <li>
                Podemos solicitar que acepte activamente los nuevos términos antes de seguir utilizando nuestros servicios
              </li>
            </ul>
            <p className='text-gray-700'>
              El uso continuado de nuestra aplicación después de la publicación de cambios constituye su aceptación de dichos cambios. Le recomendamos revisar esta política periódicamente para estar informado sobre cómo protegemos su información.
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
              Si tiene alguna pregunta sobre esta política de privacidad o sobre el tratamiento de sus datos personales, puede contactar a nuestro Responsable de Protección de Datos a través de:
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
              <p className='mt-3 text-gray-700'>
                <span className='font-medium'>Teléfono:</span> +51 941 952 314
              </p>
            </div>
            <p className='mt-6 text-gray-700'>
              Pastoral Mariana se compromete a resolver cualquier consulta o preocupación que pueda tener sobre el uso de su información personal. Si considera que no hemos abordado satisfactoriamente su preocupación, tiene derecho a presentar una reclamación ante la autoridad de protección de datos en Perú.
            </p>
          </section>

          {/* Cumplimiento de Normativas */}
          <section
            id='cumplimiento-de-normativas'
            className='rounded-xl border-l-4 border-indigo-500 bg-white p-8 text-left shadow-sm'
          >
            <h2 className='mb-4 flex items-center text-2xl font-semibold text-gray-800'>
              <Shield className='mr-2 h-6 w-6 text-indigo-500' />
              Cumplimiento de Normativas
            </h2>
            <p className='mb-4 text-gray-700'>
              Esta política de privacidad está diseñada para cumplir con las normativas aplicables en materia de protección de datos, incluyendo:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Ley de Protección de Datos Personales del Perú (Ley N° 29733)</li>
              <li>Reglamento General de Protección de Datos de la UE (RGPD), cuando corresponda</li>
              <li>Ley de Privacidad del Consumidor de California (CCPA), cuando corresponda</li>
            </ul>
            <p className='mb-4 text-gray-700'>
              <strong>Base legal para el procesamiento:</strong> Procesamos sus datos personales bajo las siguientes bases legales:
            </p>
            <ul className='mb-4 list-inside list-disc space-y-2 pl-4 text-gray-700'>
              <li>Su consentimiento</li>
              <li>La necesidad de ejecutar un contrato con usted</li>
              <li>Nuestros intereses legítimos, siempre que no prevalezcan sobre sus derechos y libertades</li>
              <li>El cumplimiento de obligaciones legales</li>
            </ul>
            <p className='text-gray-700'>
              <strong>Transferencias internacionales de datos:</strong> Sus datos pueden ser transferidos y procesados en países fuera de Perú donde operan nuestros proveedores de servicios. En tales casos, aseguramos que existan medidas de protección adecuadas mediante cláusulas contractuales aprobadas u otros mecanismos legales reconocidos.
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