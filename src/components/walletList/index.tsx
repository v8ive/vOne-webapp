import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Wallet } from '../../types/Wallet';
import { useState } from 'react';

function WalletCard({ wallet } : { wallet: Wallet }) {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };
    
    return (
        <Card

            sx={{
                minWidth: 275,
                maxWidth: 345,
                margin: '16px',
                transition: 'all 0.2s ease-in-out',
                transform: `translateZ(${isHovered ? '10px' : '0'}) scale(${isHovered ? '1.05' : '1'})`,
                boxShadow: isHovered ? '0px 8px 16px rgba(0, 0, 0, 0.2)' : 'none',
                '&:hover': {
                    cursor: 'pointer'
                }
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <CardContent sx={{ pointerEvents: 'auto' }}>
                <Typography variant="h5" component="div">
                    Wallet ID: {wallet.id}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    {wallet.balances.map((balance) => (
                        <div key={balance.currency_code}>
                            {balance.currency_code}: {balance.balance}
                        </div>
                    ))}
                </Typography>
            </CardContent>
        </Card>
    );
}

function WalletList({ wallets } : { wallets: Wallet[] }) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {wallets.map((wallet) => (
                <WalletCard key={wallet.id} wallet={wallet} />
            ))}
        </Box>
    );
}

export default WalletList;