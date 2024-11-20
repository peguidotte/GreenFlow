
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
    )
};

DashboardCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
};

function Greenflow() {
    return (
        <div className="p-8 bg-gray-100 min-h-screen">
            <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DashboardCard title="Energy Saved" value="150 kWh" icon="⚡" />
                <DashboardCard title="Water Saved" value="200 L" icon="💧" />
                <DashboardCard title="CO2 Reduced" value="50 kg" icon="🌍" />
                <DashboardCard title="Trees Planted" value="30" icon="🌳" />
            </div>
        </div>
    );
};

export default Greenflow;