import { ReactNode, useEffect, useState } from 'react';
import { ColorSchemeContext } from '../context/CustomThemeContext';
import { ThemeMode, ThemeName } from '../types/Theme';
import useAuthStore from '../store/Auth';

interface ProviderParams {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ProviderParams) => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<ThemeMode>(prefersDarkScheme.matches ? "dark" : "light");
    const [themeName, setThemeName] = useState<ThemeName>("violet");

    const { user } = useAuthStore();

    const handleAutoChange = () => {
        if (!user) {
            setMode(prefersDarkScheme.matches ? "dark" : "light");
        }
    }

    useEffect(() => {
        prefersDarkScheme.addEventListener("change", handleAutoChange);

        return () => {
            prefersDarkScheme.removeEventListener("change", handleAutoChange);
        }
    }, [prefersDarkScheme]);

    useEffect(() => {
        if (user) {
            setMode(user.theme_mode);
            setThemeName(user.theme_name);
        }
    }, [user]);

    return (
        <ColorSchemeContext.Provider value={{ mode, setMode, themeName, setThemeName }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};
