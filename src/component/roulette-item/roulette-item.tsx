import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import useRouletteStore from '../../store/roulette'

import classNames from 'classnames'
import styles from './roulette-item.module.scss'

type TRouletteItem = {
    totalIndex: number
    index: number
    title: string
}

const RouletteItem: FC<TRouletteItem> = ({ totalIndex, index, title }) => {
    const { degree, updateDegree, activeItem, updateActiveItem } = useRouletteStore(state => state)

    const rouletteItemRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const [itemDeg, setItemDeg] = useState(0)

    const degreeBetweenItems = 360 / totalIndex

    useEffect(() => {
        if (rouletteItemRef.current && circleRef.current && titleRef.current) {
            rouletteItemRef.current.style.rotate = `${itemDeg - degree}deg`
            circleRef.current.style.rotate = `${-itemDeg + degree}deg`
            titleRef.current.style.rotate = `${-itemDeg + degree}deg`
        }
    }, [itemDeg, degree])

    useEffect(() => {
        updateDegree(degreeBetweenItems * activeItem - (90 - degreeBetweenItems))
    }, [activeItem])

    useEffect(() => {
        setItemDeg(degreeBetweenItems * index)
    }, [degree])

    function rouletteHandler() {
        updateActiveItem(index)
    }

    return (
        <div
            ref={rouletteItemRef}
            className={classNames(styles.rouletteItem, { [styles.active]: index === activeItem })}
            onClick={rouletteHandler}
        >
            <div ref={circleRef} className={styles.rouletteCircle}>
                <div className={styles.border}></div>
                <div className={styles.index}>{index + 1}</div>
            </div>
            <div ref={titleRef} className={styles.rouletteTitle}>
                {title}
            </div>
        </div>
    )
}

export default RouletteItem
