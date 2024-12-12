import { Avatar, Box, Flex, Section } from '@radix-ui/themes';
import Dropdown from './dropdrown';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from './logo';
import HeaderThemeToggle from './themeToggle';
import HeaderSignInButton from './signInButton';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { useAuth } from '../../context/AuthContext';
import './index.css';
import InstallButton from '../ui/installButton';

function Header() {
    const { user } = useAuth();
    const { mode } = useCustomTheme();
    const navigate = useNavigate();

    return (
        <Section className='header' style={{
            position: 'fixed',
            padding: '0',
        }}>
            <Box style={{
                height: '100%',
                width: '100vw',
                display: 'flex',
                position: 'absolute',
                opacity: 0.9,
                backdropFilter: 'blur(4px)',
                backgroundColor: mode === 'dark' ? 'var(--accent-surface)' : 'var(--accent-7)',
                borderRadius: '0 0 15px 15px',
                borderBottom: '1px solid var(--accent-10)',
                boxShadow: `0 0 10px 0 ${mode === 'dark' ? 'var(--accent-10)' : 'var(--accent-12)'}`,
            }} />
            

            <Flex className="header-container">

                <Box style={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    gap: '20px',
                    flex: 1,
                    zIndex: 1,
                }}>
                    <Dropdown />

                    <HeaderThemeToggle />
                </Box>

                <Box style={{
                    marginTop: '5px',
                }}>
                    <HeaderLogo />
                </Box>

                {/* Profile Icon / Sign In Button / Skeleton */}
                <Box style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    marginTop: '5px',
                    gap: '10px',
                    flex: 1,
                    zIndex: 1,
                }}>
                    
                    <Box style={{
                        marginTop: '2.5px',
                    }}>
                        <InstallButton />
                    </Box>
                    {user ? <Avatar
                            size={'2'}
                            radius={'full'}
                            src={user.avatar_url}
                            fallback={
                                user.username ?
                                    user.username?.includes(' ') ?
                                        `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` 
                                        : user.username?.slice(0, 2) || ''
                                    : 'U'
                            }
                            className='profile-icon'
                            style={{ cursor: 'pointer', marginTop: '1px' }}
                            onClick={() => navigate('/profile')}
                        />
                        : <HeaderSignInButton />
                    }
                    
                </Box>
            </Flex>
        </Section>
    );
}

export default Header;