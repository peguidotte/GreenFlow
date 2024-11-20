import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const FeedbackCards = ({ formSubmitted }) => {
  const [essentialsData, setEssentialsData] = useState([]);
  const [statesData, setStatesData] = useState(null);
  const [consumingProfile, setConsumingProfile] = useState(null);
  const [peopleLiving, setPeopleLiving] = useState(null);
  const [energyConsumption, setEnergyConsumption] = useState(null);
  const [state, setState] = useState(null);

  const fetchFormData = () => {
    const formData = JSON.parse(localStorage.getItem("formData"));
    if (formData) {
      setConsumingProfile(formData.consumingProfile);
      if (
        formData.consumingProfile !== "industrial" &&
        formData.consumingProfile !== "comercial"
      ) {
        setPeopleLiving(formData.peopleLiving);
      }
      setEnergyConsumption(formData.energyConsumption);
      setState(formData.state);
    }
  };

  useEffect(() => {
    fetchFormData();

    fetch("https://673cd4af96b8dcd5f3fbdb27.mockapi.io/api/v1/consumptionData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Erro ao buscar os dados: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        const essentials = data[0];
        setEssentialsData(essentials);
        console.log("Essentials:", essentials);

        const states = data[1].states;
        console.log("Estados:", states);
        setStatesData(states);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [formSubmitted]); // Re-fetch data when formSubmitted changes

  useEffect(() => {
    if (essentialsData && statesData && state) {
      console.log(
        "Tarifa média residencial:",
        essentialsData.tariffAvgResidential
      );
      console.log(`Cidade de ${state}:`, statesData[state]);
    }
  }, [essentialsData, statesData, state]);

  return (
    <div className="w-10/12">
      {statesData && state && statesData[state] ? (
        <div>
          <h2>Estado: {state}</h2>
          <p className="text-black">ID: {statesData[state].id}</p>
          <p className="text-black">
            Consumo Residencial Médio: {statesData[state].avgResidential} kWh
          </p>
          <p className="text-black">
            Consumo Comercial Médio: {statesData[state].avgCommercial} kWh
          </p>
          <p className="text-black">
            Consumo Industrial Médio: {statesData[state].avgIndustrial} kWh
          </p>
        </div>
      ) : (
        <div className="text-center shadow-md shadow-mid-green px-5 py-2 rounded-2xl">
          <h2></h2>
          <h2>
            Envie o formulário para ver uma prévia do seu nível de consumo
          </h2>
        </div>
      )}
    </div>
  );
};

FeedbackCards.propTypes = {
  formSubmitted: PropTypes.bool.isRequired,
};

export default FeedbackCards;
