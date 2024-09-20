import type { FC, ReactNode } from 'react'

import styles from './headline.module.scss'

const Headline: FC<{ children: ReactNode }> = ({ children }) => {
    return <div className={styles.headline}>{children}</div>
}

export default Headline
