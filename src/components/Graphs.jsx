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
  const [chartDataState, setChartDataState] = useState([]);
  const [chartDataCountry, setChartDataCountry] = useState([]);
  const [charDataGeneral, setCharDataGeneral] = useState([]);
  const [chartExpectedSavingsPrice, setChartExpectedSavingsPrice] = useState([]);
  const [chartExpectedSavingsEnergy, setChartExpectedSavingsEnergy] = useState([]);

  useEffect(() => {
    fetch("https://673cd4af96b8dcd5f3fbdb27.mockapi.io/api/v1/consumptionData")
      .then((response) => response.json())
      .then((data) => {

        const storedUserData = JSON.parse(localStorage.getItem("usersData"));
        let avgConsumptionState = 0;
        let avgConsumptionGeneral = 0;
        let energyCons = 0;
        let priceValue = 0;

        if (storedUserData) {
          const userId = Object.keys(storedUserData)[0];
          const user = storedUserData[userId];
          const { consumingProfile, state } = user;

          if (data[1] && data[1].states && data[1].states[state]) {
            if (consumingProfile === "residencialComum") {
              avgConsumptionState = data[1].states[state].avgResidential;
              avgConsumptionGeneral = data[0].generalAvgResidential;
            } else if (consumingProfile === "residencialBaixaRenda") {
              avgConsumptionState = data[1].states[state].avgResidential;
              avgConsumptionGeneral = data[0].generalAvgResidential;
            } else if (consumingProfile === "comercial") {
              avgConsumptionState = data[1].states[state].avgCommercial;
              avgConsumptionGeneral = data[0].generalAvgCommercial;
            } else if (consumingProfile === "industrial") {
              avgConsumptionState = data[1].states[state].avgIndustrial;
              avgConsumptionGeneral = data[0].generalAvgIndustrial;
            }
          } else {
            console.error("Dados do estado não encontrados para:", state);
          }
        }

        const storedConsumptionData = JSON.parse(localStorage.getItem("consumptionData"));
        if (storedConsumptionData) {
          energyCons = storedConsumptionData.energyConsumption;
          priceValue = storedConsumptionData.price;
        }


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
          { name: "Usuário", value: energyCons },
          { name: "Estado", value: avgConsumptionState },
        ]);

        const storedSavingsPriceData = JSON.parse(localStorage.getItem("savingsPriceData"));
        const storedSavingsEnergyData = JSON.parse(localStorage.getItem("savingsEnergyData"));

        if (storedSavingsPriceData && storedSavingsEnergyData) {
          setChartExpectedSavingsPrice(storedSavingsPriceData);
          setChartExpectedSavingsEnergy(storedSavingsEnergyData);
        } else {

          const savingsPriceData = [];
          let currentPrice = priceValue;
          for (let month = 1; month <= 12; month++) {
            if (month === 1) {
              savingsPriceData.push({ month, price: currentPrice });
            } else {
              const randMultiplier = Math.random() * (1.0 - 1.1) + 1.08;
              currentPrice = currentPrice / randMultiplier;
              savingsPriceData.push({ month, price: currentPrice });
            }
          }
          setChartExpectedSavingsPrice(savingsPriceData);
          localStorage.setItem("savingsPriceData", JSON.stringify(savingsPriceData));

          const savingsEnergyData = [];
          let currentEnergy = energyCons;
          for (let month = 1; month <= 12; month++) {
            if (month === 1) {
              savingsEnergyData.push({ month, energy: currentEnergy });
            } else {
              const randMultiplier = Math.random() * (1.0 - 1.1) + 1.08;
              currentEnergy = currentEnergy / randMultiplier;
              savingsEnergyData.push({ month, energy: currentEnergy });
            }
          }
          setChartExpectedSavingsEnergy(savingsEnergyData);
          localStorage.setItem("savingsEnergyData", JSON.stringify(savingsEnergyData));
        }
      })
      .catch((error) => console.error("Erro ao buscar dados da API:", error));
  }, []);

  return (
    <div className="md:flex md:flex-col sm:flex sm:flex-col lg:grid lg:grid-cols-3 gap-10">
      <div className="bg-white shadow-md shadow-mid-green my-10 px-3 md:px-12 lg:px-3 py-3 rounded-3xl">
      {/* Gráfico Comparação Estadual */}
      <h2 className="text-xl font-bold m-5 text-dark-green text-center lg:text-2xl">Comparação Estadual</h2>
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
            fill="#85D22C"
            name="Consumo Médio do Estado"
          />
          <Bar
            dataKey="userConsumption"
            fill="#598D1D"
            name="Consumo do Usuário"
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="bg-white shadow-md shadow-mid-green my-10 px-3 md:px-12 lg:px-3 rounded-3xl py-8 ">
      {/* Gráfico Comparação Nacional */}
      <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl">Comparação Nacional</h2>

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
            fill="#85D22C"
            name="Consumo Médio Nacional"
          />
          <Bar
            dataKey="userConsumption"
            fill="#598D1D"
            name="Consumo do Usuário"
          />
        </BarChart>
      </ResponsiveContainer>
      </div>
      <div className="bg-white shadow-md shadow-mid-green my-10 px-3 md:px-12 lg:px-3 rounded-3xl py-8 ">
      {/* Gráfico Distribuição do Consumo */}
      <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl">Distribuição do Consumo</h2>

      <h2>Distribuição do Consumo</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            dataKey="value"
            data={charDataGeneral}
            cx="50%"
            cy="50%"
            outerRadius={80}
            fill="#85D22C"
            label
          />
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
      </div>
      <div className="col-span-3 bg-white shadow-md shadow-mid-green my-10 px-3 md:px-12 lg:px-12 rounded-3xl py-8 ">
      {/* Gráfico Economia de Dinheiro Esperada para o Ano */}
      <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl">Economia de Dinheiro Esperada para o Ano</h2>

      <h2>Economia de Dinheiro Esperada para o Ano</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartExpectedSavingsPrice}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#598D1D"
            fill="#85D22C"
            name="Economia de Dinheiro"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
      <div className="col-span-3 bg-white shadow-md shadow-mid-green my-10 px-3 md:px-12 lg:px-12 rounded-3xl py-8 ">
      {/* Gráfico Economia de Energia Esperada para o Ano */}
      <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl">Economia de Energia Esperada para o Ano</h2>


      <h2>Economia de Energia Esperada para o Ano</h2>
      <ResponsiveContainer width="100%" height={300}>
        <AreaChart
          data={chartExpectedSavingsEnergy}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray="2" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="energy"
            stroke="#598D1D"
            fill="#85D22C"
            name="Economia de Energia"
          />
        </AreaChart>
      </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Graphs;