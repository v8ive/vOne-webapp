import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CustomThemeProvider } from './providers/CustomThemeProvider.tsx'
import { ErrorOverlayProvider } from './providers/ErrorOverlayProvider.tsx'
import { WebSocketProvider } from './providers/WebSocketProvider.tsx'
import { UsersProvider } from './providers/UsersProvider.tsx'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './providers/AuthProvider.tsx'
import { PresenceProvider } from './providers/PresenceProvider.tsx'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <WebSocketProvider>
                    <UsersProvider>
                        <PresenceProvider>
                            <ThemeProvider>
                                <CustomThemeProvider>
                                    <ErrorOverlayProvider>
                                        <App />
                                    </ErrorOverlayProvider>
                                </CustomThemeProvider>
                            </ThemeProvider>
                        </PresenceProvider>
                    </UsersProvider>
                </WebSocketProvider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
)
