import { Box } from '@radix-ui/themes';
import { useNavigate } from 'react-router-dom';
import './index.css';

function HeaderLogo() {
    const navigate = useNavigate();

    return (
        <Box
            style={{
                position: 'fixed',
                width: '100vw',
                justifyItems: 'center',

            }}>
            <img
                src='/assets/icons/maskable_transparent/icon_x96-transparent.png'
                alt='v8ive.one'
                width='48'
                className='header-logo'
                style={{
                }}
                onClick={() => navigate('/')}
            />
        </Box>


    );
}

export default HeaderLogo;