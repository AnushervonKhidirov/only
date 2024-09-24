import type { FC, PropsWithChildren } from 'react'
import styles from './sub-headline.module.scss'

const SubHeadline: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.subHeadline}>{children}</div>
}

export default SubHeadline
