import Roulette from '../component/roulette/roulette'
import Headline from '../component/headline/headline'

import styles from './app.module.scss'

const App = () => {
    return (
        <div className={styles.app}>
            <Headline>
                Исторические
                <br /> даты
            </Headline>
            <Roulette />
        </div>
    )
}

export default App
