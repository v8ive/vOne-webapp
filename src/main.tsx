import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorOverlayProvider } from './providers/ErrorOverlayProvider.tsx'
import { WebSocketProvider } from './providers/WebSocketProvider.tsx'
import { UsersProvider } from './providers/UsersProvider.tsx'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { ColorSchemeProvider } from './providers/ColorSchemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <WebSocketProvider>
                <ErrorOverlayProvider>
                    <UsersProvider>
                        <ThemeProvider>
                            <ColorSchemeProvider>
                                <App />
                            </ColorSchemeProvider>
                        </ThemeProvider>
                    </UsersProvider>
                </ErrorOverlayProvider>
            </WebSocketProvider>
        </BrowserRouter>
    </StrictMode>
)
