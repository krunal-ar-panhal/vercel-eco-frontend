import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ContextWrapper from './Wrapper/contextWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <ContextWrapper>
    <App />
    </ContextWrapper>
)
