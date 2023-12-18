import Layout from "./layouts/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guidelines from './pages/Guidelines/Guidelines'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Team from "./pages/Team/Team";
import Accel from "./pages/Accel/Accel";
import Clients from "./pages/Clients/Clients";



function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/accel" element={<Accel />} />
          <Route path="/clients" element={<Clients />} />
          <Route path='/guidelines' element={<Guidelines />} />
          <Route path='/policy' element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
