import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="githubfav-theme">
      <Toaster richColors />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
