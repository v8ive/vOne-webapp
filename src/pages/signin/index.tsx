import { useEffect } from 'react';
import useAuthStore from '../../store/Auth';
import './signin.css'; // Assuming you have styles for signin.css
import { useNavigate } from 'react-router-dom';

function AuthForm() {
    const { signInWithDiscord, user, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile'); // Redirect to profile page on successful login
        }
    }, [user, navigate]);

    const handleSignInWithDiscord = async () => {
        try {
            await signInWithDiscord();
        } catch (error) {
            console.error(error); // Log the error for debugging
            // Display a user-friendly error message
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