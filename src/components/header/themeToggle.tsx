import { IconButton } from "@radix-ui/themes";
import { Moon, Sun } from "lucide-react";
import { useCustomTheme } from "../../context/CustomThemeContext";
import { supabase } from "../../utils/supabase";
import { useAuth } from "../../context/AuthContext";
import "./index.css";

function HeaderThemeToggle() {
    const { user } = useAuth();
    const { mode, setMode } = useCustomTheme();

    const handleToggleThemeMode = async () => {
        const newMode = mode === "dark" ? "light" : "dark";

        if (user) {
            const { error } = await supabase
                .from("theme")
                .update({ theme_mode: newMode })
                .eq("user_id", user.id);
            if (error) {
                console.error("Error updating user theme mode:", error);
                return;
            }
        }

        setMode(newMode);
    };

    return (
        <>
            {mode === "dark" ? (
                <IconButton variant="ghost" style={{ alignSelf: 'center', marginTop: '0' }}>
                    <Sun
                        size={24}
                        className="theme-toggle"
                        onClick={handleToggleThemeMode}
                    />
                </IconButton>
            ) : (
                    <IconButton variant="ghost" style={{ alignSelf: 'center', marginTop: "1px" }}>
                    <Moon
                        size={22}
                        className="theme-toggle"
                        onClick={handleToggleThemeMode}
                    />
                </IconButton>
            )}
        </>
    );
}

export default HeaderThemeToggle;