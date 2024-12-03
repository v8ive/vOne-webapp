import { createWallet } from '../../utils/wallets';
import useAuthStore from '../../store/Auth';

function CreateWalletForm() {
    const { user } = useAuthStore();

    if (!user) return null;

    const handleSubmit = async () => {

        try {
            await createWallet(user);
            // Re-fetch wallets after creation
        } catch (error) {
            console.error('Error creating wallet:', error);
        }
    };

    return (
            <form onSubmit={handleSubmit}>
                <button type="submit">Create Wallet</button>
            </form>
    );
}

export default CreateWalletForm;