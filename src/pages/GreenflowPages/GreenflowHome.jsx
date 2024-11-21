import DashboardCard from '../../components/DashboardCard';

function GreenflowHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Home</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Energy Saved" value="150 kWh" icon="⚡" />
        <DashboardCard title="Water Saved" value="200 L" icon="💧" />
        <DashboardCard title="CO2 Reduced" value="50 kg" icon="🌍" />
        <DashboardCard title="Trees Planted" value="30" icon="🌳" />
      </div>
    </div>
  );
}

export default GreenflowHome;