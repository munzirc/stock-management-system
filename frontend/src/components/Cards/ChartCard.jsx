

const ChartCard = ({ title, children }) => (
  <div className="bg-white rounded-lg shadow-md p-4 w-full">
    <h2 className="text-lg font-semibold text-gray-700 mb-3">{title}</h2>
    <div className="">{children}</div>
  </div>
);

export default ChartCard;
