import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/Auth';
import { AlertDialog, Button, DropdownMenu, Flex, IconButton } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { EllipsisVertical } from 'lucide-react';
import { ThemeName, ThemeNames } from '../../types/Theme';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { supabase } from '../../store/Auth';
import './dropdown.css';

function Dropdown() {
    const navigate = useNavigate();
    const { user, signInWithDiscord, signOut } = useAuthStore();
    const { setThemeName } = useCustomTheme();

    const handleThemeChange = async (theme_name: ThemeName) => {
        if (!user) return;
        const { error } = await supabase.from('users').update({ theme_name }).eq('user_id', user.user_id);
        if (error) {
            console.error('Error updating user theme:', error);
            return;
        } else {
            setThemeName(theme_name);
        }
    }

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <IconButton name='main menu dropdown' variant='ghost' style={{ marginTop: '1px', cursor: 'pointer' }}>
                    <EllipsisVertical size={22} />
                </IconButton>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>

                <DropdownMenu.Item
                    onSelect={() => { navigate('/'); }}
                >
                    Home
                </DropdownMenu.Item>

                <DropdownMenu.Separator />

                {user ? (
                    <>
                        <DropdownMenu.Item
                            onSelect={() => { navigate('/profile') }}
                        >
                            Profile
                        </DropdownMenu.Item>

                        <DropdownMenu.Sub>
                            <DropdownMenu.SubTrigger>
                                    Change Theme
                            </DropdownMenu.SubTrigger>

                            <DropdownMenu.SubContent>
                                {ThemeNames.map((theme_name) => (
                                    <DropdownMenu.Item
                                        key={theme_name}
                                        onSelect={() => { handleThemeChange(theme_name) }}
                                    >
                                        {theme_name}
                                    </DropdownMenu.Item>
                                ))}
                            </DropdownMenu.SubContent>

                        </DropdownMenu.Sub>

                        <AlertDialog.Root>
                            <AlertDialog.Trigger>
                                <Button name='sign out' color="red" variant='soft'>Sign Out</Button>
                            </AlertDialog.Trigger>
                            <AlertDialog.Content maxWidth="450px">
                                <AlertDialog.Title>Sign Out?</AlertDialog.Title>
                                <AlertDialog.Description size="2">
                                    Are you sure you want to sign out?
                                </AlertDialog.Description>

                                <Flex gap="3" mt="4" justify="end">
                                    <AlertDialog.Cancel>
                                        <Button name='cancel' variant="soft" color="gray">
                                            Cancel
                                        </Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                        <Button name='sign out' variant="solid" color="red"
                                            onClick={signOut}>
                                            Sign Out
                                        </Button>
                                    </AlertDialog.Action>
                                </Flex>
                            </AlertDialog.Content>
                        </AlertDialog.Root>
                    </>
                ) : (
                    <DropdownMenu.Item onSelect={signInWithDiscord}>
                        Sign In
                        <DiscordLogoIcon />
                    </DropdownMenu.Item>
                )}
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
}

export default Dropdown;
