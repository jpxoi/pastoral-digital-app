export function FooterNarrow() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className='mt-4 w-full max-w-full text-balance px-4 text-sm text-gray-300 sm:max-w-sm'>
        <a
          property='dct:title'
          className='font-medium text-white transition-colors duration-300 hover:text-gray-200'
          rel='cc:attributionURL'
          href='https://pastoralid.jpxoi.com'
        >
          Pastoral Digital App
        </a>{' '}
        &copy; 2025 por{' '}
        <a
          rel='cc:attributionURL dct:creator'
          className='font-medium text-white transition-colors duration-300 hover:text-gray-200'
          property='cc:attributionName'
          href='https://jpxoi.com'
        >
          Jean Paul Fernandez
        </a>{' '}
        está licenciado bajo{' '}
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'
          className='font-medium text-white transition-colors duration-300 hover:text-gray-200'
          target='_blank'
          rel='license noopener noreferrer'
        >
          CC BY-NC-SA 4.0
        </a>
        .
      </p>
      <div className="mt-3 flex space-x-4">
        <a 
          href="/privacy"
          className="text-sm font-medium text-white transition-colors duration-300 hover:text-gray-200"
        >
          Política de Privacidad
        </a>
        <a 
          href="/terms"
          className="text-sm font-medium text-white transition-colors duration-300 hover:text-gray-200"
        >
          Términos y Condiciones
        </a>
      </div>
    </div>
  )
}

export function FooterWide() {
  return (
    <div className={`flex flex-col items-center justify-center`}>
      <p className='mt-4 w-full max-w-full text-balance px-4 text-sm text-gray-600'>
        <a
          property='dct:title'
          className='font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
          rel='cc:attributionURL'
          href='https://pastoralid.jpxoi.com'
        >
          Pastoral Digital App
        </a>{' '}
        &copy; 2025 por{' '}
        <a
          rel='cc:attributionURL dct:creator'
          className='font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
          property='cc:attributionName'
          href='https://jpxoi.com'
        >
          Jean Paul Fernandez
        </a>{' '}
        está licenciado bajo{' '}
        <a
          href='https://creativecommons.org/licenses/by-nc-sa/4.0/deed.es'
          className='font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600'
          target='_blank'
          rel='license noopener noreferrer'
        >
          CC BY-NC-SA 4.0
        </a>
        .
      </p>
      <div className="mt-3 flex space-x-4">
        <a 
          href="/privacy"
          className="text-sm font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600"
        >
          Política de Privacidad
        </a>
        <a 
          href="/terms"
          className="text-sm font-medium text-blue-900 transition-colors duration-300 hover:text-blue-600"
        >
          Términos y Condiciones
        </a>
      </div>
    </div>
  )
}