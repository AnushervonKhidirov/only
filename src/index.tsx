import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './app/app'

const rootElement = document.getElementById('root')!
const root = ReactDOM.createRoot(rootElement)

// root.render(<h1>hello</h1>)
root.render(<App />)
