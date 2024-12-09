
import { Avatar, Box, Heading } from '@radix-ui/themes';
import useAuthStore from '../../store/Auth';
import './index.css';

function UserProfile() {
    const { user, isLoading, error } = useAuthStore();

    if (!user) return null;

    const renderContent = () => {
        if (isLoading) return <p>Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!user) return <p>Please sign in.</p>;

        if (!user) return null;

        return (
            <Box>
                <Avatar
                    src={user.profile_picture && user.profile_picture !== '' ? user.profile_picture : undefined}
                    size={"9"}
                    radius='large'
                    fallback={user.username.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user.username.slice(0, 2)}
                    alt={user.username.includes(' ') ? `${user.username.split(' ')[0][0]}${user.username.split(' ')[1][0]}` : user.username.slice(0, 2)}
                />
                <Box>
                    <Box>
                        <Heading
                            size="8"
                            weight="bold"
                            >{user.username}</Heading>
                    </Box>
                    <Box>
                        <p>{user.status}</p>
                    </Box>
                </Box>
            </Box>
        );
    };

    return renderContent();
}

export default UserProfile;