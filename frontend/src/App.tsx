import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './features/landing/LandingPage';
import LoginScreen from './features/auth/LoginScreen';
import RegisterScreen from './features/auth/RegisterScreen';
import DashboardScreen from './features/dashboard/DashboardScreen';
import './index.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginScreen />} />
        <Route path="/register" element={<RegisterScreen />} />
        <Route path="/dashboard" element={<DashboardScreen />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
