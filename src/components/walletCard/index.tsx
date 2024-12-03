import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent'; 1
import Typography from '@mui/material/Typography';
import { Wallet } from '../../types/Wallet';

function WalletCard({ wallet } : { wallet: Wallet }) {
    return (
        <Card sx={{ minWidth: 275 }}>
            <CardContent>
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

export default WalletCard;