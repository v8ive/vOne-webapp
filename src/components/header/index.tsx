import { Avatar, Box, Flex, Section, Skeleton } from '@radix-ui/themes';
import Dropdown from './dropdrown';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from './logo';
import HeaderThemeToggle from './themeToggle';
import HeaderSignInButton from './signInButton';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { useAuth } from '../../context/AuthContext';
import './index.css';

function Header() {
    const { user, isLoading } = useAuth();
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
            
            <HeaderLogo />

            <Flex className="header-container">

                <Dropdown />

                <HeaderThemeToggle />

                {/* Profile Icon / Sign In Button / Skeleton */}
                <Box style={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    gap: '10px',
                    flex: 1,
                    zIndex: 1,
                }}>
                    {!isLoading ? (
                        user ? <Avatar
                            size={'2'}
                            radius={'full'}
                            src={user.avatar_url}
                            fallback={
                                user.username?.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user.username?.slice(0, 2) || ''
                            }
                            className='profile-icon'
                            style={{ cursor: 'pointer', marginTop: '5px' }}
                            onClick={() => navigate('/profile')}
                        />
                        : <HeaderSignInButton />
                    ) : (
                        <Skeleton
                            className='profile-icon'
                            style={{
                                width: '30px',
                                height: '30px',
                                borderRadius: '50%',
                                marginTop: '5px',
                            }}
                        />
                    )
                    }
                    
                </Box>
            </Flex>
        </Section>
    );
}

export default Header;