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
import { useCustomTheme } from "./context/CustomThemeContext";
import { Vortex } from "./components/ui/vortex";

function App() {
    const { initialize } = useAuthStore();
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

    useEffect(() => {
        initialize();
    }, []);

    const colorHues = {
        'gray': 0,
        'gold': 40,
        'bronze': 30,
        'brown': 20,
        'yellow': 50,
        'amber': 60,
        'orange': 30,
        'tomato': 10,
        'red': 5,
        'ruby': 6,
        'crimson': 320,
        'pink': 310,
        'plum': 300,
        'purple': 280,
        'violet': 270,
        'iris': 260,
        'indigo': 250,
        'blue': 240,
        'cyan': 200,
        'teal': 180,
        'jade': 160,
        'green': 140,
        'grass': 120,
        'lime': 100,
        'mint': 190,
        'sky': 230
    }

    return (
        <Theme
            hasBackground
            appearance={mode}
            accentColor={themeName}
            panelBackground='translucent'
        >
            <Vortex
                backgroundColor={mode === 'dark' ? 'rgba(0, 0, 0, 0.5)' : 'transparent'}
                rangeY={800}
                particleCount={10}
                baseHue={colorHues[themeName]}
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
