import { Metadata } from 'next'
import {
  LegalDocument,
  LegalHeading,
} from '@/components/legal/legal-document'

export const metadata: Metadata = {
  title: 'Política de Privacidad | Pastoral Mariana',
  description:
    'Descubra cómo Pastoral Mariana recopila, utiliza y protege sus datos personales. Última actualización: 18 de febrero de 2026.',
}

const sections = [
  { id: 'recopilacion-de-datos', title: 'Recopilación de datos' },
  { id: 'cookies-y-tecnologias', title: 'Cookies y tecnologías' },
  { id: 'servicios-de-terceros', title: 'Servicios de terceros' },
  { id: 'uso-de-la-informacion', title: 'Uso de la información' },
  { id: 'derechos-del-usuario', title: 'Derechos del usuario' },
  { id: 'menores-de-edad', title: 'Menores de edad' },
  { id: 'seguridad', title: 'Seguridad' },
  { id: 'cambios-en-la-politica', title: 'Cambios en la política' },
  { id: 'contacto', title: 'Contacto' },
  { id: 'cumplimiento-de-normativas', title: 'Cumplimiento de normativas' },
]

export default function PrivacyPolicyPage() {
  return (
    <LegalDocument
      title='Política de privacidad'
      updated='18 de febrero de 2026'
      intro={
        <p>
          En <strong>Pastoral Mariana</strong> respetamos y protegemos su
          privacidad. Esta política describe cómo recolectamos, utilizamos y
          protegemos sus datos personales.
        </p>
      }
      sections={sections}
      related={{ href: '/terms', label: 'los Términos y condiciones' }}
    >
      <section id='recopilacion-de-datos'>
        <LegalHeading index={1}>Recopilación de datos</LegalHeading>
        <p>
          Recopilamos información para proporcionar mejores servicios a todos
          nuestros usuarios. A continuación, detallamos los datos que podemos
          recopilar:
        </p>
        <ul>
          <li>
            <strong>Información que usted nos proporciona:</strong> al
            registrarse, proporcionará información básica de perfil (nombres,
            apellidos, fecha de nacimiento, correo electrónico).
          </li>
          <li>
            <strong>
              Información que recopilamos cuando utiliza nuestros servicios:
            </strong>
            <ul>
              <li>
                Información del dispositivo (modelo de hardware, versión del
                sistema operativo)
              </li>
              <li>Registros de uso y actividad dentro de la aplicación</li>
              <li>
                Información de ubicación (si ha otorgado los permisos
                correspondientes)
              </li>
              <li>Dirección IP y otros identificadores únicos</li>
            </ul>
          </li>
        </ul>
        <p>
          La autenticación y gestión de credenciales se realiza a través de
          Clerk, quien procesa y almacena datos de autenticación conforme a sus
          políticas de privacidad y estándares de seguridad.
        </p>
      </section>

      <section id='cookies-y-tecnologias'>
        <LegalHeading index={2}>Cookies y tecnologías</LegalHeading>
        <p>
          Nuestra aplicación utiliza cookies y tecnologías similares para
          mejorar la experiencia del usuario:
        </p>
        <ul>
          <li>
            <strong>Cookies esenciales:</strong> necesarias para el
            funcionamiento básico de la aplicación y no pueden ser
            desactivadas.
          </li>
          <li>
            <strong>Cookies funcionales:</strong> para recordar sus
            preferencias y personalizar su experiencia.
          </li>
          <li>
            <strong>Cookies analíticas:</strong> para entender cómo se utiliza
            nuestra aplicación y mejorar nuestros servicios.
          </li>
        </ul>
        <p>
          Puede configurar su navegador para rechazar todas o algunas cookies,
          o para alertarle cuando los sitios web configuran o acceden a las
          cookies. Sin embargo, si desactiva o rechaza cookies, algunas partes
          de nuestra aplicación podrían no funcionar correctamente.
        </p>
      </section>

      <section id='servicios-de-terceros'>
        <LegalHeading index={3}>Servicios de terceros</LegalHeading>
        <p>
          Utilizamos los siguientes servicios de terceros para garantizar la
          seguridad y funcionalidad de nuestra aplicación:
        </p>
        <ul>
          <li>
            <strong>Clerk.</strong> Gestiona la autenticación y los datos
            relacionados con el acceso de los usuarios. Clerk procesa datos
            personales como correos electrónicos y contraseñas.{' '}
            <a
              href='https://clerk.com/privacy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Política de privacidad de Clerk
            </a>
          </li>
          <li>
            <strong>Neon.tech.</strong> Almacena información de los usuarios y
            datos de la aplicación, como perfiles e información relacionada con
            las actividades pastorales.{' '}
            <a
              href='https://neon.tech/privacy-policy'
              target='_blank'
              rel='noopener noreferrer'
            >
              Política de privacidad de Neon
            </a>
          </li>
        </ul>
        <p>
          Cuando utilizamos proveedores de servicios externos, estos solo
          procesan su información en nuestro nombre y de conformidad con
          nuestras instrucciones y esta política de privacidad.
        </p>
      </section>

      <section id='uso-de-la-informacion'>
        <LegalHeading index={4}>Uso de la información</LegalHeading>
        <p>La información recopilada se utiliza exclusivamente para:</p>
        <ul>
          <li>
            Proporcionar, mantener y mejorar los servicios de Pastoral Mariana
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
          <li>
            Detectar, investigar y prevenir actividades fraudulentas y abusos
          </li>
          <li>Cumplir con obligaciones legales aplicables</li>
        </ul>
        <p>
          <strong>
            No vendemos ni alquilamos sus datos personales a terceros con fines
            comerciales o publicitarios.
          </strong>{' '}
          La información compartida con terceros se limita a lo necesario para
          proporcionar nuestros servicios y siempre bajo estrictas garantías de
          confidencialidad.
        </p>
      </section>

      <section id='derechos-del-usuario'>
        <LegalHeading index={5}>Derechos del usuario</LegalHeading>
        <p>
          Como usuario de Pastoral Mariana, usted tiene los siguientes derechos
          sobre sus datos personales:
        </p>
        <ul>
          <li>
            <strong>Acceso:</strong> derecho a solicitar copias de sus datos
            personales
          </li>
          <li>
            <strong>Rectificación:</strong> derecho a solicitar la corrección de
            información inexacta
          </li>
          <li>
            <strong>Supresión:</strong> derecho a solicitar la eliminación de
            sus datos (derecho al olvido)
          </li>
          <li>
            <strong>Limitación:</strong> derecho a solicitar la restricción del
            procesamiento de sus datos
          </li>
          <li>
            <strong>Portabilidad:</strong> derecho a solicitar la transferencia
            de sus datos a otra organización
          </li>
          <li>
            <strong>Oposición:</strong> derecho a oponerse al procesamiento de
            sus datos
          </li>
          <li>
            <strong>Revocación del consentimiento:</strong> derecho a retirar
            su consentimiento en cualquier momento
          </li>
        </ul>
        <p>
          Para ejercer cualquiera de estos derechos, contáctenos a través del
          correo electrónico{' '}
          <a href='mailto:pastoral@ps.edu.pe'>pastoral@ps.edu.pe</a>.
          Responderemos a su solicitud dentro del plazo establecido por la ley
          aplicable, normalmente en un plazo máximo de 30 días.
        </p>
      </section>

      <section id='menores-de-edad'>
        <LegalHeading index={6}>Menores de edad</LegalHeading>
        <p>
          Pastoral Mariana no está destinada a menores de 13 años. No
          recopilamos intencionalmente información personal de niños menores de
          13 años. Si detectamos que hemos recopilado datos personales de un
          niño menor de 13 años sin la verificación del consentimiento parental,
          tomaremos medidas para eliminar esa información lo antes posible.
        </p>
        <p>
          Para usuarios entre 13 y 18 años, requerimos el consentimiento
          verificable de un padre o tutor legal para el uso de nuestra
          aplicación. Si es padre o tutor y cree que su hijo nos ha
          proporcionado información personal sin su consentimiento, contáctenos
          inmediatamente a{' '}
          <a href='mailto:pastoral@ps.edu.pe'>pastoral@ps.edu.pe</a>.
        </p>
      </section>

      <section id='seguridad'>
        <LegalHeading index={7}>Seguridad</LegalHeading>
        <p>
          La seguridad de sus datos es nuestra prioridad. Implementamos medidas
          técnicas y organizativas para proteger su información:
        </p>
        <ul>
          <li>
            Encriptación de datos en tránsito mediante protocolos SSL/TLS
          </li>
          <li>Encriptación de datos en reposo en nuestras bases de datos</li>
          <li>Sistemas de autenticación robustos a través de Clerk</li>
          <li>Auditorías regulares de seguridad y pruebas de penetración</li>
          <li>
            Acceso restringido a información personal basado en principios de
            necesidad de conocimiento
          </li>
          <li>Protocolos de respuesta ante incidentes de seguridad</li>
          <li>
            Formación regular del personal sobre prácticas de seguridad de datos
          </li>
        </ul>
        <p>
          Aunque implementamos salvaguardias diseñadas para proteger su
          información, ningún sistema de seguridad es impenetrable. No podemos
          garantizar que la información no será vista, divulgada, alterada o
          destruida por incumplimiento de cualquiera de nuestras salvaguardias
          físicas, técnicas o administrativas.
        </p>
      </section>

      <section id='cambios-en-la-politica'>
        <LegalHeading index={8}>Cambios en la política</LegalHeading>
        <p>
          Nos reservamos el derecho de actualizar esta política de privacidad
          periódicamente. Los cambios entrarán en vigor inmediatamente después
          de su publicación en la aplicación.
        </p>
        <p>Cuando realicemos cambios significativos en esta política:</p>
        <ul>
          <li>
            Mostraremos una notificación prominente dentro de la aplicación
          </li>
          <li>
            Actualizaremos la fecha de «última actualización» en la parte
            superior de esta política
          </li>
          <li>
            Podemos enviar un correo electrónico con los detalles de los cambios
            importantes
          </li>
          <li>
            Podemos solicitar que acepte activamente los nuevos términos antes
            de seguir utilizando nuestros servicios
          </li>
        </ul>
        <p>
          El uso continuado de nuestra aplicación después de la publicación de
          cambios constituye su aceptación de dichos cambios. Le recomendamos
          revisar esta política periódicamente para estar informado sobre cómo
          protegemos su información.
        </p>
      </section>

      <section id='contacto'>
        <LegalHeading index={9}>Contacto</LegalHeading>
        <p>
          Si tiene alguna pregunta sobre esta política de privacidad o sobre el
          tratamiento de sus datos personales, puede contactar a nuestro
          Responsable de Protección de Datos a través de:
        </p>
        <ul>
          <li>
            <strong>Correo electrónico:</strong>{' '}
            <a href='mailto:pastoral@ps.edu.pe'>pastoral@ps.edu.pe</a>
          </li>
          <li>
            <strong>Dirección postal:</strong> Jr. Haendel 118, Urbanización
            Primavera, Trujillo 13001, Perú
          </li>
          <li>
            <strong>Teléfono:</strong>{' '}
            <a href='tel:+51941952314'>+51 941 952 314</a>
          </li>
        </ul>
        <p>
          Pastoral Mariana se compromete a resolver cualquier consulta o
          preocupación que pueda tener sobre el uso de su información personal.
          Si considera que no hemos abordado satisfactoriamente su preocupación,
          tiene derecho a presentar una reclamación ante la autoridad de
          protección de datos en Perú.
        </p>
      </section>

      <section id='cumplimiento-de-normativas'>
        <LegalHeading index={10}>Cumplimiento de normativas</LegalHeading>
        <p>
          Esta política de privacidad está diseñada para cumplir con las
          normativas aplicables en materia de protección de datos, incluyendo:
        </p>
        <ul>
          <li>
            Ley de Protección de Datos Personales del Perú (Ley N° 29733)
          </li>
          <li>
            Reglamento General de Protección de Datos de la UE (RGPD), cuando
            corresponda
          </li>
          <li>
            Ley de Privacidad del Consumidor de California (CCPA), cuando
            corresponda
          </li>
        </ul>
        <p>
          <strong>Base legal para el procesamiento:</strong> procesamos sus
          datos personales bajo las siguientes bases legales:
        </p>
        <ul>
          <li>Su consentimiento</li>
          <li>La necesidad de ejecutar un contrato con usted</li>
          <li>
            Nuestros intereses legítimos, siempre que no prevalezcan sobre sus
            derechos y libertades
          </li>
          <li>El cumplimiento de obligaciones legales</li>
        </ul>
        <p>
          <strong>Transferencias internacionales de datos:</strong> sus datos
          pueden ser transferidos y procesados en países fuera de Perú donde
          operan nuestros proveedores de servicios. En tales casos, aseguramos
          que existan medidas de protección adecuadas mediante cláusulas
          contractuales aprobadas u otros mecanismos legales reconocidos.
        </p>
      </section>
    </LegalDocument>
  )
}
