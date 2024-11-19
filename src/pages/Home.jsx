import EnergyForm from "../components/EnergyForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import "aos/dist/aos.css";
import "../pages/Home.css";


function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";

  useEffect(() => {
    Aos.init({ duration: 1000 });
  }, []);

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
        className="bg-mid-green text-white font-bold px-10 py-2 rounded-lg duration-700 border-mid-green border-2 hover:text-lg hover:bg-white hover:text-mid-green 
        sm:text-2xl sm:hover:text-3xl lg:text-3xl lg:hover:text-4xl"
      >
        Realizar Cadastro
      </button>
    );
  }

  return (
    <>
    <div className="banner">
        </div>
      <section
        id="hero"
        className="m-2 flex-col gap-12 flex sm:mx-20 sm:mt-10 lg:mx-32 lg:gap-20 text-white"
      >
        <div className="w-11/12 sm:w-4/5">
          <h1
            className="text-xl font-bold text-left sm:text-4xl lg:text-5xl"
            data-aos="zoom-in"
          >
            Seu dinheiro e a saúde do mundo estão fugindo pela rede elétrica.
          </h1>
          <p
            className="text-sm font-normal text-left mt-2 sm:text-xl lg:text-2xl"
            data-aos="zoom-in"
          >
            Descubra através da GreenFlow como está seu consumo de energia e
            quais soluções para melhorar.
          </p>
        </div>
        <div className="flex justify-center" data-aos="fade-up">
          <SignButton />
        </div>
      </section>
      <div className="flex justify-center mt-44">
      <EnergyForm />
      </div>
      <div
        className="card bg-gray-100 p-6 rounded-lg shadow-md mt-8"
        data-aos="fade-up"
      >
        <p>Aqui ficará os cards de dica</p>
      </div>
      <div className="card bg-gray-100 p-6 rounded-lg shadow-md mt-4">
        <p>Realizar Cadastro</p>
      </div>
    </>
  );
}

export default Home;
