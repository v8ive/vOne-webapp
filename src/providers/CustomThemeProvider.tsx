import { ReactNode, useEffect, useState } from 'react';
import { ColorSchemeContext } from '../context/CustomThemeContext';
import { ThemeMode, ThemeName } from '../types/Theme';
import useAuthStore, { supabase } from '../store/Auth';

interface ProviderParams {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ProviderParams) => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<ThemeMode>(localStorage.getItem('themeMode') as ThemeMode || "dark");
    const [themeName, setThemeName] = useState<ThemeName>(localStorage.getItem('themeName') as ThemeName || "iris");
    const user = useAuthStore((state) => state.user);

    const changeModePreference = () => {
        const theme_mode = prefersDarkScheme.matches ? "dark" : "light";
        setMode(theme_mode);
    }

    useEffect(() => {
        prefersDarkScheme.addEventListener("change", changeModePreference);

        return () => {
            prefersDarkScheme.removeEventListener("change", changeModePreference);
            localStorage.setItem('themeMode', mode);
            localStorage.setItem('themeName', themeName);
        }
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
        localStorage.setItem('themeName', themeName);
        if (user) {
            supabase.from('users').update({ theme_mode: mode, theme_name: themeName }).eq('id', user.id).then((response) => {
                if (response.error) {
                    console.error(response.error);
                }
            });
        }
    }, [mode, themeName, user]);

    return (
        <ColorSchemeContext.Provider value={{ mode, setMode, themeName, setThemeName }}>
            {children}
        </ColorSchemeContext.Provider>
    );
};
