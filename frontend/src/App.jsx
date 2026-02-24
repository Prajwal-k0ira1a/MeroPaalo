import LandingPage from './Landing Page/LandingPage';
import DashboardPage from './StaffAdmin/DashboardPage';
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/staff-admin" element={<DashboardPage />} />
    </Routes> 
  );
}

export default App;
