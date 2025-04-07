const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow-sm border">
    <h4 className="text-gray-600 text-sm">{title}</h4>
    <p className="text-xl font-semibold text-gray-800 mt-2">{value}</p>
  </div>
);

export default Card;
