import styles from './app.module.scss'

const App = () => {
    console.log(styles);
    
    return <div className={styles.hello}>hello!!</div>
}

export default App
