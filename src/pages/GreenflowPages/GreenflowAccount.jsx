
import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { AuthContext } from "../../context/AuthContext"; 
import { useNavigate } from "react-router-dom";

function GreenflowAccount() {
  const { userData, setUserData } = useContext(UserContext);
  const { toggleLogin } = useContext(AuthContext);
  const navigate = useNavigate();

  const [editData, setEditData] = useState({
    name: "",
  });

  useEffect(() => {
    if (userData) {
      setEditData({
        name: userData.name || "",
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

    const usersData = JSON.parse(localStorage.getItem("usersData"));
    if (usersData) {
      const userId = Object.keys(usersData)[0];
      usersData[userId] = { ...usersData[userId], ...editData };
      localStorage.setItem("usersData", JSON.stringify(usersData));
      setUserData({ ...userData, ...editData });
      alert("Informações atualizadas com sucesso!");
    } else {
      console.error("Nenhum dado de usuário encontrado no localStorage.");
    }
  };

  const handleLogout = () => {
    toggleLogin(); 
    setUserData(null); 
    localStorage.clear();
    navigate("/"); 
  };


  if (!userData) {
    return (
      <div className="flex flex-col items-center text-white p-6">
        <h2 className="text-2xl font-bold mb-16">Conta</h2>
        <p className="text-black">Caso as informações não estejam aparecendo, recarregue a página.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-6">
      <h2 className="text-2xl font-bold mb-4">Conta</h2>
      <div className="w-full max-w-md bg-white p-6 rounded shadow-md">
        <form>

          <label className="block mb-4">
            <span className="text-gray-700">Nome:</span>
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </label>

          <div className>
            <span className="text-gray-700">Perfil de Consumo:</span>
            <p className="mt-1 block w-full text-gray-700">{userData.consumingProfile}</p>
          </div>

          <div >
            <span className="text-gray-700">Estado:</span>
            <p className="mt-1 block w-full text-gray-700">{userData.state}</p>
            </div>

          <div className="mb-4">
            <span className="text-gray-700">Email:</span>
            <p className="mt-1 block w-full text-gray-700">{userData.email}</p>
          </div>
          
          <button
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-blue-300"
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