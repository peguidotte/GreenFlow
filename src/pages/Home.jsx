import EnergyForm from "../components/EnergyForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/greenflow");
    }
  }, [isLoggedIn, navigate]);

  function SignButton() {
    return (
      <button
        onClick={() => {
          localStorage.setItem("loggedIn", "true");
          navigate("/greenflow");
        }}
        className="bg-mid-green text-white font-bold px-4 py-2 rounded-lg duration-1000 hover:bg-white hover:text-mid-green border-2 border-mid-green max-w-1/4"
      >
        Realizar Cadastro
      </button>
    );
  }

  return (
    <>
      <section id="hero" className="m-2 flex-col gap-3 flex">
        <div className="w-3/4">
          <h1 className="text-xl font-bold text-left">
            Seu dinheiro e a saúde do mundo estão fugindo pela rede elétrica.
          </h1>
          <p className="text-sm font-normal text-left">
            Descubra através da GreenFlow como está seu consumo de energia e
            quais soluções você pode procurar para melhorar.
          </p>
        </div>
        <SignButton />
      </section>
      <EnergyForm />
      <div className="card bg-gray-100 p-6 rounded-lg shadow-md mt-8">
        <p>Aqui ficará os cards de dica</p>
      </div>
      <div className="card bg-gray-100 p-6 rounded-lg shadow-md mt-4">
        <p>Realizar Cadastro</p>
      </div>
    </>
  );
}

export default Home;
