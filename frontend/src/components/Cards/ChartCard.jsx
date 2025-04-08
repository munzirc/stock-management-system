

const ChartCard = ({ title, children }) => (
  <div className="w-full h-full bg-white rounded-lg shadow-md p-4">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
    <div className="h-56">{children}</div>
  </div>
);

export default ChartCard;
