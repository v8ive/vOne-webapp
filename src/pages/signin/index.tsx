import { useState } from 'react';
import './index.css';

function SignIn() {
    return (
        <form className="auth-form">
            <h2>Sign In</h2>
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="youremail@example.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Sign In</button>
        </form>
    );
}

function SignUp() {
    return (
        <form className="auth-form">
            <h2>Sign Up</h2>
            <label htmlFor="name">Username</label>
            <input type="text" id="username" placeholder="Username" />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="youremail@example.com" />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Enter your password" />
            <button type="submit">Sign Up</button>
        </form>
    );
}

function AuthForm() {
    const [isSignIn, setIsSignIn] = useState(true);

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