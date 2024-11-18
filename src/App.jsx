import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import './index.css';

function App() {
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';
  const location = useLocation();
  const showFooter = !isLoggedIn && location.pathname !== '/greenflow';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="mt-16 flex-grow">
        <Outlet />
      </div>
      {showFooter && <Footer />}
    </div>
  );
}

export default App;
