import RouletteItem from '../roulette-item/roulette-item'

import { chapters } from '../chapter-slider/constant'
import styles from './roulette.module.scss'

const Roulette = () => {
    return (
        <div className={styles.roulette}>
            {chapters.map((chapter, index, chapters) => {
                return <RouletteItem totalIndex={chapters.length} index={index} title={chapter} key={`chapter-${index}`} />
            })}
        </div>
    )
}

export default Roulette
