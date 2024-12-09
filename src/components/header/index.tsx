import { Avatar, Button } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import useAuthStore from '../../store/Auth';
import Dropdown from './dropdrown';
import './index.css';

function Header() {
    const { user, isLoading, signInWithDiscord } = useAuthStore();


    return (
        <header className='header'>
            <div className="header-container">
                <Dropdown />
                <div className="header-content">
                    {/* Main header content, like a logo or title */}
                </div>
                <div className="profile-icon">
                    {!user && (
                        isLoading ? 
                        <>
                        </> :
                        <>
                            <Button name='sign in' variant='ghost'
                                onClick={signInWithDiscord} >Sign In
                                <DiscordLogoIcon />
                            </Button>
                        </>
                    )}
                    {user && (
                        <Avatar
                            size={'2'}
                            radius={'full'}
                            src={user.profile_picture}
                            fallback={
                                user.username.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user.username.slice(0, 2)
                            } />
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;