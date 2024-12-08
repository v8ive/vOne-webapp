import React from 'react';
import UserListItem from '../userListItem';
import { useUsersContext } from '../../context/UsersContext';
import { Box, Flex, Spinner } from '@radix-ui/themes';

const UserList: React.FC = () => {
    const { users } = useUsersContext();

    if (Object.keys(users).length === 0) {
        return <Flex align='center'><Spinner /></Flex>;
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