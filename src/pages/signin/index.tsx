import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import './index.css';

function AuthForm() {
    const { user, isLoading } = useAuth();
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
        </div>
    );
}

export default AuthForm;