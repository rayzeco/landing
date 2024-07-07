import Layout from "./layouts/Layout/Layout";
import LandingPage from "./pages/LandingPage/LandingPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RenderInvoicePage from "./pages/RenderInvoicePage/RenderInvoicePage";
import InvoicePage from "./pages/InvoicePage/InvoicePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OGLandingPage from "./pages/OGLanding/OGLandingPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Guidelines from './pages/Guidelines/Guidelines'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import NotFound from "./pages/NotFound/NotFound";
import Dashboard from "./pages/Dashboard/Dashboard";
import Team from "./pages/Team/Team";
import Accel from "./pages/Accel/Accel";
import Clients from "./pages/Clients/Clients";
import Story1 from "./pages/Clients/Story1";
import Story2 from "./pages/Clients/Story2";
import Story3 from "./pages/Clients/Story3";
import Story4 from "./pages/Clients/Story4";
import Story5 from "./pages/Clients/Story5";
import Story6 from "./pages/Clients/Story6";


function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/render_invoice/:id_str" element={<RenderInvoicePage />} />
          <Route path="/invoice" element={<InvoicePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/rayze_og" element={<OGLandingPage />} />
          <Route path="/team" element={<Team />} />
          <Route path="/accel" element={<Accel />} />
          <Route path="/clients" element={<Clients />} />
          <Route path='/guidelines' element={<Guidelines />} />
          <Route path='/policy' element={<PrivacyPolicy />} />
          <Route path='/story1' element={<Story1 />} />
          <Route path='/story2' element={<Story2 />} />
          <Route path='/story3' element={<Story3 />} />
          <Route path='/story4' element={<Story4 />} />
          <Route path='/story5' element={<Story5 />} />
          <Route path='/story6' element={<Story6 />} />


          <Route path="*" element={<NotFound />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
