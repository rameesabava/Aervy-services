import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShareContext from './context API/ShareContext.jsx'
import RouteGuardContext from './context API/RouteGuardContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShareContext>
        <RouteGuardContext>
          <App />
        </RouteGuardContext>
      </ShareContext>

    </BrowserRouter>
  </StrictMode>,
)
