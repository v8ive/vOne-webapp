import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import './dropdown.css';
import useAuthStore from '../../store/Auth';


function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();
    const { user } = useAuthStore();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
            setIsOpen(false);
            }
        };

        document.addEventListener('mousedown',
            handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
    

    return (
        <div className="dropdown" ref={menuRef}>
            <button className={`hamburger-button ${isOpen ? 'open' : ''}`} onClick={toggleDropdown}>
                <FontAwesomeIcon icon={faBars} size='sm' />
            </button>
            <ul className={`dropdown-menu ${isOpen ? 'open' : ''}`}>
                
                <li onClick={() => { navigate('/'); setIsOpen(false); }}>Home</li>

                { user ? (
                    <li onClick={() => { navigate('/profile'); setIsOpen(false); }}>Profile</li>
                ) : (
                    <li onClick={() => { navigate('/signin'); setIsOpen(false); }}>Sign In / Sign Up</li>
                )}
            </ul>
        </div>
    );
}

export default Dropdown;
