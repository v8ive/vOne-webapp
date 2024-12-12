import { Button } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { useAuth } from '../../context/AuthContext';
import './index.css';

function HeaderSignInButton() {
    const { signIn } = useAuth();

    return (
        <Button name='sign in' variant='ghost'
            onClick={signIn}
            style={{
                cursor: 'pointer',
                marginRight: '5px',
                marginLeft: '5px',
                alignSelf: 'center',
            }}
        >
            Sign In
            <DiscordLogoIcon />
        </Button>
    );
}

export default HeaderSignInButton;