import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import "../index.css";

const SignUp = ({ isOpen, toggleModal, initialTab }) => {
  const { toggleLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(initialTab);
  const [formData, setFormData] = useState({
    name: "",
    consumingProfile: "",
    state: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [states, setStates] = useState([]);
  const [formDataExists, setFormDataExists] = useState(false);
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setActiveTab(initialTab);
      const storedFormData = localStorage.getItem("formData");
      if (storedFormData) {
        const parsedFormData = JSON.parse(storedFormData);
        setFormDataExists(true);
        setFormData((prevFormData) => ({
          ...prevFormData,
          consumingProfile: parsedFormData.consumingProfile,
          state: parsedFormData.state,
        }));
      } else {
        setFormDataExists(false);
      }
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

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevLoginData) => ({
      ...prevLoginData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.name.length < 2) {
      newErrors.name = "O nome deve ter no mínimo 2 caracteres.";
    }
    if (formData.consumingProfile === "") {
      newErrors.consumingProfile = "Selecione seu perfil de consumo.";
    }
    if (formData.state === "") {
      newErrors.state = "Selecione seu estado.";
    }
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      newErrors.email = "Email inválido.";
    }
    if (formData.password.length < 3) {
      newErrors.password = "A senha deve ter no mínimo 3 caracteres.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
      const userId = `user${Object.keys(usersData).length + 1}`;
      usersData[userId] = formData;
      localStorage.setItem("usersData", JSON.stringify(usersData));
      setFormDataExists(true);
      toggleLogin();
      navigate("/greenflow");
      toggleModal();
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const usersData = JSON.parse(localStorage.getItem("usersData")) || {};
    const user = Object.values(usersData).find(
      (user) => user.email === loginData.email && user.password === loginData.password
    );
    if (user) {
      setLoginError("");
      toggleLogin();
      navigate("/greenflow");
      toggleModal();
    } else {
      setLoginError("Email ou senha incorretos.");
    }
  };

  return (
    <div>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-white p-8 rounded-xl shadow-xl w-11/12 max-w-md">
            <span
              className="text-black text-2xl cursor-pointer float-right relative -top-6 -right-5"
              onClick={toggleModal}
            >
              &times;
            </span>
            <div className="flex justify-center mb-4 gap-3">
              <button
                className={`w-[45%] text-xs sm:text-base px-4 py-2 rounded-s-lg ${activeTab === "login" ? "scale-110" : "bg-gray-200 text-black"}`}
                style={{
                  boxShadow: activeTab === "login" ? "-4px 4px 4px rgba(133, 210, 44)" : "-4px 4px 4px rgba(0,0,0,0.3)",
                }}
                onClick={() => handleTabChange("login")}
              >
                Login
              </button>
              <button
                className={`w-[45%] text-xs sm:text-base px-4 py-2 rounded-e-lg ${activeTab === "signup" ? "scale-110" : "bg-gray-200 text-black"}`}
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
                <form onSubmit={handleLoginSubmit}>
                  <p className="text-sm text-gray text-center">
                    Não use cadastros reais.
                  </p>
                  <input
                    className=" p-2 mb-4 w-full"
                    style={{ boxShadow: "-4px 4px 4px #85D22C" }}
                    type="email"
                    aria-label="Email"
                    placeholder="Email / greenflow@org.com.br"
                    name="email"
                    value={loginData.email}
                    onChange={handleLoginChange}
                    required
                  />
                  <input
                    className=" p-2 mb-4 w-full"
                    style={{ boxShadow: "-4px 4px 4px #85D22C" }}
                    type="password"
                    required
                    aria-label="password"
                    placeholder="Senha / green!flow1"
                    name="password"
                    value={loginData.password}
                    onChange={handleLoginChange}
                  />
                  {loginError && <p className="text-red-500 text-xs">{loginError}</p>}
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
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  {!formDataExists && (
                    <>
                      <select
                        aria-label="Selecione seu perfil de consumo"
                        className={`w-full p-2 mb-1 ${formData.consumingProfile === "" ? "text-gray" : "text-black"}`}
                        style={{ boxShadow: "4px 4px 4px #3C8500" }}
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
                      {errors.consumingProfile && <p className="text-red-500 text-xs">{errors.consumingProfile}</p>}
                      <select
                        aria-label="Selecione um estado"
                        name="state"
                        className={`${formData.state === "" ? "text-gray" : "text-black"}`}
                        style={{ boxShadow: "4px 4px 4px #3C8500" }}
                        value={formData.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="" className="text-gray">
                          Selecione um estado
                        </option>
                        {states.map((state) => (
                          <option key={state.id} value={state.nome} className="text-black">
                            {state.nome}
                          </option>
                        ))}
                      </select>
                      {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                    </>
                  )}
                  <input
                    aria-label="Email"
                    placeholder="Email / greenflow@org.com.br"
                    className=" p-2 mb-1 w-full"
                    style={{ boxShadow: "4px 4px 4px #3C8500" }}
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  <input
                    aria-label="password"
                    placeholder="Senha / green!flow1"
                    style={{ boxShadow: "4px 4px 4px #3C8500" }}
                    className=" p-2 mb-1 w-full"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  <button
                    className="bg-mid-green text-white p-2 rounded-2xl w-full hover:bg-dark-green duration-300"
                    style={{ boxShadow: "none" }}
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