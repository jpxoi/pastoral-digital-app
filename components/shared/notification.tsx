import { Toaster } from 'react-hot-toast'

export default function Notification({
  position = 'top-right',
  reverseOrder = true,
}: {
  position?:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right'
  reverseOrder?: boolean
}) {
  return (
    <Toaster
      position={position}
      reverseOrder={reverseOrder}
      toastOptions={{
        success: {
          style: {
            background: '#D1FAE5',
            color: '#065F46',
          },
          iconTheme: {
            primary: '#065F46',
            secondary: '#D1FAE5',
          },
        },
        error: {
          style: {
            background: '#fee2e2',
            color: '#b91c1c',
          },
          iconTheme: {
            primary: '#b91c1c',
            secondary: '#FECACA',
          },
        },
      }}
    />
  )
}
