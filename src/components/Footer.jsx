import { useContext } from "react";
import { FaGithubSquare, FaLinkedin } from "react-icons/fa";
import Greenflow from "../assets/logo_green_flow_white.svg";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

const Footer = () => {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <>
      <div className="banner-foot">
        <footer className="pt-[10vh] text-white py-4 flex flex-col justify-center gap-12 px-[10vw] lg:pt-[25vh] lg:gap-20">
          {!isLoggedIn && (
            <div className="text-center gap-4 flex flex-col items-center">
              <h4 className="text-xl font-bold sm:text-3xl">Sobre Nós</h4>
              <p className="text-xs font-normal max-w-[80vw] sm:text-base">
                Bem-vindo à Plataforma Sustentável de Energia Renovável! Somos uma
                equipe comprometida com a promoção de práticas sustentáveis e a
                disseminação do uso de energia renovável em prol de um futuro mais
                limpo e eficiente. Fundada com a missão de transformar o modo como
                as pessoas e empresas consomem e gerenciam energia, nossa plataforma
                foi desenvolvida para empoderar nossos usuários com ferramentas e
                informações que facilitam a transição para um consumo mais
                consciente e ecológico.
              </p>
            </div>
          )}
          <div className="flex justify-between items-center">
            <div>
              <a
                href="https://www.github.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaGithubSquare className="text-3xl  hover:scale-105" />
              </a>
            </div>
            <div className="text-center">
              <img src={Greenflow} alt="Logo da green flow" className="w-32" />
            </div>
            <div>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaLinkedin className="text-3xl  hover:scale-105" />
              </a>
            </div>
          </div>
          <div className="text-center">
            <p className="text-xs font-normal">
              © 2024 by GreenFlow. Todos os direitos reservados.
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default Footer;