import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import tips from "../data/tips.json";

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
  const [consumingLevelStateCountry, setConsumingLevelStateCountry] =
    useState("");
  const [price, setPrice] = useState(0);
  const residencial =
    consumingProfile === "residencialComum" ||
    consumingProfile === "residencialBaixaRenda";
  const [dicas, setDicas] = useState([]);
  const [randomDicas, setRandomDicas] = useState([]);

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
      const calculateConsumingLevelState = (amount, avg) => {
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
        setColorLevelState(color);
        setConsumingLevelState(level);
      };

      const calculateConsumingLevelStateCountry = (amount, avg) => {
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
        setColorLevelStateCountry(color);
        setConsumingLevelStateCountry(level);
      };

      const calculatePrice = (amount, tariff) => {
        const calculatedPrice = amount * tariff;
        setPrice(calculatedPrice);
      };

      if (consumingProfile === "residencialComum") {
        calculateConsumingLevelState(
          energyConsumption,
          statesData[state].avgResidential
        );
        calculateConsumingLevelStateCountry(
          energyConsumption,
          essentialsData.generalAvgResidential
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgResidential);
      } else if (consumingProfile === "residencialBaixaRenda") {
        calculateConsumingLevelState(
          energyConsumption,
          statesData[state].avgResidential
        );
        calculateConsumingLevelStateCountry(
          energyConsumption,
          essentialsData.generalAvgResidential
        );
        calculatePrice(
          energyConsumption,
          essentialsData.tariffAvgResidentialLowIncome
        );
      } else if (consumingProfile === "comercial") {
        calculateConsumingLevelState(
          energyConsumption,
          statesData[state].avgCommercial
        );
        calculateConsumingLevelStateCountry(
          energyConsumption,
          essentialsData.generalAvgCommercial
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgCommercial);
      } else if (consumingProfile === "industrial") {
        calculateConsumingLevelState(
          energyConsumption,
          statesData[state].avgIndustrial
        );
        calculateConsumingLevelStateCountry(
          energyConsumption,
          essentialsData.generalAvgIndustrial
        );
        calculatePrice(energyConsumption, essentialsData.tariffAvgIndustrial);
      }

      const consumptionData = {
        consumingProfile,
        energyConsumption,
        consumingLevelState,
        consumingLevelStateCountry,
        price: price.toFixed(2),
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
      console.log(dicasParaPerfil);
      setDicas(dicasParaPerfil); // Atualiza as dicas com base no perfil e nível de consumo
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
    // Embaralha as dicas e seleciona as 3 primeiras
    if (dicas.length > 0) {
      const dicasAleatorias = [...dicas]
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
      setRandomDicas(dicasAleatorias);
    }
  }, [dicas]);

  return (
    <section className="w-10/12">
      {statesData && state && statesData[state] ? (
        <div className="flex flex-col gap-4">
          <div className="flex justify-center">
            <div
              className="w-2/4 rounded-s-2xl shadow-md py-2"
              style={{ color: "black", backgroundColor: colorLevelState }}
            >
              <p className="text-xs mb-1 text-center sm:text-base lg:text-lg">
                Consumo estadual
              </p>
              <h2 className="text-2xl font-extrabold text-center  sm:text-3xl lg:text-4xl">
                {consumingLevelState}
              </h2>
            </div>
            <div
              className="w-2/4 rounded-e-2xl shadow-md py-2"
              style={{
                color: "black",
                backgroundColor: colorLevelStateCountry,
              }}
            >
              <p className="text-xs mb-1 text-center sm:text-base lg:text-lg">
                Consumo nacional
              </p>
              <h2 className="text-2xl font-extrabold text-center sm:text-3xl lg:text-4xl">
                {consumingLevelStateCountry}
              </h2>
            </div>
          </div>
          <aside className="text-center flex flex-col justify-center gap-8">
            {randomDicas.length > 0 ? (
              randomDicas.map((dica, index) => (
                <h2
                  key={index}
                  className="shadow-md shadow-mid-green px-4 py-3 rounded-2xl font-semibold"
                >
                  Dica {index + 1}: {dica}
                </h2>
              ))
            ) : (
              <p>Sem dicas disponíveis no momento.</p>
            )}
          </aside>
        </div>
      ) : (
        <p>
          Preencha o formulário rapidamente para descobrir como está o nível do
          seu consumo!
        </p>
      )}
    </section>
  );
};

FeedbackCards.propTypes = {
  formSubmitted: PropTypes.bool.isRequired,
};

export default FeedbackCards;
