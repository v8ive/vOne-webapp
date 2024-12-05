import { useState } from 'react'
import useAuthStore from '../../store/Auth'
import { useNavigate } from 'react-router-dom';
import reactLogo from '../../assets/react.svg'
import viteLogo from '../../assets/vite.svg'
import './home.css'

function Home() {
    const { user, signOut } = useAuthStore()
    const [count, setCount] = useState(0)
    const navigate = useNavigate();

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo" />
                </a>
            </div>
            <h1>v8ive.one</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>

            {/* Display sign-in status based on user state */}
            {user ? ( // Check if user exists in the state
                <p>You are signed in as: {user.email} || <button onClick={signOut}>Sign Out</button></p>
            ) : (
                <button onClick={() => navigate('/signin')}>Sign In</button>
            )}
        </>
    )
}

export default Home

