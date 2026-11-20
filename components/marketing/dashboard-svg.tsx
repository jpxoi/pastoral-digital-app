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

export function DashboardSvg({ className }: { className?: string }) {
  return (
    <svg
      viewBox='0 0 760 448'
      className={className}
      role='img'
      aria-label='Vista simplificada del inicio con indicadores de asistencia y resumen de asistencias y misas'
      fontFamily='inherit'
    >
      <rect width='760' height='448' rx='20' fill='#07309b' />
      <path
        d='M56 0H740A20 20 0 0 1 760 20V428A20 20 0 0 1 740 448H56Z'
        fill='#fff'
      />
      <path
        d='M26 24H36Q38 24 38 26V36Q38 44 30 44H20Q18 44 18 42V32Q18 24 26 24Z'
        fill='#fff'
      />
      {[82, 120, 158].map((y) => (
        <circle key={y} cx='28' cy={y} r='7' fill='#bfdbfe' />
      ))}
      <circle cx='28' cy='418' r='9' fill='#dbeafe' />

      <text x='82' y='59' fill='#101828' fontSize='21' fontWeight='600'>
        Buenos días, Ana
      </text>
      <rect x='626' y='34' width='108' height='30' rx='7' fill='#07309b' />
      <text
        x='680'
        y='53'
        textAnchor='middle'
        fill='#fff'
        fontSize='10'
        fontWeight='500'
      >
        Mi Pastoral ID
      </text>

      <rect
        x='82'
        y='85'
        width='652'
        height='54'
        rx='9'
        fill='#f2f5fc'
        stroke='#d4ddef'
      />
      <text x='98' y='107' fill='#101828' fontSize='11' fontWeight='600'>
        ¿Ya participaste en la misa de hoy?
      </text>
      <text x='98' y='124' fill='#667085' fontSize='9'>
        Registra tu asistencia dominical.
      </text>
      <rect
        x='616'
        y='98'
        width='102'
        height='28'
        rx='6'
        fill='#fff'
        stroke='#d4ddef'
      />
      <text
        x='667'
        y='116'
        textAnchor='middle'
        fill='#07309b'
        fontSize='9'
        fontWeight='500'
      >
        Registrar misa
      </text>

      {metrics.map(({ label, value, fill, color }, index) => (
        <g key={label} transform={`translate(${82 + index * 166} 155)`}>
          <rect width='154' height='70' rx='10' fill={fill} />
          <text x='14' y='23' fill={color} fontSize='10'>
            {label}
          </text>
          <text x='14' y='55' fill={color} fontSize='25' fontWeight='600'>
            {value}
          </text>
        </g>
      ))}

      {[
        {
          title: 'Mis asistencias',
          x: 82,
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
          x: 420,
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
      ].map(({ title, x, rows }) => (
        <g key={title} transform={`translate(${x} 251)`}>
          <text y='13' fill='#101828' fontSize='13' fontWeight='600'>
            {title}
          </text>
          <rect
            y='32'
            width='314'
            height='142'
            rx='10'
            fill='#fff'
            stroke='#e4e7ec'
          />
          <text x='12' y='50' fill='#667085' fontSize='8'>
            {title === 'Mis misas' ? 'Parroquia' : 'Evento'}
          </text>
          <text x='302' y='50' textAnchor='end' fill='#667085' fontSize='8'>
            Estado
          </text>
          <path d='M0 59H314M0 115H314' stroke='#eef0f3' />
          {rows.map(({ label, date, status, fill, color }, index) => (
            <g key={date} transform={`translate(12 ${79 + index * 56})`}>
              <text y='3' fill='#344054' fontSize='10' fontWeight='500'>
                {label}
              </text>
              <text y='19' fill='#667085' fontSize='8'>
                {date}
              </text>
              <rect x='215' y='-7' width='75' height='24' rx='6' fill={fill} />
              <text
                x='252.5'
                y='8'
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
