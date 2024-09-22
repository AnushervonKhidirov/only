import type { FC } from 'react'

import styles from './date-slide.module.scss'

export type TDateItem = {
    date: number
    desc: string
}

const DateSliderItem: FC<TDateItem> = ({ date, desc }) => {
    return (
        <div className={styles.dateSlide}>
            <div className={styles.date}>{date}</div>
            <div className={styles.desc}>{desc}</div>
        </div>
    )
}

export default DateSliderItem
