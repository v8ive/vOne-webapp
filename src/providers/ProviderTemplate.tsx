import { Box } from '@radix-ui/themes';
import { ReactNode } from 'react';

interface ProviderParams {
    children: ReactNode;
}

export const Provider = ({ children }: ProviderParams) => {
    return (
        <Box>
            {children}
        </Box>
    );
};
