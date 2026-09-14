import { createRoot } from 'react-dom/client'
import './app/index.css'
import App from './app/App.jsx'
import { Provider } from 'react-redux'
import { store } from './app/store.js'

const savedTheme = localStorage.getItem('lumiq-theme');
if (savedTheme === 'light') {
  document.documentElement.classList.add('theme-light');
}

createRoot(document.getElementById('root')).render(
  
    <Provider store={store}>
      <App />
    </Provider>
  
)
