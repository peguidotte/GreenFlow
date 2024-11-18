
import EnergyForm from '../components/EnergyForm';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('loggedIn') === 'true';

  useEffect(() => {
    if (isLoggedIn) {
      navigate('/greenflow');
    }
  }, [isLoggedIn, navigate]);

  return (
    <div>
      <h1>Bem-vindo à Green Flow</h1>
      <div className="p-4">
            <section className="hero bg-blue-500 text-white p-8 rounded-lg shadow-lg mb-8">
                <h1 className="text-3xl font-bold mb-4">Você está perdendo muito dinheiro</h1>
                <button className="bg-white text-blue-500 font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-200">
                    Saiba Mais
                </button>
            </section>
            <EnergyForm />
            <div className="card bg-gray-100 p-6 rounded-lg shadow-md mt-8">
                <p>Aqui ficará os cards de dica</p>
            </div>
            <div className="card bg-gray-100 p-6 rounded-lg shadow-md mt-4">
                <p>Realizar Cadastro</p>
            </div>
        </div>
    </div>
  );
}

export default Home;

