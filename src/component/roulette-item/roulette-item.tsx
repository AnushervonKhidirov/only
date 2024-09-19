import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import useRouletteStore from '../../store/roulette'

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

    const degreeBetweenItems = (360 / totalIndex)

    useEffect(() => {
        if (rouletteItemRef.current && circleRef.current && titleRef.current) {
            rouletteItemRef.current.style.transform = `rotate(${itemDeg - degree}deg)`
            circleRef.current.style.transform = `rotate(${-itemDeg + degree}deg)`
            titleRef.current.style.transform = `rotate(${-itemDeg + degree}deg)`
        }
    }, [itemDeg, degree])

    useEffect(() => {
        updateDegree(degreeBetweenItems * activeItem)
    }, [activeItem])

    useEffect(() => {
        setItemDeg(degreeBetweenItems * index)
    }, [degree])

    function rouletteHandler() {
        updateActiveItem(index)
    }

    return (
        <div ref={rouletteItemRef} className={styles.rouletteItem} onClick={rouletteHandler}>
            <div ref={circleRef} className={styles.rouletteCircle}>
                {index + 1}
            </div>
            <div ref={titleRef} className={styles.rouletteTitle}>
                {title}
            </div>
        </div>
    )
}

export default RouletteItem
