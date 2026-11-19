export function DashboardSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 760 448'
      className={className}
      role='img'
      aria-label='Miniatura del inicio: resumen de asistencias y tabla de registros'
    >
      <rect width='760' height='448' rx='20' fill='#f3f4f6' />
      <rect width='56' height='448' rx='20' fill='#07309b' />
      <rect x='20' width='36' height='448' fill='#07309b' />
      <rect x='18' y='18' width='20' height='16' rx='3' fill='#fff' />
      <circle cx='28' cy='62' r='7' fill='#93c5fd' />
      <circle cx='28' cy='90' r='7' fill='#bfdbfe' />
      <circle cx='28' cy='118' r='7' fill='#bfdbfe' />
      <circle cx='28' cy='420' r='8' fill='#dbeafe' />

      <path
        d='M56 16 H744 A16 16 0 0 1 760 32 V448 H72 A16 16 0 0 1 56 432 Z'
        fill='#fff'
      />

      <text
        x='80'
        y='52'
        fill='#0f172a'
        fontSize='18'
        fontWeight='600'
        fontFamily='inherit'
      >
        Inicio
      </text>
      <rect x='528' y='34' width='96' height='26' rx='6' fill='#eff6ff' />
      <text
        x='576'
        y='51'
        textAnchor='middle'
        fill='#07309b'
        fontSize='9'
        fontWeight='600'
        fontFamily='inherit'
      >
        Misa dominical
      </text>
      <rect x='632' y='34' width='108' height='26' rx='6' fill='#07309b' />
      <text
        x='686'
        y='51'
        textAnchor='middle'
        fill='#fff'
        fontSize='9'
        fontWeight='600'
        fontFamily='inherit'
      >
        Mi Pastoral ID
      </text>

      <rect
        x='80'
        y='78'
        width='204'
        height='72'
        rx='10'
        fill='#f0fdf4'
        stroke='#15803d'
        strokeWidth='1'
      />
      <text x='96' y='100' fill='#166534' fontSize='10' fontFamily='inherit'>
        Asistencias registradas
      </text>
      <text
        x='96'
        y='132'
        fill='#14532d'
        fontSize='24'
        fontWeight='700'
        fontFamily='inherit'
      >
        18
      </text>

      <rect
        x='296'
        y='78'
        width='204'
        height='72'
        rx='10'
        fill='#fffbeb'
        stroke='#a16207'
        strokeWidth='1'
      />
      <text x='312' y='100' fill='#854d0e' fontSize='10' fontFamily='inherit'>
        Tardanzas registradas
      </text>
      <text
        x='312'
        y='132'
        fill='#713f12'
        fontSize='24'
        fontWeight='700'
        fontFamily='inherit'
      >
        2
      </text>

      <rect
        x='512'
        y='78'
        width='204'
        height='72'
        rx='10'
        fill='#fef2f2'
        stroke='#b91c1c'
        strokeWidth='1'
      />
      <text x='528' y='100' fill='#991b1b' fontSize='10' fontFamily='inherit'>
        Faltas registradas
      </text>
      <text
        x='528'
        y='132'
        fill='#7f1d1d'
        fontSize='24'
        fontWeight='700'
        fontFamily='inherit'
      >
        1
      </text>

      <rect
        x='80'
        y='166'
        width='328'
        height='250'
        rx='12'
        fill='#fff'
        stroke='#e5e7eb'
      />
      <text
        x='96'
        y='190'
        fill='#0f172a'
        fontSize='12'
        fontWeight='600'
        fontFamily='inherit'
      >
        Registro de asistencias
      </text>
      <text x='96' y='214' fill='#94a3b8' fontSize='9' fontFamily='inherit'>
        Evento
      </text>
      <text
        x='384'
        y='214'
        textAnchor='end'
        fill='#94a3b8'
        fontSize='9'
        fontFamily='inherit'
      >
        Estado
      </text>
      <line x1='96' y1='222' x2='388' y2='222' stroke='#e5e7eb' />

      <text
        x='96'
        y='246'
        fill='#0f172a'
        fontSize='11'
        fontWeight='600'
        fontFamily='inherit'
      >
        Encuentro de catequesis
      </text>
      <text x='96' y='262' fill='#64748b' fontSize='8' fontFamily='inherit'>
        16 nov 2026, 9:02 a. m.
      </text>
      <rect x='318' y='236' width='70' height='20' rx='5' fill='#f0fdf4' />
      <text
        x='353'
        y='249'
        textAnchor='middle'
        fill='#15803d'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        A TIEMPO
      </text>

      <text
        x='96'
        y='292'
        fill='#0f172a'
        fontSize='11'
        fontWeight='600'
        fontFamily='inherit'
      >
        Reunión de coordinación
      </text>
      <text x='96' y='308' fill='#64748b' fontSize='8' fontFamily='inherit'>
        9 nov 2026, 9:18 a. m.
      </text>
      <rect x='318' y='282' width='70' height='20' rx='5' fill='#fff7ed' />
      <text
        x='353'
        y='295'
        textAnchor='middle'
        fill='#c2410c'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        TARDANZA
      </text>

      <text
        x='96'
        y='338'
        fill='#0f172a'
        fontSize='11'
        fontWeight='600'
        fontFamily='inherit'
      >
        Vigilias de Adviento
      </text>
      <text x='96' y='354' fill='#64748b' fontSize='8' fontFamily='inherit'>
        2 nov 2026, 8:58 a. m.
      </text>
      <rect x='318' y='328' width='70' height='20' rx='5' fill='#f0fdf4' />
      <text
        x='353'
        y='341'
        textAnchor='middle'
        fill='#15803d'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        A TIEMPO
      </text>

      <rect
        x='424'
        y='166'
        width='292'
        height='250'
        rx='12'
        fill='#fff'
        stroke='#e5e7eb'
      />
      <text
        x='440'
        y='190'
        fill='#0f172a'
        fontSize='12'
        fontWeight='600'
        fontFamily='inherit'
      >
        Misas dominicales
      </text>
      <text x='440' y='214' fill='#94a3b8' fontSize='9' fontFamily='inherit'>
        Fecha
      </text>
      <text
        x='692'
        y='214'
        textAnchor='end'
        fill='#94a3b8'
        fontSize='9'
        fontFamily='inherit'
      >
        Estado
      </text>
      <line x1='440' y1='222' x2='700' y2='222' stroke='#e5e7eb' />
      <text x='440' y='250' fill='#0f172a' fontSize='11' fontFamily='inherit'>
        Domingo 16 de noviembre
      </text>
      <rect x='628' y='236' width='72' height='20' rx='5' fill='#eff6ff' />
      <text
        x='664'
        y='249'
        textAnchor='middle'
        fill='#1d4ed8'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        ASISTIÓ
      </text>
      <text x='440' y='292' fill='#0f172a' fontSize='11' fontFamily='inherit'>
        Domingo 9 de noviembre
      </text>
      <rect x='628' y='278' width='72' height='20' rx='5' fill='#eff6ff' />
      <text
        x='664'
        y='291'
        textAnchor='middle'
        fill='#1d4ed8'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        ASISTIÓ
      </text>
      <text x='440' y='334' fill='#0f172a' fontSize='11' fontFamily='inherit'>
        Domingo 2 de noviembre
      </text>
      <rect x='628' y='320' width='72' height='20' rx='5' fill='#fef2f2' />
      <text
        x='664'
        y='333'
        textAnchor='middle'
        fill='#b91c1c'
        fontSize='8'
        fontWeight='600'
        fontFamily='inherit'
      >
        FALTA
      </text>
    </svg>
  )
}
