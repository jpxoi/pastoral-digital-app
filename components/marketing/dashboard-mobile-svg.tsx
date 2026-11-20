const metrics = [
  { label: 'Asistencias', value: '18', fill: '#ecfdf5', color: '#047857' },
  { label: 'Tardanzas', value: '2', fill: '#fffbeb', color: '#a16207' },
  { label: 'Faltas', value: '1', fill: '#fef2f2', color: '#b91c1c' },
  {
    label: 'Tasa de asistencia',
    value: '95%',
    fill: '#f2f5fc',
    color: '#07309b',
  },
]

const sections = [
  {
    title: 'Mis asistencias',
    column: 'Evento',
    rows: [
      {
        label: 'Encuentro de catequesis',
        date: '15 nov, 9:02 a. m.',
        status: 'A tiempo',
        fill: '#ecfdf5',
        color: '#047857',
      },
      {
        label: 'Reunión de coordinación',
        date: '8 nov, 9:18 a. m.',
        status: 'Tardanza',
        fill: '#fffbeb',
        color: '#a16207',
      },
    ],
  },
  {
    title: 'Mis misas',
    column: 'Parroquia',
    rows: [
      {
        label: 'Parroquia San José',
        date: '15 nov 2026',
        status: 'Pendiente',
        fill: '#fff7ed',
        color: '#c2410c',
      },
      {
        label: 'Perpetuo Socorro',
        date: '8 nov 2026',
        status: 'Aceptado',
        fill: '#ecfdf5',
        color: '#047857',
      },
    ],
  },
]

export function DashboardMobileSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 390 780'
      className={className}
      role='img'
      aria-label='Vista móvil simplificada del inicio con indicadores de asistencia, mis asistencias y mis misas'
      fontFamily='inherit'
    >
      <rect
        x='.75'
        y='.75'
        width='388.5'
        height='778.5'
        rx='22'
        fill='#fff'
        stroke='#e4e7ec'
        strokeWidth='1.5'
      />
      <g stroke='#667085' strokeWidth='2' strokeLinecap='round'>
        <path d='M24 29H42M24 35H42M24 41H42' />
      </g>
      <rect x='260' y='20' width='106' height='30' rx='7' fill='#07309b' />
      <text
        x='313'
        y='39'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='500'
      >
        Mi Pastoral ID
      </text>
      <text x='24' y='89' fill='#101828' fontSize='22' fontWeight='600'>
        Buenos días, Ana
      </text>

      <rect
        x='24'
        y='111'
        width='342'
        height='116'
        rx='10'
        fill='#f2f5fc'
        stroke='#d4ddef'
      />
      <text x='40' y='135' fill='#101828' fontSize='12' fontWeight='600'>
        ¿Ya participaste en la misa de hoy?
      </text>
      <text x='40' y='156' fill='#667085' fontSize='10'>
        Registra tu asistencia dominical.
      </text>
      <rect
        x='40'
        y='177'
        width='310'
        height='32'
        rx='6'
        fill='#fff'
        stroke='#d4ddef'
      />
      <text
        x='195'
        y='197'
        textAnchor='middle'
        fill='#07309b'
        fontSize='10'
        fontWeight='500'
      >
        Registrar misa
      </text>

      {metrics.map(({ label, value, fill, color }, index) => (
        <g
          key={label}
          transform={`translate(${24 + (index % 2) * 178} ${247 + Math.floor(index / 2) * 84})`}
        >
          <rect width='164' height='72' rx='10' fill={fill} />
          <text x='14' y='23' fill={color} fontSize='10'>
            {label}
          </text>
          <text x='14' y='56' fill={color} fontSize='26' fontWeight='600'>
            {value}
          </text>
        </g>
      ))}

      {sections.map(({ title, column, rows }, sectionIndex) => (
        <g key={title} transform={`translate(24 ${432 + sectionIndex * 168})`}>
          <text y='13' fill='#101828' fontSize='14' fontWeight='600'>
            {title}
          </text>
          <rect
            y='28'
            width='342'
            height='118'
            rx='9'
            fill='#fff'
            stroke='#e4e7ec'
          />
          <text x='12' y='46' fill='#667085' fontSize='8.5'>
            {column}
          </text>
          <text x='330' y='46' textAnchor='end' fill='#667085' fontSize='8.5'>
            Estado
          </text>
          <path d='M0 54H342M0 100H342' stroke='#eef0f3' />
          {rows.map(({ label, date, status, fill, color }, index) => (
            <g key={date} transform={`translate(12 ${71 + index * 46})`}>
              <text y='3' fill='#344054' fontSize='10' fontWeight='500'>
                {label}
              </text>
              <text y='18' fill='#667085' fontSize='8'>
                {date}
              </text>
              <rect x='243' y='-6' width='75' height='24' rx='6' fill={fill} />
              <text
                x='280.5'
                y='9'
                textAnchor='middle'
                fill={color}
                fontSize='8.5'
                fontWeight='500'
              >
                {status}
              </text>
            </g>
          ))}
        </g>
      ))}
    </svg>
  )
}
