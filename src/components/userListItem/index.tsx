import React from 'react';
import { Avatar, Box, Card, Flex, HoverCard, Text } from '@radix-ui/themes';
import { UserStatePayload } from '../../types/UserStatePayload';

interface UserListItemProps {
    user: UserStatePayload;
}

const UserListItem: React.FC<UserListItemProps> = ({ user }) => {
    const { username, status, last_online } = user.user_state;
    const avatarUrl = `https://ui-avatars.com/api/?name=${username}`;
    const statusColor = status === 'online' ? 'green' : status === 'offline' ? 'gray' : 'yellow';

    const getTimeSince = (timestamp: number) => {
        const now = Date.now();
        const seconds = Math.floor((now - timestamp) / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        if (days > 0) {
            return `${days} day${days > 1 ? 's' : ''}`;
        } else if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''}`;
        } else if (minutes > 0) {
            return `${minutes} minute${minutes > 1 ? 's' : ''}`;
        } else {
            return 'Just now';
        }
    };

    return (
        <div className={`user-list-item ${status}`}>
            <Box maxWidth={"185px"}>
                <HoverCard.Root>
                    <HoverCard.Trigger>
                        <Card size={'1'}>
                            <Flex gap={"2"} align={"center"}>
                                <Avatar
                                    src={avatarUrl}
                                    size={"3"}
                                    radius='large'
                                    fallback={username.includes(' ') ? `${username.split(' ')[0][0]}${username.split(' ')[1][0]}` : username[0]}
                                    alt={username.includes(' ') ? `${username.split(' ')[0][0]}${username.split(' ')[1][0]}` : username[0]}
                                />
                                <Box>
                                    <Text as={"div"} size="2" weight={"bold"}>
                                        {username.length > 11 ? `${username.slice(0, 11)}...` : username}
                                    </Text>
                                    <Text as={"div"} size="1" style={{ color: statusColor }}>
                                        {status === 'online' ? "Online" : `Offline (${getTimeSince(last_online)})`}
                                    </Text>
                                </Box>
                            </Flex>
                        </Card>
                    </HoverCard.Trigger>
                    <HoverCard.Content maxWidth={'300px'} size={'3'}>
                            <Text as={"div"} size="2" weight={"bold"}>
                                {username}
                            </Text>
                            <Text as={"div"} size="1" style={{ color: statusColor }}>
                                {status === 'online' ? "Online" : `Offline (${getTimeSince(last_online)})`}
                            </Text>
                    </HoverCard.Content>
                </HoverCard.Root>
            </Box>
        </div>
    );
};

export default UserListItem;