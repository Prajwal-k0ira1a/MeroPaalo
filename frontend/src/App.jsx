import LandingPage from "./Landing Page/LandingPage";
import DashboardPage from "./StaffAdmin/DashboardPage";
import AdminConsolePage from "./AdminConsole/AdminConsolePage";
import { Login } from "./Authentication/Login";
import { SignUp } from "./Authentication/SignUp";
import { ForgotPassword } from "./Authentication/ForgotPassword";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/staff-admin" element={<DashboardPage />} />
      <Route path="/admin" element={<AdminConsolePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default App;
