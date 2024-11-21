import PropTypes from 'prop-types';

const DashboardCard = ({ title, value, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex items-center">
      <div className="text-3xl text-green-500 mr-4">{icon}</div>
      <div>
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="text-gray-600">{value}</p>
      </div>
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};

export default DashboardCard;