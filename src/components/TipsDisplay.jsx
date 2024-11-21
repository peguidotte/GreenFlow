import PropTypes from "prop-types";
import Aos from "aos";
import "aos/dist/aos.css";

const TipsDisplay = ({ randomDicas }) => {
  Aos.init({ duration: 1000 });

  return (
    <aside className="text-center flex flex-col justify-center gap-8">
      {randomDicas.length > 0 ? (
        randomDicas.map((dica, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-anchor-placement="top-bottom"
          >
            <h2 className="shadow-md bg-white shadow-mid-green px-4 py-3 rounded-2xl font-medium sm:text-lg sm:py-4 lg:text-xl lg:py-6 hover:scale-105 duration-300">
              {dica}
            </h2>
          </div>
        ))
      ) : (
        <p className="shadow-md shadow-mid-green px-4 py-3 rounded-2xl font-medium sm:text-lg sm:py-4 lg:text-xl lg:py-6 hover:scale-105 duration-300">
          Sem dicas disponíveis no momento.
        </p>
      )}
    </aside>
  );
};

TipsDisplay.propTypes = {
  randomDicas: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TipsDisplay;
