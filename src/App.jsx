import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./index.css";

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="mt-16">
        <Outlet />
      </main>
      <footer className="mt-16">
        <Footer />
      </footer>
    </div>
  );
}

export default App;
