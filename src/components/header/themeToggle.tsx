import { Box, IconButton } from '@radix-ui/themes';
import { Moon, Sun } from "lucide-react";
import useAuthStore from '../../store/Auth';
import { useCustomTheme } from '../../context/CustomThemeContext';
import { supabase } from '../../utils/supabase';
import './index.css';

function HeaderThemeToggle() {
    const { user } = useAuthStore();
    const { mode, setMode } = useCustomTheme();

    const handleToggleThemeMode = async () => {
        if (mode === 'dark') {
            if (user) {
                const { error } = await supabase.from('users').update({ theme_mode: 'light' }).eq('user_id', user.user_id);
                if (error) {
                    console.error('Error updating user theme mode:', error);
                    return;
                }
            }
            setMode('light');
        } else {
            if (user) {
                const { error } = await supabase.from('users').update({ theme_mode: 'dark' }).eq('user_id', user.user_id);
                if (error) {
                    console.error('Error updating user theme mode:', error);
                    return;
                }
            }
            setMode('dark');
        }
    }

    return (
        <Box style={{
            display: 'flex',
            justifyContent: 'flex-start',
            paddingLeft: '25px',
            flex: 2,
        }}>
            {mode === 'dark' ?
                <IconButton variant='ghost' style={{
                    marginTop: '1px',
                }}>
                    <Sun
                        size={24}
                        className='theme-toggle'
                        onClick={handleToggleThemeMode}
                    />
                </IconButton> :
                <IconButton variant='ghost' style={{
                    marginTop: '1px',
                }}>
                    <Moon
                        size={22}
                        className='theme-toggle'
                        onClick={handleToggleThemeMode}
                    />
                </IconButton>
            }
        </Box>
    );
}

export default HeaderThemeToggle;