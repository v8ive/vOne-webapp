import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import HomePage from "./pages/home"
import SignInPage from "./pages/signin"
import ProfilePage from "./pages/profile"

import { Theme } from "@radix-ui/themes";

import { useCustomTheme } from "./context/CustomThemeContext";

import "@radix-ui/themes/styles.css";
import './App.css';

function App() {
    const { mode, themeName } = useCustomTheme();

    useEffect(() => {
        if (typeof window !== "undefined") {
            // Check if running in the browser
            const metaThemeColor = document.querySelector(
                'meta[name="theme-color"]'
            );
            if (metaThemeColor) {
                metaThemeColor.setAttribute("content", (mode === 'dark' ? '#000000' : '#ffffff'));
            }

            const appleMobileWebAppStatusBarStyle = document.querySelector(
                'meta[name="apple-mobile-web-app-status-bar-style"]'
            );
            if (appleMobileWebAppStatusBarStyle) {
                appleMobileWebAppStatusBarStyle.setAttribute("content", (mode === 'dark' ? 'dark-content' : 'light-content'));
            }
        }
    }, []);

    return (
        <Theme
            hasBackground
            appearance={mode}
            accentColor={themeName}
            panelBackground='translucent'
        >
            <Header />

            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/profile" element={<ProfilePage />} />
            </Routes>
        </Theme>
    )
}

export default App
