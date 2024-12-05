import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import HomePage from "./pages/home"
import SignInPage from "./pages/signin"
import ProfilePage from "./pages/profile"
import MiningPage from "./pages/mining"
import './App.css';
import useAuthStore from "./store/Auth";
import { useEffect } from "react";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";


function App() {
    const { initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

    return (
        <BrowserRouter>
            <Theme appearance="dark" >
                <Header />
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/signin" element={<SignInPage />} />
                    <Route path="/profile" element={<ProfilePage />} />
                    <Route path="/mining" element={<MiningPage />} />
                </Routes>
            </Theme>
        </BrowserRouter>
    )
}

export default App
