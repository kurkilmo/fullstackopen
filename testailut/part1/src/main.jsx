import ReactDOM from 'react-dom/client'

import App from './App'
import Rend from './Rend'
import Kolme from './Kolme'

const root = ReactDOM.createRoot(document.getElementById('root'))

root.render(
    <div>
        <App />
        <Rend />
        <Kolme />
    </div>
)