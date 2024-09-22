import type { FC } from 'react'

import DateSlider from '../date-slider/date-slider'
import Arrow from '../arrow/arrow'

import useRouletteStore from '../../store/roulette'
import { chapters } from './constant'

import styles from './chapter-slider.module.scss'
import classNames from 'classnames'

const ChapterSlider: FC = () => {
    const { activeItem } = useRouletteStore(state => state)

    return (
        <div className={styles.customSlider}>
            <div className={styles.controls}>
                <ChapterSliderPagination />
                <ChapterSliderNavigation />
            </div>

            <DateSlider chapter={chapters[activeItem]} />
        </div>
    )
}

const ChapterSliderNavigation = () => {
    const { activeItem, updateActiveItem } = useRouletteStore(state => state)

    function nextChapter() {
        if (activeItem + 1 < chapters.length) updateActiveItem(activeItem + 1)
    }

    function prevChapter() {
        if (activeItem - 1 >= 0) updateActiveItem(activeItem - 1)
    }

    return (
        <div className={styles.navigation}>
            <Arrow className={classNames(styles.arrow, styles.arrowPrev)} callback={prevChapter} side="left" />
            <Arrow className={classNames(styles.arrow, styles.arrowNext)} callback={nextChapter} side="right" />
        </div>
    )
}

const ChapterSliderPagination = () => {
    const { activeItem } = useRouletteStore(state => state)

    function addZero(num: number) {
        return num > 9 ? num.toString() : `0${num}`
    }

    return <div className={styles.pagination}>{`${addZero(activeItem + 1)}/${addZero(chapters.length)}`}</div>
}

export default ChapterSlider
