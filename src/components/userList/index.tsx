import { useEffect, useState } from 'react';
import UserListItem from '../userListItem';
import { useUsersContext } from '../../context/UsersContext';
import { Box, Flex, Spinner } from '@radix-ui/themes';
import { useWebSocketContext } from '../../context/WebSocketContext';

const UserList: React.FC = () => {
    const { users } = useUsersContext();
    const { lastMessage } = useWebSocketContext();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            if (Object.keys(users).length > 0) {
                setLoading(false);
            }
        }
    }, [lastMessage, users, loading]);

    if (loading) {
        return (
            <Flex align="center" justify="center" style={{ marginTop: '25px' }}>
                <Spinner size={'3'} />
            </Flex>
        );
    }

    return (
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px' }}>
                {Object.entries(users).map(([userId, user]) => (
                    <UserListItem key={userId} user={user} />
                ))}
            </Box>
    );
};

export default UserList;