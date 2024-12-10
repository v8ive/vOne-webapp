import { createContext, useContext } from 'react';
import { ThemeMode, ThemeName } from '../types/Theme';

interface ContextParams {
    mode: ThemeMode;
    themeName: ThemeName;
    setMode : (mode: ThemeMode) => void;
    setThemeName : (name: ThemeName) => void;
}

export const ColorSchemeContext = createContext<ContextParams | null>(null);

export const useCustomTheme = () => {
    const context = useContext(ColorSchemeContext);
    if (!context) {
        throw new Error('useCustomTheme must be used within a Provider');
    }
    return context;
};
