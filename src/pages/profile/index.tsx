
import useAuthStore from '../../store/Auth';
import './index.css';

function UserProfile() {
    const { user, isLoading, error } = useAuthStore();

    if (!user) return null;

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
                    </div>
                    <h2>{user?.username}</h2>
                    <p>XP: {0}</p>
                </div>
            </div>
        );
    };

    return renderContent();
}

export default UserProfile;