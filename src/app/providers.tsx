import type { ReactNode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { BrowserRouter } from 'react-router-dom'
import { TooltipProvider } from '@/components/ui/tooltip'
import { ErrorBoundary } from '@/components/common/error-boundary'
import { ThemeProvider } from './theme-provider'
import '@/i18n'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <HelmetProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <ThemeProvider>
          <ErrorBoundary>
            <TooltipProvider delayDuration={300}>
              {children}
            </TooltipProvider>
          </ErrorBoundary>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  )
}
