import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShareContext from './context API/ShareContext.jsx'
import RouteGuardContext from './context API/RouteGuardContext.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <GoogleOAuthProvider clientId='124709061748-rpm5n8lr7e98sic0534cgndp8dkanapd.apps.googleusercontent.com'>
        <ShareContext>
          <RouteGuardContext>
            <App />
          </RouteGuardContext>
        </ShareContext>
      </GoogleOAuthProvider>

    </BrowserRouter>
  </StrictMode>,
)
