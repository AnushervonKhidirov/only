import ReactDOM from 'react-dom/client'

import App from './app/app'

import './global.scss'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

root.render(<App />)
