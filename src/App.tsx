import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import Header from './components/header';
import HomePage from "./pages/home"
import SignInPage from "./pages/signin"
import ProfilePage from "./pages/profile"
import useAuthStore from "./store/Auth";

import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

import './App.css';
import { useColorScheme } from "./context/ColorSchemeContext";
import { Vortex } from "./components/ui/vortex";

function App() {
    const { initialize } = useAuthStore();
    const { mode } = useColorScheme();

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

    useEffect(() => {
        initialize();
    }, []);

    return (
        <Theme
            hasBackground
            appearance={mode}
            accentColor='violet'
            panelBackground='translucent'
        >
            <Vortex
                backgroundColor={mode === "dark" ? "black" : "transparent"}
                rangeY={800}
                particleCount={25}
                baseHue={200}
                baseSpeed={0.1}
            />
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
