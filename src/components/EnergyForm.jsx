import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./EnergyForm.css";

const EnergyForm = ({ setFormSubmitted }) => {
  const [formData, setFormData] = useState({
    consumingProfile: "",
    peopleLiving: "",
    energyConsumption: "",
    state: "",
  });

  const [states, setStates] = useState([]);

  useEffect(() => {
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
      .then((response) => response.json())
      .then((data) => {
        const sortedStates = data.sort((a, b) => a.nome.localeCompare(b.nome));
        setStates(sortedStates);
      })
      .catch((error) => console.error("Erro ao buscar estados:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "peopleLiving" && value < 0) {
      return;
    }
    if (name === "energyConsumption" && value < 0) {
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === "-" || e.key === "e" || e.key === "+") {
      e.preventDefault(); // Impede a entrada de caracteres que resultariam em valores negativos
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.consumingProfile ||
      !formData.energyConsumption ||
      !formData.state ||
      ((formData.consumingProfile === "residencialComum" ||
        formData.consumingProfile === "residencialBaixaRenda") &&
        !formData.peopleLiving)
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }

    const dataToSave = {
      ...formData,
      peopleLiving: formData.peopleLiving ? Number(formData.peopleLiving) : null,
      energyConsumption: Number(formData.energyConsumption),
    };

    localStorage.setItem("formData", JSON.stringify(dataToSave));
    alert("Informações salvas com sucesso!");
    setFormSubmitted((prev) => !prev); // Toggle the formSubmitted state to trigger re-fetch
  };

  return (
    <form onSubmit={handleSubmit} className="text-xs sm:text-base">
      <div>
        <select
          aria-label="Selecione seu perfil de consumo"
          className={`${
            formData.consumingProfile === "" ? "text-gray" : "text-black"
          }`}
          name="consumingProfile"
          value={formData.consumingProfile}
          onChange={handleChange}
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
      </div>
      <div
        className={` ${
          formData.consumingProfile === "residencialComum" ||
          formData.consumingProfile === "residencialBaixaRenda"
            ? "flex gap-3 items-center"
            : ""
        }`}
      >
        {(formData.consumingProfile === "residencialComum" ||
          formData.consumingProfile === "residencialBaixaRenda") && (
          <div className="relative">
            <input
              aria-label="Digite o número de residentes"
              className="w-full people"
              type="number"
              name="peopleLiving"
              placeholder="Residentes"
              value={formData.peopleLiving}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              Moradores
            </span>
          </div>
        )}
        <div className="relative">
          <input
            aria-label="Digite seu consumo de energia em KWh"
            placeholder="Consumo em KWh"
            type="number"
            name="energyConsumption"
            value={formData.energyConsumption}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className="w-full pr-10 kwh"
          />
          <span className="absolute inset-y-0 right-0 flex items-center pr-3">
            KWh
          </span>
        </div>
      </div>
      <div>
        <select
          aria-label="Selecione um estado"
          name="state"
          className={`${formData.state === "" ? "text-gray" : "text-black"}`}
          value={formData.state}
          onChange={handleChange}
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
      </div>
      <div className="flex items-center justify-center">
        <button
          type="submit"
          className="mt-3 bg-white py-1 px-7 rounded-[20px] font-bold text-dark-green duration-700
          border-2 border-white hover:bg-dark-green hover:text-white hover:border-dark-green
          text-base sm:text-lg md:text-xl lg:text-2xl"
        >
          Salvar
        </button>
      </div>
    </form>
  );
};

EnergyForm.propTypes = {
  setFormSubmitted: PropTypes.func.isRequired,
};

export default EnergyForm;