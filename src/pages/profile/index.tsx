
import { Avatar, Badge, Blockquote, Box, Flex, Heading, Skeleton } from '@radix-ui/themes';
import { useAuth } from '../../context/AuthContext';
import './index.css';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { usePresence } from '../../context/PresenceContext';

function UserProfile() {
    const { user, isLoading } = useAuth();
    const { userPresence } = usePresence();
    const { mode } = useCustomTheme();

    const renderContent = () => {

        return (
            <Box style={{
                justifySelf: 'center',
                paddingTop: '50px',
                width: '100%',
                maxWidth: 1200,
            }}>
                
                <Box style={{
                    backgroundColor: `var(--accent-${ mode === 'dark' ? '2' : '7' })`,
                    borderRadius: '10px',
                    justifySelf: 'center',
                    padding: '40px',
                    width: '100%',
                    maxWidth: 800,
                }}>
                    <Flex>
                        <Skeleton loading={isLoading}>
                            <Avatar
                                src={user?.avatar_url && user?.avatar_url !== '' ? user.avatar_url : undefined}
                                size={"9"}
                                radius='large'
                                fallback={
                                    user?.username ?
                                        user?.username?.includes(' ') ?
                                            `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}`
                                            : user?.username?.slice(0, 2)
                                        : 'U'
                                }
                                alt={user?.username && user?.username.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user?.username?.slice(0, 2) || 'NN'}
                                style={{
                                    border: '2px solid var(--accent-7)',
                                }}
                            />
                        </Skeleton>
                        <Box style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            width: '100%',
                        }}>
                            <Box>
                                <Skeleton loading={isLoading} style={{ opacity: 100 }}>
                                    <Heading
                                        size="8"
                                        weight="bold"
                                    >{user?.username ?? 'name'}</Heading>
                                </Skeleton>
                            </Box>
                            <Box>
                                <Skeleton loading={isLoading}>
                                    <Badge 
                                        variant='surface'
                                        color={userPresence?.status === 'online' ? 'green' : (userPresence?.status === 'away' ? 'amber' : 'gray')}
                                        style={{ marginTop: '5px' }}>
                                        {userPresence?.status ?? 'online'}
                                    </Badge>
                                </Skeleton>
                                <Skeleton loading={isLoading}>
                                    <Blockquote style={{
                                        padding: '10px',
                                        marginTop: '10px',
                                        justifySelf: 'center',
                                        maxWidth: '75%',
                                    }}>
                                        {user?.bio ?? 'bio'}
                                    </Blockquote>
                                </Skeleton>
                            </Box>
                        </Box>

                    </Flex>
                </Box>
                
            </Box>
        );
    };

    return renderContent();
}

export default UserProfile;