import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// @ts-expect-error No type declarations
import '@fontsource-variable/inter'
// @ts-expect-error No type declarations
import '@fontsource-variable/montserrat'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
