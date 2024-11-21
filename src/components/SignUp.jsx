import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "../index.css";

const SignUp = ({ isOpen, toggleModal, initialTab }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    consumingProfile: "",
    state: "",
  });
  const [states, setStates] = useState([]);
  const [formDataExists, setFormDataExists] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
    }
  }, [isOpen, initialTab]);

  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
        const data = await response.json();
        setStates(data.sort((a, b) => a.nome.localeCompare(b.nome)));
      } catch (error) {
        console.error("Erro ao buscar estados:", error);
      }
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const storedFormData = localStorage.getItem("formData");
    if (storedFormData) {
      setFormDataExists(true);
    }
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Salvar os dados no localStorage
    localStorage.setItem("formData", JSON.stringify(formData));
    setFormDataExists(true);
    toggleModal();
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-11/12 max-w-md">
            <span
              className="text-black text-2xl cursor-pointer float-right"
              onClick={toggleModal}
            >
              &times;
            </span>
            <div className="flex justify-center mb-4 gap-3">
              <button
                className={`w-2/5 px-4 py-2 rounded-s-lg ${activeTab === "login" ? "scale-110" : "bg-gray-200 text-black"}`}
                style={{
                  boxShadow: activeTab === "login" ? "-4px 4px 4px rgba(133, 210, 44)" : "-4px 4px 4px rgba(0,0,0,0.3)",
                }}
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
              <button
                className={`w-2/5 px-4 py-2 rounded-e-lg ${activeTab === "signup" ? "scale-110" : "bg-gray-200 text-black"}`}
                style={{
                  boxShadow: activeTab === "signup" ? "4px 4px 4px rgba(60, 133, 44)" : "4px 4px 4px rgba(0,0,0,0.3)",
                }}
                onClick={() => handleTabChange("signup")}
              >
                Cadastrar-se
              </button>
            </div>
            {activeTab === "login" && (
              <div className="form-container mb-4">
                <form>
                  <p className="text-sm text-gray text-center">
                    Não use cadastros reais.
                  </p>
                  <input
                    className=" p-2 mb-4 w-full"
                    style={{ boxShadow: "-4px 4px 4px #85D22C" }}
                    type="email"
                    aria-label="Email"
                    placeholder="Email / greenflow@org.com.br"
                    required
                  />
                  <input
                    className=" p-2 mb-4 w-full"
                    style={{ boxShadow: "-4px 4px 4px #85D22C" }}
                    type="password"
                    required
                    aria-label="password"
                    placeholder="Senha / green!flow1"
                  />
                  <button
                    className="bg-dark-green text-white p-2 rounded-2xl w-full hover:bg-mid-green duration-300"
                    style={{ boxShadow: "none" }}
                    type="submit"
                  >
                    Login
                  </button>
                </form>
              </div>
            )}
            {activeTab === "signup" && (
              <div className="form-container">
                <form onSubmit={handleSubmit}>
                  <p className="text-sm text-gray text-center">
                    Não use cadastros reais.
                  </p>
                  <input
                    className="p-2 mb-1 w-full"
                    style={{ boxShadow: "4px 4px 4px #3C8500" }}
                    type="text"
                    aria-label="Name"
                    placeholder="Nome / Green Flow"
                    required
                  />
                  <input
                    aria-label="Email"
                    placeholder="Email / greenflow@org.com.br"
                    className=" p-2 mb-1 w-full"
                    style={{ boxShadow: "4px 4px 4px #3C8500" }}
                    type="email"
                    required
                  />
                  <input
                    aria-label="password"
                    placeholder="Senha / green!flow1"
                    style={{ boxShadow: "4px 4px 4px #3C8500" }}
                    className=" p-2 mb-1 w-full"
                    type="password"
                    required
                  />
                  {!formDataExists && (
                    <>
                      <label className="block mb-2">Perfil de Consumo:</label>
                      <select
                        aria-label="Selecione seu perfil de consumo"
                        className={`w-full p-2 mb-4 ${formData.consumingProfile === "" ? "text-gray" : "text-black"}`}
                        name="consumingProfile"
                        value={formData.consumingProfile}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="text-gray">
                          Selecione seu perfil de consumo
                        </option>
                        <option value="comercial" className="text-black">
                          Comercial
                        </option>
                        <option value="industrial" className="text-black">
                          Industrial
                        </option>
                        <option value="residencialComum" className="text-black">
                          Residencial comum
                        </option>
                        <option value="residencialBaixaRenda" className="text-black">
                          Residencial baixa renda (com desconto)
                        </option>
                      </select>
                      <label className="block mb-2">Estado:</label>
                      <select
                        aria-label="Selecione seu estado"
                        className="w-full p-2 mb-4"
                        name="state"
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="text-gray">
                          Selecione seu estado
                        </option>
                        {states.map((state) => (
                          <option key={state.id} value={state.nome} className="text-black">
                            {state.nome}
                          </option>
                        ))}
                      </select>
                    </>
                  )}
                  <button
                    className="bg-mid-green text-white p-2 rounded-2xl w-full hover:bg-dark-green duration-300"
                    style={{boxShadow: "none"}}
                    type="submit"
                  >
                    Sign Up
                  </button>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

SignUp.propTypes = {
  isOpen: PropTypes.bool,
  toggleModal: PropTypes.func,
  initialTab: PropTypes.string,
};

export default SignUp;