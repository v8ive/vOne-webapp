import Dropdown from './Dropdown'; // Import the Dropdown component
import './header.css'; // Import the CSS file for the header component

function Header() {
    return (
        <header className='header'>
            <div className="header-container">
                <Dropdown />
                <div className="header-content">
                    {/* Your main header content, like a logo or title */}
                </div>
                <div className="profile-icon">
                    {/* Profile icon or user initials */}
                </div>
            </div>
        </header>
    );
}

export default Header;