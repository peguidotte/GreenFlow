import { useEffect, useState } from "react";
import {
  BarChart,
  PieChart,
  Pie,
  AreaChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
} from "recharts";

const Graphs = () => {
  const [apiData, setApiData] = useState([]);
  const [userData, setUserData] = useState(null);
  const [avgConsumption, setAvgConsumption] = useState({
    state: 0,
    general: 0,
  });
  const [tariff, setTariff] = useState(0);
  const [energyConsumption, setEnergyConsumption] = useState(0);
  const [price, setPrice] = useState(0);

  // Estados para os dados dos gráficos
  const [chartDataState, setChartDataState] = useState([]);
  const [chartDataCountry, setChartDataCountry] = useState([]);
  const [charDataGeneral, setCharDataGeneral] = useState([]);
  const [chartExpectedSavings, setChartExpectedSavings] = useState([]);
  const [chartExpectedSavingsPrice, setChartExpectedSavingsPrice] = useState([]);
  const [chartExpectedSavingsAll, setChartExpectedSavingsAll] = useState([]);

  useEffect(() => {
    // Buscar dados da API
    fetch(
      "https://673cd4af96b8dcd5f3fbdb27.mockapi.io/api/v1/consumptionData"
    )
      .then((response) => response.json())
      .then((data) => {
        console.log("API Data:", data);
        setApiData(data);

        // Dados do usuário
        const storedUserData = JSON.parse(localStorage.getItem("usersData"));
        console.log("Stored User Data:", storedUserData);
        let user = null;
        let avgConsumptionState = 0;
        let avgConsumptionGeneral = 0;
        let tariffValue = 0;

        if (storedUserData) {
          const userId = Object.keys(storedUserData)[0];
          user = storedUserData[userId];
          setUserData(user);

          const { consumingProfile, state } = user;
          console.log("Consuming Profile:", consumingProfile);
          console.log("State:", state);

          if (data[1] && data[1].states && data[1].states[state]) {
            if (consumingProfile === "residencialComum") {
              avgConsumptionState = data[1].states[state].avgResidential;
              avgConsumptionGeneral = data[0].generalAvgResidential;
              tariffValue = data[0].tariffAvgResidential;
            } else if (consumingProfile === "residencialBaixaRenda") {
              avgConsumptionState = data[1].states[state].avgResidential;
              avgConsumptionGeneral = data[0].generalAvgResidential;
              tariffValue = data[0].tariffAvgResidentialLowIncome;
            } else if (consumingProfile === "comercial") {
              avgConsumptionState = data[1].states[state].avgCommercial;
              avgConsumptionGeneral = data[0].generalAvgCommercial;
              tariffValue = data[0].tariffAvgCommercial;
            } else if (consumingProfile === "industrial") {
              avgConsumptionState = data[1].states[state].avgIndustrial;
              avgConsumptionGeneral = data[0].generalAvgIndustrial;
              tariffValue = data[0].tariffAvgIndustrial;
            }

            setAvgConsumption({
              state: avgConsumptionState,
              general: avgConsumptionGeneral,
            });
            setTariff(tariffValue);

            console.log("Average Consumption (State):", avgConsumptionState);
            console.log(
              "Average Consumption (General):",
              avgConsumptionGeneral
            );
            console.log("Tariff:", tariffValue);
          } else {
            console.error("State data not found for:", state);
          }
        }

        // Dados de consumo do usuário
        const storedConsumptionData = JSON.parse(
          localStorage.getItem("consumptionData")
        );
        console.log("Stored Consumption Data:", storedConsumptionData);
        let energyCons = 0;
        let priceValue = 0;

        if (storedConsumptionData) {
          energyCons = storedConsumptionData.energyConsumption;
          priceValue = storedConsumptionData.price;
          setEnergyConsumption(energyCons);
          setPrice(priceValue);

          console.log("Energy Consumption:", energyCons);
          console.log("Price:", priceValue);
        }

        // Preparar os dados para os gráficos
        setChartDataState([
          {
            name: "Comparação estadual",
            avgConsumption: avgConsumptionState,
            userConsumption: energyCons,
          },
        ]);

        setChartDataCountry([
          {
            name: "Comparação nacional",
            avgConsumption: avgConsumptionGeneral,
            userConsumption: energyCons,
          },
        ]);

        setCharDataGeneral([
          { name: "País", value: avgConsumptionGeneral },
          { name: user ? user.name : "Usuário", value: energyCons },
          { name: user ? user.state : "Estado", value: avgConsumptionState },
        ]);

        setChartExpectedSavings([
          {
            name: "Economia esperada para o mês",
            avgConsumption: energyCons,
            userConsumption: energyCons / 1.4,
          },
        ]);

        setChartExpectedSavingsPrice([
          {
            name: "Economia esperada para o mês",
            avgConsumption: priceValue,
            userConsumption: priceValue / 1.4,
          },
        ]);

        setChartExpectedSavingsAll([
          {
            name: "Economia esperada para o mês",
            avgConsumption: avgConsumptionGeneral / 1.1,
            avgConsumptionState: avgConsumptionState / 1.2,
            userConsumption: energyCons / 1.4,
          },
        ]);
      })
      .catch((error) => console.error("Error fetching API data:", error));
  }, []);

  return (
    <div>
      <h2>Comparação Estadual</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartDataState}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="avgConsumption"
            fill="#8884d8"
            name="Consumo Médio do Estado"
          />
          <Bar
            dataKey="userConsumption"
            fill="#82ca9d"
            name="Consumo do Usuário"
          />
        </BarChart>
      </ResponsiveContainer>

      <h2>Comparação Nacional</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartDataCountry}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="avgConsumption"
            fill="#8884d8"
            name="Consumo Médio Nacional"
          />
          <Bar
            dataKey="userConsumption"
            fill="#82ca9d"
            name="Consumo do Usuário"
          />
        </BarChart>
      </ResponsiveContainer>

      <h2>Distribuição do Consumo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={charDataGeneral}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#8884d8"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>

      <h2>Economia Esperada para o Mês</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartExpectedSavings}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="userConsumption"
            stroke="#8884d8"
            fill="#8884d8"
            name="Economia Esperada"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Graphs;