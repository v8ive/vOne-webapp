import { Avatar, Box, Flex, Section } from '@radix-ui/themes';
import useAuthStore from '../../store/Auth';
import Dropdown from './dropdrown';
import { useNavigate } from 'react-router-dom';
import HeaderLogo from './logo';
import HeaderThemeToggle from './themeToggle';
import HeaderSignInButton from './signInButton';
import './index.css';
import { useCustomTheme } from '../../context/CustomThemeContext';

function Header() {
    const { user, isLoading } = useAuthStore();
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
                            <HeaderSignInButton />
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
                            style={{ cursor: 'pointer', marginTop: '5px' }}
                            onClick={() => navigate('/profile')}
                        />
                    )}
                </Box>
            </Flex>
        </Section>
    );
}

export default Header;