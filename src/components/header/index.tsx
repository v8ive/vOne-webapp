import { Avatar, Box, Button, Flex, Section } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { Moon, Sun } from "lucide-react";
import useAuthStore from '../../store/Auth';
import Dropdown from './dropdrown';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useColorScheme } from '../../context/ColorSchemeContext';

function Header() {
    const { user, isLoading, signInWithDiscord } = useAuthStore();
    const navigate = useNavigate();
    const { mode, setMode } = useColorScheme();

    return (
        <Section className='header' style={{
            height: '48px',
            padding: '0',
        }}>
            {/* Logo */}
            <Box
                style={{
                    position: 'fixed',
                    width: '100vw',
                    justifyItems: 'center',

                }}>
                <img
                    src='/assets/icons/maskable_transparent/icon_x96-transparent.png'
                    alt='v8ive.one'
                    width='48'
                    className='header-logo'
                    style={{
                    }}
                    onClick={() => navigate('/')}
                />
            </Box>
            
            <Flex className="header-container" 
                style={{
                    width: '100vw',
                    justifySelf: 'center',
                }}>
                {/* Dropdown Menu */}
                <Box style={{
                    zIndex: 1,
                }}>
                    <Dropdown />
                </Box>

                {/* Theme Toggle */}
                <Box style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    paddingLeft: '25px',
                    marginTop: '1px',
                    flex: 2,
                }}>
                    {mode === 'dark' ?
                        <Sun
                            size={22}
                            className='theme-toggle'
                            onClick={() => setMode('light')}
                        /> :
                        <Moon
                            size={22}
                            className='theme-toggle'
                            onClick={() => setMode('dark')}
                        />
                    }
                </Box>

                {/* Profile Icon / Sign In Button */}
                <Box style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    flex: 1,
                    zIndex: 1,
                }}>
                        {!user && (
                            isLoading ?
                                <>
                                </> :
                                    <Button name='sign in' variant='ghost'
                                        onClick={signInWithDiscord}
                                        style={{
                                            cursor: 'pointer',
                                        }}
                                        >
                                            Sign In
                                        <DiscordLogoIcon />
                                    </Button>
                        )}
                        {user && (
                            <Avatar
                                size={'2'}
                                radius={'full'}
                                src={user.profile_picture}
                                fallback={
                                    user.username.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user.username.slice(0, 2)
                                }
                                className='profile-icon'
                                style={{ cursor: 'pointer', marginTop: '1px' }}
                                onClick={() => navigate('/profile')}
                            />
                        )}
                </Box>
            </Flex>
        </Section>
    );
}

export default Header;