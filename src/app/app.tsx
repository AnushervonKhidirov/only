import { useLayoutEffect, useState } from 'react'

import Roulette from '../component/roulette/roulette'
import DateRange from '../component/dates-range/dates-range'
import Headline from '../component/headline/headline'
import ChapterSlider from '../component/chapter-slider/chapter-slider'

import { checkIsMobile } from '../helper/is-mobile'
import styles from './app.module.scss'

const App = () => {
    const [isMobile, setIsMobile] = useState(false)

    useLayoutEffect(() => {
        setIsMobile(checkIsMobile())

        window.addEventListener('resize', () => {
            setIsMobile(checkIsMobile())
        })
    })

    return (
        <div className={styles.app}>
            <Headline>
                Исторические даты
            </Headline>
            <DateRange />
            {!isMobile && <Roulette />}
            <ChapterSlider />
        </div>
    )
}

export default App
