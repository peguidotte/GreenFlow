import { useState, useEffect } from "react";
import "./EnergyForm.css";

const EnergyForm = () => {
  const [formData, setFormData] = useState({
    consumingProfile: String,
    peopleLiving: String,
    energyConsumption: String,
    state: String,
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
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !formData.consumingProfile ||
      !formData.peopleLiving ||
      !formData.energyConsumption ||
      !formData.state
    ) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="text-xs sm:text-base">
      <div>
        <label>Perfil de consumo:</label>
        <select
          name="consumingProfile"
          value={formData.consumingProfile}
          onChange={handleChange}
        >
          <option value="comercial">Comercial</option>
          <option value="industrial">Industrial</option>
          <option value="residencialComum">Residencial comum</option>
          <option value="residencialBaixaRenda">
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
          <div>
            <label>Quantas pessoas vivem com você?</label>
            <input
              type="number"
              name="peopleLiving"
              placeholder="Residentes"
              value={formData.peopleLiving}
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <label>Seu último consumo de energia:</label>
          <input
            placeholder="Em KWh"
            type="number"
            name="energyConsumption"
            value={formData.energyConsumption}
            onChange={handleChange}
          />
        </div>
      </div>
      <div>
        <label>Estado:</label>
        <select name="state" value={formData.state} onChange={handleChange}>
          <option value="">Selecione um estado</option>
          {states.map((state) => (
            <option key={state.id} value={state.nome}>
              {state.nome}
            </option>
          ))}
        </select>
      </div>
      <button type="submit" >Enviar</button>
    </form>
  );
};

export default EnergyForm;
