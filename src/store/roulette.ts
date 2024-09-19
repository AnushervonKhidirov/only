import { create } from 'zustand'

type TRoulette = {
    degree: number
    activeItem: number
    updateDegree: (deg: number) => void
    updateActiveItem: (deg: number) => void
}

const useRouletteStore = create<TRoulette>(set => ({
    degree: 0,
    activeItem: 0,
    updateDegree: deg => set(() => ({ degree: deg })),
    updateActiveItem: active => set(() => ({ activeItem: active })),
}))

export default useRouletteStore
