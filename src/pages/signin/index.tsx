import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useAuthStore from '../../store/Auth';
import './index.css';

function AuthForm() {
    const { user, isLoading, error } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    }, [user, navigate]);

    return (
        <div className="auth-container">
            <h1>Welcome!</h1>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
        </div>
    );
}

export default AuthForm;