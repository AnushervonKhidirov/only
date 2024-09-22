import type { FC } from 'react'

import styles from './dates-range.module.scss'

type TDateRange = {
    from: number
    to: number
}

const DateRange: FC<TDateRange> = ({ from, to }) => {
    return (
        <div className={styles.dateRange}>
            <div className={styles.from}>{from}</div>
            <div className={styles.to}>{to}</div>
        </div>
    )
}

export default DateRange
