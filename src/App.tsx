import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/header';
import HomePage from "./pages/home"
import SignInPage from "./pages/signin"
import './App.css';

function App() {

  return (
      <BrowserRouter>
          <Header />
          <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/signin" element={<SignInPage />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
