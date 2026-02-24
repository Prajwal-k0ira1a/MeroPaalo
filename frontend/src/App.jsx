import LandingPage from './Landing Page/LandingPage';
import DashboardPage from './StaffAdmin/DashboardPage';
import { Login } from "./Authentication/Login";
import { SignUp } from "./Authentication/SignUp";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/staff-admin" element={<DashboardPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
    </Routes> 
  );
}

export default App;
