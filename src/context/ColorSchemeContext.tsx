import { createContext, useContext } from 'react';

interface ContextParams {
    mode: 'light' | 'dark';
    setMode : (mode: 'light' | 'dark') => void;
}

export const ColorSchemeContext = createContext<ContextParams | null>(null);

export const useColorScheme = () => {
    const context = useContext(ColorSchemeContext);
    if (!context) {
        throw new Error('useColorScheme must be used within a Provider');
    }
    return context;
};
