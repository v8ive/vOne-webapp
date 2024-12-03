import { Wallet } from '../../types/Wallet';
import WalletCard from '../walletCard';
import Box from '@mui/material/Box';

function WalletCarousel({ wallets } : { wallets: Wallet[] }) {
    return (
        <Box sx={{ display: 'flex', overflowX: 'auto' }}>
            {wallets.map((wallet) => (
                <WalletCard key={wallet.id} wallet={wallet} />
            ))}
        </Box>
    );
}

export default WalletCarousel;