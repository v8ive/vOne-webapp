import { ReactNode, useEffect, useState } from "react";
import { ColorSchemeContext } from "../context/CustomThemeContext";
import { ThemeMode, ThemeName } from "../types/Theme";
import { useAuth } from "../context/AuthContext";
import { supabase } from "../utils/supabase";

interface ProviderParams {
    children: ReactNode;
}

export const CustomThemeProvider = ({ children }: ProviderParams) => {
    const { user } = useAuth();

    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");
    const [mode, setMode] = useState<ThemeMode>(
        (localStorage.getItem("themeMode") as ThemeMode) || "dark"
    );
    const [themeName, setThemeName] = useState<ThemeName>(
        (localStorage.getItem("themeName") as ThemeName) || "iris"
    );

    useEffect(() => {
        const changeModePreference = () => {
            const theme_mode = prefersDarkScheme.matches ? "dark" : "light";
            setMode(theme_mode);
        };

        // Set initial theme mode
        changeModePreference();

        prefersDarkScheme.addEventListener("change", changeModePreference);

        return () => {
            prefersDarkScheme.removeEventListener("change", changeModePreference);
        };
    }, []); // Empty dependency array ensures this runs only once

    useEffect(() => {
        // Store theme preferences in localStorage
        localStorage.setItem("themeMode", mode);
        localStorage.setItem("themeName", themeName);

        // Update theme in Supabase if user is logged in
        if (user) {
            supabase
                .from("theme")
                .upsert({ theme_mode: mode, theme_name: themeName })
                .eq("user_id", user.id)
                .then((response) => {
                    if (response.error) {
                        console.error(response.error);
                    }
                });
        }
    }, [mode, themeName, user]);

    useEffect(() => {
        // Fetch theme from Supabase when user logs in
        if (user) {
            supabase
                .from("theme")
                .select()
                .eq("user_id", user.id)
                .then(({ data, error }) => {
                    if (error) {
                        console.error(error);
                    } else if (data?.[0]) {
                        setMode(data[0].theme_mode);
                        setThemeName(data[0].theme_name);
                    }
                });
        }
    }, [user]);

    return (
        <ColorSchemeContext.Provider
            value={{ mode, setMode, themeName, setThemeName }}
        >
            {children}
        </ColorSchemeContext.Provider>
    );
};