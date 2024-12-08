import { ReactNode } from 'react';

interface ProviderParams {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderParams) => {
    return (
        <div>
            {children}
        </div>
    );
};
