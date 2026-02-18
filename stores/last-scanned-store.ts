import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { FetchAttendanceProps } from '@/types'

type LastScannedState = {
  lastScanned: FetchAttendanceProps[]
}

type LastScannedActions = {
  addLastScanned: (lastScanned: FetchAttendanceProps) => void
  reset: () => void
}

type LastScannedStore = LastScannedState & LastScannedActions

const defaultInitState: LastScannedState = {
  lastScanned: [],
}

export const useLastScannedStore = create(
  persist<LastScannedStore>(
    (set) => ({
      ...defaultInitState,
      addLastScanned: (newScan: FetchAttendanceProps) =>
        set((state) => ({
          lastScanned: [newScan, ...state.lastScanned].slice(0, 6),
        })),
      reset: () => set(defaultInitState),
    }),
    {
      name: 'last-scanned',
      storage: createJSONStorage(() => sessionStorage),
    }
  )
)
