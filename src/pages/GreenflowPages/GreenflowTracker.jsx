import ImageTracker from '../../assets/trackergreenflow.jpg';

function GreenflowTracker() {
    return (
      <div className="mt-36">
        <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl mb-4">GreenFlow Tracker: O Futuro do Monitoramento de Energia</h2>
        <p className="text-center max-w-5xl mx-auto">O GreenFlow Tracker é um dispositivo revolucionário para monitoramento de energia elétrica em tempo real, instalado diretamente nos conduítes elétricos. Ele exibe dados precisos de consumo e alerta para anomalias com LEDs indicadores.</p>
        <p className="text-center  max-w-5xl mx-auto mt-2">Atualmente em fase de testes, o dispositivo está sendo ajustado para garantir máxima segurança e eficiência. O lançamento oficial será em breve, trazendo uma solução prática e sustentável para otimizar o uso de energia em residências e empresas. Fique atento para mais novidades!</p>
        <h2 className="text-2xl font-bold m-5 text-dark-green text-center lg:text-2xl mb-4">Em breve...</h2>
        <img src={ImageTracker} alt="GreenFlow Tracker" className="mx-auto rounded-2xl md:w-2/4 lg:w-1/4 shadow-md shadow-mid-green" />
      </div>
    );
  }
  
  export default GreenflowTracker;