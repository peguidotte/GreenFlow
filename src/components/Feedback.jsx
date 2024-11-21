import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import tips from "../data/tips.json";
import ConsumptionDisplay from "./ConsumptionDisplay.jsx";
import TipsDisplay from "./TipsDisplay";

const FeedbackCards = ({ formSubmitted }) => {
  const [essentialsData, setEssentialsData] = useState([]);
  const [statesData, setStatesData] = useState(null);
  const [consumingProfile, setConsumingProfile] = useState(null);
  const [peopleLiving, setPeopleLiving] = useState(null);
  const [energyConsumption, setEnergyConsumption] = useState(null);
  const [state, setState] = useState(null);

  const [consumingLevelState, setConsumingLevelState] = useState("");
  const [colorLevelState, setColorLevelState] = useState("");
  const [colorLevelStateCountry, setColorLevelStateCountry] = useState("");
  const [consumingLevelStateCountry, setConsumingLevelStateCountry] = useState("");
  const [price, setPrice] = useState(0);
  const [dicas, setDicas] = useState([]);
  const [randomDicas, setRandomDicas] = useState([]);

  const residencial = consumingProfile === "residencialComum" || consumingProfile === "residencialBaixaRenda";

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

  const calculateConsumingLevel = (amount, avg, setLevel, setColor) => {
    let level = "";
    let color = "";
    if (amount >= avg / 1.2 && amount <= avg * 1.2) {
      level = "Médio";
      color = "white";
    } else if (amount < avg / 1.2 && amount >= avg / 1.5) {
      level = "Bom";
      color = "#85D22C";
    } else if (amount > avg * 1.2 && amount <= avg * 1.5) {
      level = "Ruim";
      color = "#FFFE65";
    } else if (amount < avg / 1.5) {
      level = "Ótimo";
      color = "#3C8500";
    } else if (amount > avg * 1.5) {
      level = "Péssimo";
      color = "#FF0000";
    }
    setLevel(level);
    setColor(color);
  };

  const calculatePrice = (amount, tariff) => {
    const calculatedPrice = amount * tariff;
    setPrice(calculatedPrice.toFixed(2));
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

        const states = data[1].states;
        setStatesData(states);
      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }, [formSubmitted]);

  useEffect(() => {
    if (
      essentialsData &&
      statesData &&
      state &&
      consumingProfile &&
      energyConsumption
    ) {
      if (consumingProfile === "residencialComum") {
        calculateConsumingLevel(
          energyConsumption,
          statesData[state].avgResidential,
          setConsumingLevelState,
          setColorLevelState
        );
        calculateConsumingLevel(
          energyConsumption,
          essentialsData.generalAvgResidential,
          setConsumingLevelStateCountry,
          setColorLevelStateCountry
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgResidential);
      } else if (consumingProfile === "residencialBaixaRenda") {
        calculateConsumingLevel(
          energyConsumption,
          statesData[state].avgResidential,
          setConsumingLevelState,
          setColorLevelState
        );
        calculateConsumingLevel(
          energyConsumption,
          essentialsData.generalAvgResidential,
          setConsumingLevelStateCountry,
          setColorLevelStateCountry
        );
        calculatePrice(
          energyConsumption,
          essentialsData.tariffAvgResidentialLowIncome
        );
      } else if (consumingProfile === "comercial") {
        calculateConsumingLevel(
          energyConsumption,
          statesData[state].avgCommercial,
          setConsumingLevelState,
          setColorLevelState
        );
        calculateConsumingLevel(
          energyConsumption,
          essentialsData.generalAvgCommercial,
          setConsumingLevelStateCountry,
          setColorLevelStateCountry
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgCommercial);
      } else if (consumingProfile === "industrial") {
        calculateConsumingLevel(
          energyConsumption,
          statesData[state].avgIndustrial,
          setConsumingLevelState,
          setColorLevelState
        );
        calculateConsumingLevel(
          energyConsumption,
          essentialsData.generalAvgIndustrial,
          setConsumingLevelStateCountry,
          setColorLevelStateCountry
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgIndustrial);
      }

      const consumptionData = {
        consumingProfile,
        energyConsumption,
        consumingLevelState,
        consumingLevelStateCountry,
        price,
      };

      if (residencial) {
        consumptionData.energyConsumptionPerPeople =
          energyConsumption / peopleLiving;
        consumptionData.peopleLiving = peopleLiving;
      }

      localStorage.setItem("consumptionData", JSON.stringify(consumptionData));
    }

    // Acessando as dicas dinâmicas
    if (consumingProfile && consumingLevelState) {
      const dicasParaPerfil = tips[consumingProfile][consumingLevelState];
      setDicas(dicasParaPerfil); 
    }
  }, [
    residencial,
    consumingLevelStateCountry,
    essentialsData,
    statesData,
    state,
    consumingProfile,
    energyConsumption,
    peopleLiving,
    consumingLevelState,
    price,
  ]);

  useEffect(() => {
    if (dicas.length > 0) {
      const dicasAleatorias = [...dicas]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomDicas(dicasAleatorias);
    }
  }, [dicas]);

  return (
    <section className="w-10/12 lg:w-9/12">
      {statesData && state && statesData[state] ? (
        <div className="flex flex-col gap-10">
          <ConsumptionDisplay
            consumingLevelState={consumingLevelState}
            colorLevelState={colorLevelState}
            consumingLevelStateCountry={consumingLevelStateCountry}
            colorLevelStateCountry={colorLevelStateCountry}
          />
          <TipsDisplay randomDicas={randomDicas} />
        </div>
      ) : (
        <p className="shadow-md shadow-mid-green px-4 py-3 rounded-2xl font-medium sm:text-lg sm:py-4 lg:text-xl lg:py-6 hover:scale-105 duration-300">
          Preencha o formulário rapidamente para descobrir como está o nível do
          seu consumo! As informações podem demorar alguns segundos para serem carregadas.
        </p>
      )}
    </section>
  );
};

FeedbackCards.propTypes = {
  formSubmitted: PropTypes.bool.isRequired,
};

export default FeedbackCards;