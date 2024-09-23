import { create } from 'zustand'

export type TDatesRange = {
    from: number
    to: number
}

type TDatesRangeStore = TDatesRange & {
    updateDates: (date: TDatesRange) => void
}

const useDatesRangeStore = create<TDatesRangeStore>(set => ({
    from: 1950,
    to: 1955,
    updateDates: date =>
        set(() => ({
            from: date.from,
            to: date.to,
        })),
}))

export default useDatesRangeStore
