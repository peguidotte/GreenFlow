import { useEffect, useContext } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { UserContext } from '../context/UserContext';
import EnergyForm from '../components/EnergyForm';

function Greenflow() {
  const navigate = useNavigate();
  const { isLoggedIn } = useContext(AuthContext);
  const { formData } = useContext(UserContext);
  const { consumptionData } = useContext(UserContext);


  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
    <div className="banner-head max-h-48 sm:max-h-52"></div>
    <div className="p-8 bg-gray-100 min-h-screen">
      {!formData && !consumptionData && <EnergyForm />}
      <Outlet />
    </div>
    </>
  );
}

export default Greenflow;