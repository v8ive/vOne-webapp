import { Button } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import useAuthStore from '../../store/Auth';
import './index.css';

function HeaderSignInButton() {
    const { signInWithDiscord } = useAuthStore();

    return (
        <Button name='sign in' variant='ghost'
            onClick={signInWithDiscord}
            style={{
                cursor: 'pointer',
                marginRight: '10px',
            }}
        >
            Sign In
            <DiscordLogoIcon />
        </Button>
    );
}

export default HeaderSignInButton;