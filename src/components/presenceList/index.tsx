import PresenceListItem from './presenceListItem';
import { Box, Flex, Spinner } from '@radix-ui/themes';
import { usePresence } from '../../context/PresenceContext';
import { useAuth } from '../../context/AuthContext';

const PresenceList: React.FC = () => {
    const { presences } = usePresence();
    const { isLoading } = useAuth();

    if (isLoading) {
        return (
            <Flex align="center" justify="center" style={{ marginTop: '25px' }}>
                <Spinner size={'3'} />
            </Flex>
        );
    }

    return (
            <Box style={{ display: 'flex', flexDirection: 'column', gap: '5px', padding: '10px' }}>
            {Object.entries(presences).map(([presenceId, presence]) => (
                    <PresenceListItem key={presenceId} presence={presence} />
                ))}
            </Box>
    );
};

export default PresenceList;