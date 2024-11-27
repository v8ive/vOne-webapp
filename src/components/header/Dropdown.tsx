import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Dropdown.css';
import useAuthStore from '../../store/Auth';


function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="dropdown">
            <button className='hamburger-button' onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faBars} size='sm' />
            </button>
            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                
                <li onClick={() => { navigate('/'); setIsOpen(false); }}>Home</li>

                { user ? (
                    <li onClick={() => { navigate('/profile'); setIsOpen(false); }}>Profile</li>
                ) : (
                    <li onClick={() => { navigate('/signin'); setIsOpen(false); }}>Sign In</li>
                )}
            </ul>
        </div>
    );
}

export default Dropdown;
