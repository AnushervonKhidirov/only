import { useEffect, useRef } from 'react'
import RouletteItem from '../roulette-item/roulette-item'

import useRouletteStore from '../../store/roulette'

import styles from './roulette.module.scss'

const items = ['Наука 1', 'Наука 2', 'Наука 3', 'Наука 4', 'Наука 5', 'Наука 6']

const Roulette = () => {
    const { degree, updateDegree, activeItem } = useRouletteStore(state => state)

    useEffect(() => {
        updateDegree(360 / items.length * activeItem)
    }, [activeItem])

    return (
        <div className={styles.roulette}>
            {items.map((item, index, items) => {
                return <RouletteItem totalIndex={items.length} index={index} title={item} key={item} />
            })}
        </div>
    )
}

export default Roulette
