import useDatesRangeStore from '../../store/range-date'

import styles from './dates-range.module.scss'

const DateRange = () => {
    const { from, to } = useDatesRangeStore(state => state)

    return (
        <div className={styles.dateRange}>
            <div className={styles.from}>{from}</div>
            <div className={styles.to}>{to}</div>
        </div>
    )
}

export default DateRange
