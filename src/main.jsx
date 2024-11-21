import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import Greenflow from "./pages/Greenflow";
import Cadastro from "./components/SignUp";
import { AuthProvider } from "./context/AuthProvider";
import { UserProvider } from "./context/UserProvider";
import GreenflowHome from "./pages/GreenflowPages/GreenflowHome";
import GreenflowDashboards from "./pages/GreenflowPages/GreenflowDashboards";
import GreenflowDicas from "./pages/GreenflowPages/GreenflowDicas";
import GreenflowTracker from "./pages/GreenflowPages/GreenflowTracker";
import GreenflowAccount from "./pages/GreenflowPages/GreenflowAccount";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="cadastro" element={<Cadastro />} />
            <Route path="greenflow" element={<Greenflow />}>
              <Route index element={<GreenflowHome />} />
              <Route path="home" element={<GreenflowHome />} />
              <Route path="dashboards" element={<GreenflowDashboards />} />
              <Route path="dicas" element={<GreenflowDicas />} />
              <Route path="tracker" element={<GreenflowTracker />} />
              <Route path="account" element={<GreenflowAccount />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </AuthProvider>
);
