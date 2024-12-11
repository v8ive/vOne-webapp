import { Avatar, Box, Card, Flex, HoverCard, Text } from '@radix-ui/themes';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { Presence } from '../../types/Presence';

interface PresenceListItemProps {
    presence: Presence;
}

const PresenceListItem: React.FC<PresenceListItemProps> = ({ presence }: { presence: Presence}) => {
    const { mode } = useCustomTheme();
    let { username, status, last_online, avatar_url } = presence;
    const statusColor = status === 'online' ? 'green' : status === 'offline' ? 'gray' : 'yellow';

    if (!username) {
        username = presence.name ?? 'Unknown';
    }
    if (!status) {
        status = 'away';
    }
    if (!last_online) {
        last_online = new Date().getTime();
    }
    if (!avatar_url) {
        avatar_url = '';
    }
        
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
                        <Card size={'1'} variant='ghost' style={{
                            display: 'flex',
                            alignItems: 'center',
                            margin: '.5px',
                            cursor: 'pointer',
                            borderRadius: '10px',
                            backgroundColor: mode === 'dark' ? 'var(--accent-surface)' : 'var(--accent-7)',
                            border: '1px solid var(--accent-10)',
                        }}>
                            <Flex gap={"2"} align={"center"}>
                                <Avatar
                                    src={avatar_url && avatar_url !== '' ? avatar_url : undefined}
                                    size={"3"}
                                    radius='large'
                                    fallback={
                                        username.includes(' ') ?
                                            `${username.split(' ')[0][0]}${username.split(' ')[1][0]}`
                                            : username.includes('-') ?
                                                `${username.split('-')[0][0]}${username.split('-')[1][0]}`
                                                : (username ? username.slice(0, 2) : 'XX')
                                    }
                                    alt={
                                        username.includes(' ') ?
                                            `${username.split(' ')[0][0]}${username.split(' ')[1][0]}`
                                            : username.includes('-') ?
                                                `${username.split('-')[0][0]}${username.split('-')[1][0]}`
                                                : (username ?
                                                    username.slice(0, 2)
                                                    : 'XX'
                                                )
                                    }
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
                    <HoverCard.Content maxWidth={'300px'} size={'1'}>
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

export default PresenceListItem;