import type { TDatesRange } from '../../store/range-date'

import { useCallback, useEffect } from 'react'

import useDatesRangeStore from '../../store/range-date'
import useRouletteStore from '../../store/roulette'

import { datesPerChapters } from '../date-slider/constant'
import { chapters } from '../chapter-slider/constant'

import styles from './dates-range.module.scss'

const DateRange = () => {
    const { from, to, updateDates } = useDatesRangeStore(state => state)
    const { activeItem } = useRouletteStore(state => state)

    const increaseDatesAnimation = useCallback(() => {
        const activeChapter = datesPerChapters[chapters[activeItem]]
        const activeChapterDates = activeChapter.map(chapter => chapter.date).sort((a, b) => a - b)

        const prevDates = {
            from: from,
            to: to,
        }
        const currDates = {
            from: activeChapterDates[0],
            to: activeChapterDates.at(-1),
        }

        const animationDuration = 1000
        const fromRange = prevDates.from - currDates.from
        const toRange = prevDates.to - currDates.to

        const iterationCount = (Math.max(Math.abs(fromRange), Math.abs(toRange)))
        const interval = animationDuration / iterationCount
        
        animation(prevDates)

        function animation({ from, to }: TDatesRange) {
            if (from === currDates.from && to === currDates.to) return

            const newFromRange = from === currDates.from ? currDates.from : from < currDates.from ? ++from : --from
            const newToRange = to === currDates.to ? currDates.to : to < currDates.to ? ++to : --to

            const result = {
                from: newFromRange,
                to: newToRange,
            }

            setTimeout(() => {
                updateDates(result)
                animation(result)
            }, interval)
        }
    }, [activeItem])

    useEffect(() => {
        increaseDatesAnimation()
    }, [activeItem])

    return (
        <div className={styles.dateRange}>
            <div className={styles.from}>{from}</div>
            <div className={styles.to}>{to}</div>
        </div>
    )
}

export default DateRange
