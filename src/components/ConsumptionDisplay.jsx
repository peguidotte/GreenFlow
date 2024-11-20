import Aos from "aos";
import "aos/dist/aos.css";
import PropTypes from "prop-types";

const ConsumptionDisplay = ({
  consumingLevelState,
  colorLevelState,
  consumingLevelStateCountry,
  colorLevelStateCountry,
}) => {
  Aos.init({ duration: 1000 });

  return (
    <div className="flex justify-center gap-1" data-aos="fade-up"
    data-aos-anchor-placement="top-bottom">
      <div
        
        className="w-2/4 rounded-s-2xl shadow-md py-2 hover:scale-105 hover:-translate-x-4 duration-300"
        style={{ color: "black", backgroundColor: colorLevelState }}
      >
        <p className="text-xs mb-1 text-center sm:text-base lg:text-lg">
          Consumo estadual
        </p>
        <h2 className="text-2xl font-extrabold text-center sm:text-3xl lg:text-4xl">
          {consumingLevelState}
        </h2>
      </div>
      <div
        
        className="w-2/4 rounded-e-2xl shadow-md py-2 hover:scale-105 hover:translate-x-4 duration-300"
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
  );
};

ConsumptionDisplay.propTypes = {
  consumingLevelState: PropTypes.string.isRequired,
  colorLevelState: PropTypes.string.isRequired,
  consumingLevelStateCountry: PropTypes.string.isRequired,
  colorLevelStateCountry: PropTypes.string.isRequired,
};

export default ConsumptionDisplay;
