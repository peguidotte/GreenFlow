import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Aos from "aos";
import EnergyForm from "../components/EnergyForm";
import FeedbackCards from "../components/FeedbackCards";
import "aos/dist/aos.css";
import "../pages/Home.css";

function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  const [formSubmitted, setFormSubmitted] = useState(false);

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
      <div className="banner"></div>
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
      <div className="banner2">
        <section id="form" className="flex items-center flex-col justify-center py-32">
          <h2 data-aos="fade-up" className="px-4 sm:px-8 md:px-12 lg:px-32 xl:px-56 text-white font-bold text-xl text-center sm:text-4xl">DESCUBRA QUAL O NÍVEL DO 
          SEU CONSUMO DE ENERGIA</h2>
          <p data-aos="fade-up" className="text-white font-normal text-sm px-6 sm:px-10 md:px-16 lg:px-52 xl:px-60 text-balance text-center mb-4">Observações: Seu perfil de consumo serve para gerarmos uma média justa baseado em seu consumo real,
          seu consumo em Kwh pode ser encontrado na sua conta de luz, caso seu perfil seja residencial insira o número de habitantes para gerarmos uma média por pessoa,
          seu estado é pedido somente para medições de acordo com a tarifa energética do estado.</p>
          <EnergyForm setFormSubmitted={setFormSubmitted} />
        </section>
      </div>
      <div
        className="flex flex-col items-center justify-center"
      >
        <FeedbackCards formSubmitted={formSubmitted} />
      </div>
      <div className="flex justify-center mt-10" data-aos="fade-up">
          <SignButton />
      </div>
    </>
  );
}

export default Home;