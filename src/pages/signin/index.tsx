import { useEffect, useState } from 'react';
import useAuthStore from '../../store/Auth';
import './signin.css';
import { useNavigate } from 'react-router-dom';

function SignIn() {
    const { login, isLoading, error } = useAuthStore();

    interface SignInFormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
        password: HTMLInputElement;
    }

    interface SignInFormElement extends HTMLFormElement {
        readonly elements: SignInFormElements;
    }

    const handleSubmit = async (event: React.FormEvent<SignInFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.elements.email.value;
        const password = event.currentTarget.elements.password.value;

        try {
            await login(email, password);
        } catch (error) {
            console.error('Login error:', error);
            // Display error message to the user
        }
    };
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="youremail@example.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Sign In</button>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

function SignUp() {
    const { signup, isLoading, error } = useAuthStore();

    interface SignUpFormElements extends HTMLFormControlsCollection {
        email: HTMLInputElement;
        password: HTMLInputElement;
        username: HTMLInputElement;
    }

    interface SignUpFormElement extends HTMLFormElement {
        readonly elements: SignUpFormElements;
    }

    const handleSubmit = async (event: React.FormEvent<SignUpFormElement>) => {
        event.preventDefault();
        const email = event.currentTarget.elements.email.value;
        const password = event.currentTarget.elements.password.value;
        const username = event.currentTarget.elements.username.value;

        try {
            await signup(email, password, username);
        } catch (error) {
            console.error('SignUp error:', error);
            // Display error message to the user
        }
    };
    return (
        <form className="auth-form" onSubmit={handleSubmit}>
            <h2>Sign Up</h2>
            <label htmlFor="name">Username</label>
            <input type="text" id="username" placeholder="Username" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="youremail@example.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Sign Up</button>
            {isLoading && <p>Loading...</p>}
            {error && <p className="error-message">{error}</p>}
        </form>
    );
}

function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);
    const { user } = useAuthStore();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/profile');
        }
    });

    const handleSwitchForm = () => {
        setIsSignIn(!isSignIn);
    };

    const currentForm = isSignIn ? <SignIn /> : <SignUp />;

    return (
        <div className="auth-container">
            <h1>Welcome!</h1>
            {currentForm}
            <button className="switch-button" onClick={handleSwitchForm}>
                {isSignIn ? "Don't have an account?" : "Already have an account?"}
            </button>
        </div>
    );
}

export default AuthForm;