import CreateWalletForm from '../../components/createWalletForm';
import WalletCarousel from '../../components/walletCarousel';
import WalletList from '../../components/walletList';
import useAuthStore from '../../store/Auth';
import './profile.css';

function UserProfile() {
    const { user, isLoading, error } = useAuthStore();

    const renderContent = () => {
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!user) return <p>Please sign in.</p>;

        if (!user) return null;

        return (
            <div className="user-profile">
                <div className="user-info">
                    <div className="profile-picture">
                        <img src={`https://ui-avatars.com/api/?name=${ user ? user.username : 'John+Doe' }`} alt="Profile Picture" />
                        <button className="edit-button">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zM12 15l4.59-4.58L17.54 10l-4.59-4.58L12 10.41z" />
                            </svg>
                        </button>
                    </div>
                    <h2>{user?.username}</h2>
                    <p>XP: {0}</p>
                    <div className="currency-details">
                        <p>Lux: {0}</p>
                    </div>
                    <div className="currency-details">
                        <p>Nox: {0}</p>
                    </div>
                </div>
                <CreateWalletForm />
                <WalletList wallets={user.wallets} />
            </div>
        );
    };

    return renderContent();
}

export default UserProfile;