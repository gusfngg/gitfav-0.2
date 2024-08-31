import React from 'react'
import ReactDOM from 'react-dom/client'
import { App } from './App'
import { ThemeProvider } from '@/components/theme/theme-provider'
import { queryClient } from './lib/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="system" storageKey="githubfav-theme">
      <QueryClientProvider client={queryClient}>
        <Toaster richColors />
        <App />
      </QueryClientProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
