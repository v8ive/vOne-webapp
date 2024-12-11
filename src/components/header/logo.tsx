import { useNavigate } from 'react-router-dom';
import './index.css';

function HeaderLogo() {
    const navigate = useNavigate();

    return (
            <img
                src='/assets/icons/maskable_transparent/icon_x96-transparent.png'
                alt='v8ive.one'
                width='48'
                className='header-logo'
                style={{
                }}
                onClick={() => navigate('/')}
            />


    );
}

export default HeaderLogo;