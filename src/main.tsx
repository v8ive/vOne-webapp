import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorOverlayProvider } from './providers/ErrorOverlayProvider.tsx'
import { WebSocketProvider } from './providers/WebSocketProvider.tsx'
import App from './App.tsx'
import './index.css'
import { UsersProvider } from './providers/UsersProvider.tsx'
import { Theme } from '@radix-ui/themes'
import { ThemeProvider } from 'next-themes'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <WebSocketProvider>
            <ErrorOverlayProvider>
                <UsersProvider>
                    <ThemeProvider>
                        <Theme
                            hasBackground
                            appearance={window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'}
                            accentColor='violet'
                            panelBackground='translucent'
                        >
                            <App />
                        </Theme>
                    </ThemeProvider>
                </UsersProvider>
            </ErrorOverlayProvider>
        </WebSocketProvider>
    </StrictMode>,
)
