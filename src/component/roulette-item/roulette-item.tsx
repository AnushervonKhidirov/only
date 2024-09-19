import type { FC } from 'react'
import { useEffect, useRef, useState } from 'react'

import styles from './roulette-item.module.scss'

type TRouletteItem = {
    totalIndex: number
    index: number
    title: string
}

const RouletteItem: FC<TRouletteItem> = ({ totalIndex, index, title }) => {
    const rouletteItemRef = useRef<HTMLDivElement>(null)
    const circleRef = useRef<HTMLDivElement>(null)
    const titleRef = useRef<HTMLDivElement>(null)
    const [deg, setDeg] = useState(0)

    useEffect(() => {
        if (rouletteItemRef.current && circleRef.current && titleRef.current) {
            rouletteItemRef.current.style.transform = `rotate(${deg}deg)`
            circleRef.current.style.transform = `rotate(-${deg}deg)`
            titleRef.current.style.transform = `rotate(-${deg}deg)`
        }
    }, [deg])

    useEffect(() => {
        setDeg(360 / totalIndex * index)
    }, [rouletteItemRef])
    
    return <div ref={rouletteItemRef} className={styles.rouletteItem}>
        <div ref={circleRef} className={styles.rouletteCircle}>{index + 1}</div>
        <div ref={titleRef} className={styles.rouletteTitle}>{title}</div>
    </div>
}

export default RouletteItem
