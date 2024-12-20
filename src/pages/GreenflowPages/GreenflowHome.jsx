import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import InformationCard from "../../components/InformationCard";
import Feedback from "../../components/Feedback";
import "../../index.css";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function GreenflowHome() {
  const { userData, consumptionData } = useContext(UserContext);
  if (!consumptionData){
    return <p className="text-center mt-10">Selecione o mesmo Estado e perfil de consumo do seu perfil.</p>;
  }
  const data = [
    {
      name: "Seu Consumo",
      consumoUser: consumptionData.energyConsumption,
    },
    {
      name: "Outros Usuários",
      consumoOthers: consumptionData.energyConsumption * 1.2,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center md:overflow-x-clip ">
        <p className="text-xl text-center text-white font-medium mb-10 mt-5 sm:text-2xl md:text-3xl lg:text-4xl md:mb-20 ">
          Informações gerais sobre energia do mês passado.
        </p>
        <Feedback tipsDisplay={1} className="absolute" />
        <h2 className="text-2xl font-bold mt-20 text-dark-green text-center lg:text-4xl">
          Comparação de Consumo de Energia
        </h2>
        <div className="w-full max-w-md shadow-md shadow-mid-green p-3 md:p-12 lg:p-12 mt-6 rounded-3xl" >
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data} barGap={-130} >
              <CartesianGrid strokeDasharray="2" />
              <XAxis dataKey="name" />           
              <Tooltip />
              <Bar dataKey="consumoUser" fill="#85D22C" />
              <Bar dataKey="consumoOthers" fill="#598D1D" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="banner-green rotate-180 py-28 px-8">
          <div className="rotate-180 flex flex-col justify-start items-center gap-10">
            <h2 className=" text-xl sm:text-2xl md:text-3xl text-center font-medium text-white">
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
                {userData?.name}
              </span>
              , você junto a {""}
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
                Greenflow
              </span>{" "}
              e outros{" "}
              <span className="font-bold text-2xl sm:text-3xl md:text-4xl">
                10928
              </span>{" "}
              usuários já ajudaram o planeta com:
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-20 md:px-5 lg:px-3">
              <InformationCard
                title="Energia Salva"
                value="150987 kWh"
                icon="⚡"
              />
              <InformationCard
                title="Água Salva"
                value="98101 L"
                icon="💧"
              />
              <InformationCard
                title="CO2 reduzido"
                value="827 kg"
                icon="🌍"
              />
              <InformationCard
                title="Árvores plantadas"
                value="30"
                icon="🌳"
              />
            </div>
          </div>
        </div>    
        <h2 className="text-2xl font-bold mt-20 text-dark-green text-center lg:text-4xl">
          Continue assim, {userData?.name}!
          <br />
          <span className="text-3xl lg:text-5xl">Energize seu futuro!</span>
        </h2>
      </div>
    </>
  );
}

export default GreenflowHome;