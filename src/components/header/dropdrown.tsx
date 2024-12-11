import { useNavigate } from 'react-router-dom';
import { AlertDialog, Box, Button, DropdownMenu, Flex, IconButton } from '@radix-ui/themes';
import { DiscordLogoIcon } from '@radix-ui/react-icons';
import { EllipsisVertical } from 'lucide-react';
import { ThemeName, ThemeNames } from '../../types/Theme';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { supabase } from '../../utils/supabase';
import { useAuth } from '../../context/AuthContext';
import { DropdownMenuItemIndicator } from '@radix-ui/react-dropdown-menu';
import { usePresence } from '../../context/PresenceContext';
import { Status } from '../../types/User';
import './dropdown.css';

function Dropdown() {
    const navigate = useNavigate();
    const { user, signIn, signOut } = useAuth();
    const { setThemeName } = useCustomTheme();
    const { userPresence, setUserPresence } = usePresence();

    const handlePresenceChange = async (newStatus: Status) => {
        if (!user || !userPresence) return;
        
        setUserPresence({
            ...userPresence,
            status: newStatus,
        });
    };

    const handleThemeChange = async (theme_name: ThemeName) => {
        if (!user) return;
        const { error } = await supabase.from('theme').update({ theme_name }).eq('user_id', user.id);
        if (error) {
            console.error('Error updating user theme:', error);
            return;
        } else {
            setThemeName(theme_name);
        }
    }

    return (
        <Box style={{
            zIndex: 1,
        }}>
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

                    {user ? (
                        <>
                            <DropdownMenu.Item
                                onSelect={() => { navigate('/profile') }}
                            >
                                Profile
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator />

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

                            <DropdownMenu.Item>
                                <DropdownMenu.CheckboxItem
                                    checked={userPresence?.status === 'offline'}
                                    onCheckedChange={(checked) => handlePresenceChange(
                                        checked ? 'offline' : 'online'
                                    )}>
                                    Appear Offline
                                    <DropdownMenuItemIndicator>
                                        <DiscordLogoIcon />
                                    </DropdownMenuItemIndicator>
                                </DropdownMenu.CheckboxItem>
                            </DropdownMenu.Item>

                            <DropdownMenu.Separator />

                            <AlertDialog.Root>

                                <AlertDialog.Trigger>
                                    <Button name='sign out' color="red" variant='soft'>Sign Out</Button>
                                </AlertDialog.Trigger>

                                <AlertDialog.Content maxWidth="450px">

                                    <AlertDialog.Title>
                                        Sign Out?
                                    </AlertDialog.Title>

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
                        <DropdownMenu.Item onSelect={signIn}>
                            Sign In
                            <DiscordLogoIcon />
                        </DropdownMenu.Item>
                    )}
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    );
}

export default Dropdown;
