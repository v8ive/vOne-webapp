import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import HomePage from "./pages/home"
import SignInPage from "./pages/signin"
import ProfilePage from "./pages/profile"
import './App.css';
import useAuthStore from "./store/Auth";
import { useEffect } from "react";

function App() {
    const { initialize } = useAuthStore();

    useEffect(() => {
        initialize();
    }, []);

  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
              <Route path="/profile" element={<ProfilePage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
