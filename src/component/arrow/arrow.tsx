import type { FC } from 'react'

import classNames from 'classnames'

import styles from './arrow.module.scss'

type TArrow = {
    side: 'left' | 'right'
    callback: () => void
    className?: string
}

const Arrow: FC<TArrow> = ({ side, callback, className }) => {
    return (
        <div className={classNames(styles.arrowWrapper, styles[side], className)} onClick={callback}>
            <div className={styles.arrow}></div>
        </div>
    )
}

export default Arrow
