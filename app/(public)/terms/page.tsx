import Link from 'next/link'
import { Metadata } from 'next'
import {
  LegalDocument,
  LegalHeading,
} from '@/components/legal/legal-document'

export const metadata: Metadata = {
  title: 'Términos y Condiciones | Pastoral Mariana',
  description:
    'Términos y condiciones de uso de la plataforma Pastoral Digital App. Última actualización: 18 de febrero de 2026.',
}

const sections = [
  { id: 'aceptacion-de-terminos', title: 'Aceptación de términos' },
  { id: 'registro-y-cuentas', title: 'Registro y cuentas' },
  { id: 'propiedad-intelectual', title: 'Propiedad intelectual' },
  { id: 'uso-aceptable', title: 'Uso aceptable' },
  { id: 'contenido-del-usuario', title: 'Contenido del usuario' },
  { id: 'limitacion-de-responsabilidad', title: 'Limitación de responsabilidad' },
  { id: 'enlaces-a-terceros', title: 'Enlaces a terceros' },
  { id: 'terminacion-de-acceso', title: 'Terminación de acceso' },
  { id: 'modificaciones', title: 'Modificaciones' },
  { id: 'legislacion-aplicable', title: 'Legislación aplicable' },
]

export default function TermsAndConditionsPage() {
  return (
    <LegalDocument
      title='Términos y condiciones de uso'
      updated='18 de febrero de 2026'
      intro={
        <p>
          Estos términos establecen las reglas para el uso de{' '}
          <strong>Pastoral Digital App</strong>. Al acceder y utilizar esta
          plataforma, aceptas cumplirlos y quedar sujeto a ellos.
        </p>
      }
      sections={sections}
      related={{ href: '/privacy', label: 'la Política de privacidad' }}
    >
      <section id='aceptacion-de-terminos'>
        <LegalHeading index={1}>Aceptación de términos</LegalHeading>
        <p>
          Al acceder o utilizar la aplicación Pastoral Digital App
          (&quot;la Aplicación&quot;), usted reconoce que ha leído, entendido y
          acepta estar sujeto a estos Términos y Condiciones, junto con nuestra{' '}
          <Link href='/privacy'>Política de Privacidad</Link>.
        </p>
        <p>
          Si no está de acuerdo con alguna parte de estos términos, no podrá
          acceder ni utilizar nuestros servicios. El uso continuado de la
          Aplicación constituye la aceptación continua de estos términos.
        </p>
        <p>
          Estos términos se aplican a todos los usuarios, incluidos sin
          limitación, usuarios que son navegadores, agentes pastorales,
          coordinadores, administradores, y/o contribuyentes de contenido.
        </p>
      </section>

      <section id='registro-y-cuentas'>
        <LegalHeading index={2}>Registro y cuentas</LegalHeading>
        <p>Al registrarse en Pastoral Digital App, usted se compromete a:</p>
        <ul>
          <li>
            Proporcionar información verdadera, precisa, actual y completa sobre
            usted
          </li>
          <li>
            Mantener y actualizar prontamente sus datos para mantener la
            información verdadera, precisa, actual y completa
          </li>
          <li>
            Mantener la seguridad de su contraseña y ser responsable de todas
            las actividades realizadas con su cuenta
          </li>
          <li>
            Notificar inmediatamente cualquier uso no autorizado de su cuenta o
            cualquier otra violación de seguridad
          </li>
        </ul>
        <p>
          Nos reservamos el derecho de suspender o terminar su cuenta si
          determinamos que ha proporcionado información falsa o que viola estos
          términos.
        </p>
      </section>

      <section id='propiedad-intelectual'>
        <LegalHeading index={3}>Propiedad intelectual</LegalHeading>
        <p>
          El contenido de la Aplicación, incluyendo pero no limitado a textos,
          gráficos, logotipos, iconos, imágenes, clips de audio, descargas
          digitales, compilaciones de datos y software, es propiedad de Pastoral
          Mariana o de sus proveedores de contenido y está protegido por las
          leyes de propiedad intelectual.
        </p>
        <p>
          No está permitido utilizar, reproducir, modificar, distribuir o
          mostrar ninguna parte del contenido sin nuestro permiso previo por
          escrito, excepto según lo permitido para el uso personal y no
          comercial relacionado con actividades pastorales.
        </p>
        <p>
          Todas las marcas comerciales, marcas de servicio, nombres comerciales
          y logotipos utilizados en la Aplicación son propiedad de Pastoral
          Mariana o de sus respectivos propietarios.
        </p>
      </section>

      <section id='uso-aceptable'>
        <LegalHeading index={4}>Uso aceptable</LegalHeading>
        <p>Al utilizar nuestra Aplicación, usted se compromete a no:</p>
        <ul>
          <li>Violar cualquier ley, reglamento o normativa aplicable</li>
          <li>
            Infringir los derechos de propiedad intelectual u otros derechos de
            terceros
          </li>
          <li>
            Publicar o transmitir material obsceno, amenazante, difamatorio o
            ilegal
          </li>
          <li>Utilizar la Aplicación para fines fraudulentos o engañosos</li>
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
        <p>
          Nos reservamos el derecho de suspender o terminar el acceso a la
          Aplicación a cualquier usuario que incumpla estas restricciones.
        </p>
      </section>

      <section id='contenido-del-usuario'>
        <LegalHeading index={5}>Contenido del usuario</LegalHeading>
        <p>
          Al compartir, publicar o cargar contenido en nuestra Aplicación,
          usted:
        </p>
        <ul>
          <li>Garantiza que tiene derecho a compartir dicho contenido</li>
          <li>
            Otorga a Pastoral Mariana una licencia no exclusiva, mundial, libre
            de regalías, sublicenciable y transferible para usar, reproducir,
            distribuir y mostrar dicho contenido en relación con el
            funcionamiento de la Aplicación
          </li>
          <li>
            Comprende que es responsable de cualquier contenido que publique
          </li>
          <li>
            Acepta que podemos eliminar cualquier contenido que consideremos
            inapropiado o que viole estos términos
          </li>
        </ul>
        <p>
          Nos reservamos el derecho, pero no la obligación, de supervisar y
          moderar cualquier contenido publicado en la Aplicación.
        </p>
      </section>

      <section id='limitacion-de-responsabilidad'>
        <LegalHeading index={6}>Limitación de responsabilidad</LegalHeading>
        <p>
          En la medida permitida por la ley aplicable, Pastoral Mariana y sus
          colaboradores:
        </p>
        <ul>
          <li>
            No serán responsables por daños indirectos, incidentales,
            especiales, consecuentes o punitivos
          </li>
          <li>
            No garantizan que la Aplicación estará disponible de forma
            ininterrumpida, oportuna, segura o libre de errores
          </li>
          <li>
            No garantizan que los resultados obtenidos del uso de la Aplicación
            serán precisos o confiables
          </li>
          <li>
            Proveen la Aplicación &quot;tal cual&quot; y &quot;según
            disponibilidad&quot; sin garantías de ningún tipo
          </li>
        </ul>
        <p>
          El usuario acepta que utiliza la Aplicación bajo su propio riesgo y
          que asume la responsabilidad por su uso.
        </p>
      </section>

      <section id='enlaces-a-terceros'>
        <LegalHeading index={7}>Enlaces a terceros</LegalHeading>
        <p>
          Nuestra Aplicación puede contener enlaces a sitios web o servicios de
          terceros que no son propiedad ni están controlados por Pastoral
          Mariana.
        </p>
        <p>
          No tenemos control sobre el contenido, políticas de privacidad o
          prácticas de sitios o servicios de terceros y no asumimos ninguna
          responsabilidad por ellos. Recomendamos encarecidamente que revise los
          términos y políticas de cualquier sitio de terceros que visite.
        </p>
        <p>
          La inclusión de cualquier enlace no implica aprobación, respaldo o
          recomendación por parte de Pastoral Mariana.
        </p>
      </section>

      <section id='terminacion-de-acceso'>
        <LegalHeading index={8}>Terminación de acceso</LegalHeading>
        <p>
          Podemos terminar o suspender su acceso a la Aplicación inmediatamente,
          sin previo aviso o responsabilidad, por cualquier motivo, incluido,
          sin limitación, si incumple estos Términos y Condiciones.
        </p>
        <p>
          Tras la terminación, su derecho a utilizar la Aplicación cesará
          inmediatamente. Si desea terminar su cuenta, puede simplemente
          discontinuar el uso de la Aplicación o solicitar la eliminación de su
          cuenta.
        </p>
        <p>
          Todas las disposiciones de los Términos que por su naturaleza deban
          sobrevivir a la terminación seguirán vigentes, incluyendo, sin
          limitación, las disposiciones de propiedad, renuncias de garantía y
          limitaciones de responsabilidad.
        </p>
      </section>

      <section id='modificaciones'>
        <LegalHeading index={9}>Modificaciones</LegalHeading>
        <p>
          Nos reservamos el derecho, a nuestra sola discreción, de modificar o
          reemplazar estos Términos en cualquier momento. Los cambios entrarán
          en vigor inmediatamente después de su publicación en la Aplicación.
        </p>
        <p>Si realizamos cambios materiales a estos Términos:</p>
        <ul>
          <li>Publicaremos una notificación visible en la Aplicación</li>
          <li>
            Actualizaremos la fecha de &quot;última actualización&quot; en estos
            Términos
          </li>
          <li>
            Podemos enviar una notificación a través de la Aplicación o por
            correo electrónico
          </li>
        </ul>
        <p>
          Su uso continuado de la Aplicación después de la publicación de
          cualquier modificación constituye la aceptación de esos cambios. Es su
          responsabilidad revisar periódicamente estos Términos.
        </p>
      </section>

      <section id='legislacion-aplicable'>
        <LegalHeading index={10}>Legislación aplicable</LegalHeading>
        <p>
          Estos Términos se regirán e interpretarán de acuerdo con las leyes de
          la República del Perú, sin tener en cuenta sus disposiciones sobre
          conflicto de leyes.
        </p>
        <p>
          Nuestra falta de ejercicio o aplicación de cualquier derecho o
          disposición de estos Términos no constituirá una renuncia a tal
          derecho o disposición. Si alguna disposición de estos Términos es
          considerada inválida o inaplicable por un tribunal, las disposiciones
          restantes de estos Términos permanecerán en vigor.
        </p>
        <p>
          Cualquier controversia que surja de estos Términos se resolverá
          mediante arbitraje en la ciudad de Trujillo, Perú, de conformidad con
          las reglas de la Cámara de Comercio de Lima.
        </p>
      </section>
    </LegalDocument>
  )
}
