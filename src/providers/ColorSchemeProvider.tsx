import { ReactNode, useEffect, useState } from 'react';
import { ColorSchemeContext } from '../context/ColorSchemeContext';

interface ProviderParams {
    children: ReactNode;
}

export const ColorSchemeProvider = ({ children }: ProviderParams) => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<"light" | "dark">(prefersDarkScheme.matches ? "dark" : "light");
    
    useEffect(() => {
        prefersDarkScheme.addEventListener("change", () => {
            setMode(prefersDarkScheme.matches ? "dark" : "light");
        });
        
        return () => {
            prefersDarkScheme.removeEventListener("change", () => {
                setMode(prefersDarkScheme.matches ? "dark" : "light");
            });
        }

    }, [prefersDarkScheme]);
    
    return (
        <ColorSchemeContext.Provider value={{ mode, setMode }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};
