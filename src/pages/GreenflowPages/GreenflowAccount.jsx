import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

function GreenflowAccount() {
  const { userData, setUserData, setLoggedIn } = useContext(UserContext);
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    name: "",
    consumingProfile: "",
    state: "",
  });

  // Atualizar editData quando userData mudar
  useEffect(() => {
    if (userData) {
      setEditData({
        name: userData.name || "",
        consumingProfile: userData.consumingProfile || "",
        state: userData.state || "",
      });
    }
  }, [userData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    if (!userData) return;

    // Atualizar o localStorage
    const usersData = JSON.parse(localStorage.getItem("usersData"));
    if (usersData) {
      const userId = Object.keys(usersData)[0];
      usersData[userId] = { ...usersData[userId], ...editData };
      localStorage.setItem("usersData", JSON.stringify(usersData));
      // Atualizar o contexto
      setUserData({ ...userData, ...editData });
      alert("Informações atualizadas com sucesso!");
    } else {
      console.error("Nenhum dado de usuário encontrado no localStorage.");
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
    navigate("/");
  };

  // Se userData não estiver disponível, exibir um indicador de carregamento
  if (!userData) {
    return (
      <div className="flex flex-col items-center p-6">
        <h2 className="text-2xl font-bold mb-4">Conta</h2>
        <p>Carregando dados...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <div className="w-full max-w-md bg-white shadow-lg shadow-mid-green p-6 rounded-3xl">
        <form>
          {/* Nome */}
          <label className="block mb-4">
            <span className="text-gray-700">Nome:</span>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-2xl shadow-sm p-2 focus:ring-mid-green focus:border-mid-green"
            />
          </label>
          
          {/* Perfil de Consumo */}
          <label className="block mb-4">
            <span className="text-gray-700">Perfil de Consumo:</span>
            <p className="mt-1 block w-full text-gray-700 shadow-md shadow-mid-green p-3 rounded-2xl ">{userData.consumingProfile}</p>
          </label>

          <div >
            <span className="text-gray-700">Estado:</span>
            <p className="mt-1 block w-full text-gray-700 shadow-md shadow-mid-green p-3 rounded-2xl ">{userData.state}</p>
            </div>

          <div className="mb-4">
            <span className="text-gray-700">Email:</span>
            <p className="mt-1 block w-full text-gray-700 shadow-md shadow-mid-green p-3 rounded-2xl ">{userData.email}</p>
          </div>
          
          {/* Botão para salvar alterações */}
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-mid-green hover:bg-dark-green text-white font-bold py-2 px-4 rounded-2xl disabled:bg-blue-300"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
      
      {/* Botão Sair */}
      <button
        onClick={handleLogout}
        className="mt-8 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Sair
      </button>
    </div>
  );
}

export default GreenflowAccount;