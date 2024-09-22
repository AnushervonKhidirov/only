import Roulette from '../component/roulette/roulette'
import DateRange from '../component/dates-range/dates-range'
import Headline from '../component/headline/headline'
import ChapterSlider from '../component/chapter-slider/chapter-slider'

import styles from './app.module.scss'

const App = () => {
    return (
        <div className={styles.app}>
            <Headline>
                Исторические
                <br /> даты
            </Headline>
            <DateRange from={2000} to={2005} />
            <Roulette />
            <ChapterSlider />
        </div>
    )
}

export default App
