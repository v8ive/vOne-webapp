import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../../store/Auth';
import './index.css';

function AuthForm() {
    const { signInWithDiscord, user, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    const handleSignInWithDiscord = async () => {
        try {
            await signInWithDiscord();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="auth-container">
            <h1>Welcome!</h1>
            <button className="auth-button" onClick={handleSignInWithDiscord}>
                Sign in with Discord
            </button>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default AuthForm;