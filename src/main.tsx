import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ErrorOverlayProvider } from './providers/ErrorOverlayProvider.tsx'
import { WebSocketProvider } from './providers/WebSocketProvider.tsx'
import { UsersProvider } from './providers/UsersProvider.tsx'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import { CustomThemeProvider } from './providers/CustomThemeProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <WebSocketProvider>
                <ErrorOverlayProvider>
                    <UsersProvider>
                        <ThemeProvider>
                            <CustomThemeProvider>
                                <App />
                            </CustomThemeProvider>
                        </ThemeProvider>
                    </UsersProvider>
                </ErrorOverlayProvider>
            </WebSocketProvider>
        </BrowserRouter>
    </StrictMode>
)
