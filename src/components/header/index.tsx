import Dropdown from './Dropdown';
import './header.css';

function Header() {
    return (
        <header className='header'>
            <div className="header-container">
                <Dropdown />
                <div className="header-content">
                    {/* Main header content, like a logo or title */}
                </div>
                <div className="profile-icon">
                    {/* Profile icon or user initials */}
                </div>
            </div>
        </header>
    );
}

export default Header;