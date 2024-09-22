import type { FC } from 'react'

import classNames from 'classnames'

import styles from './arrow.module.scss'

type TArrow = {
    side: 'left' | 'right'
    color?: 'light' | 'dark'
    callback?: () => void
    className?: string
}

const Arrow: FC<TArrow> = ({ side, color, callback, className }) => {
    return (
        <div className={classNames(styles.arrowWrapper, styles[side], styles[color], className)} onClick={callback}>
            <div className={styles.arrow}></div>
        </div>
    )
}

export default Arrow
