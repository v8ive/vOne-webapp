import { useEffect, useState } from 'react';
import PresenceListItem from './presenceListItem';
import { Box, Flex, Spinner } from '@radix-ui/themes';
import { usePresence } from '../../context/PresenceContext';

const PresenceList: React.FC = () => {
    const { presences } = usePresence();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (loading) {
            if (Object.keys(presences).length > 0) {
                setLoading(false);
            }
        }
    }, [presences, loading]);

    if (loading) {
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