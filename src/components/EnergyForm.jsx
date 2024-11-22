import { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../context/UserContext";
import "./EnergyForm.css";

const EnergyForm = ({
  setFormSubmitted,
  showConsumingProfile = true,
  showPeopleLiving = true,
  showEnergyConsumption = true,
  showState = true,
}) => {
  const { formData, setFormData, setConsumptionData } = useContext(UserContext);

  const [formDataLocal, setFormDataLocal] = useState({
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

  useEffect(() => {
    if (formData) {
      setFormDataLocal({
        consumingProfile: formData.consumingProfile || "",
        peopleLiving: formData.peopleLiving || "",
        energyConsumption: formData.energyConsumption || "",
        state: formData.state || "",
      });
    }
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if ((name === "peopleLiving" || name === "energyConsumption") && value < 0) {
      return;
    }
    setFormDataLocal({
      ...formDataLocal,
      [name]: value,
    });
  };

  const handleKeyDown = (e) => {
    if (["-", "e", "+"].includes(e.key)) {
      e.preventDefault();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const dataToSave = {
      ...formDataLocal,
      peopleLiving: formDataLocal.peopleLiving
        ? Number(formDataLocal.peopleLiving)
        : null,
      energyConsumption: Number(formDataLocal.energyConsumption),
    };

    if (showConsumingProfile && !formDataLocal.consumingProfile) {
      alert("Por favor, preencha o perfil de consumo.");
      return;
    }

    if (showEnergyConsumption && !formDataLocal.energyConsumption) {
      alert("Por favor, preencha o consumo de energia.");
      return;
    }

    if (showPeopleLiving && !formDataLocal.peopleLiving && (formDataLocal.consumingProfile === "residencialComum" || formDataLocal.consumingProfile === "residencialBaixaRenda")) {
      alert("Por favor, preencha o número de residentes.");
      return;
    }

    if (showState && !formDataLocal.state) {
      alert("Por favor, selecione um estado.");
      return;
    }

    const dataToSaveFiltered = {
      ...dataToSave,
      consumingProfile: showConsumingProfile ? dataToSave.consumingProfile : undefined,
      peopleLiving: showPeopleLiving ? dataToSave.peopleLiving : undefined,
      energyConsumption: showEnergyConsumption ? dataToSave.energyConsumption : undefined,
      state: showState ? dataToSave.state : undefined,
    };

    localStorage.setItem("formData", JSON.stringify(dataToSaveFiltered));

    setFormData(dataToSaveFiltered);

    if (showEnergyConsumption) {
      setConsumptionData({ energyConsumption: dataToSave.energyConsumption });
    }

    alert("Informações salvas com sucesso!");
    setFormSubmitted((prev) => !prev);
  };

  return (
    <form onSubmit={handleSubmit} className="text-xs sm:text-base">
      {showConsumingProfile && (
        <div>
          <select
            aria-label="Selecione seu perfil de consumo"
            className={`${
              formDataLocal.consumingProfile === "" ? "text-gray" : "text-black"
            }`}
            name="consumingProfile"
            value={formDataLocal.consumingProfile}
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
      )}
      <div
        className={`${
          showPeopleLiving &&
          (formDataLocal.consumingProfile === "residencialComum" ||
            formDataLocal.consumingProfile === "residencialBaixaRenda")
            ? "flex gap-3 items-center"
            : ""
        }`}
      >
        {showPeopleLiving &&
          (formDataLocal.consumingProfile === "residencialComum" ||
            formDataLocal.consumingProfile === "residencialBaixaRenda") && (
            <div className="relative">
              <input
                aria-label="Digite o número de residentes"
                className="w-full people"
                type="number"
                name="peopleLiving"
                placeholder="Residentes"
                value={formDataLocal.peopleLiving}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3">
                Moradores
              </span>
            </div>
          )}
        {showEnergyConsumption && (
          <div className="relative">
            <input
              aria-label="Digite seu consumo de energia em KWh"
              placeholder="Consumo em KWh"
              type="number"
              name="energyConsumption"
              value={formDataLocal.energyConsumption}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              className="w-full pr-10 kwh"
            />
            <span className="absolute inset-y-0 right-0 flex items-center pr-3">
              KWh
            </span>
          </div>
        )}
      </div>
      {showState && (
        <div>
          <select
            aria-label="Selecione um estado"
            name="state"
            className={`${
              formDataLocal.state === "" ? "text-gray" : "text-black"
            }`}
            value={formDataLocal.state}
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
      )}
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
  setFormSubmitted: PropTypes.func,
  showConsumingProfile: PropTypes.bool,
  showPeopleLiving: PropTypes.bool,
  showEnergyConsumption: PropTypes.bool,
  showState: PropTypes.bool,
};

export default EnergyForm;