import { createContext, useContext } from 'react';

interface ContextParams {
    // add params here
    param: string;
}

export const Context = createContext<ContextParams | null>(null);

export const useMyContext = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error('useContext must be used within a Provider');
    }
    return context;
};
