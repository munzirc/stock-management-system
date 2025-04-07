const ProductTable = ({ title, products }) => (
  <div>
    <h2 className="text-lg font-semibold mb-2">{title}</h2>
    <div className="overflow-x-auto bg-white rounded-lg shadow-md border">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Quantity
            </th>
            <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500">
              Category
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((p, i) => (
            <tr key={i}>
              <td className="px-6 py-4 text-sm text-gray-800">{p.name}</td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {p.quantityInStock}
              </td>
              <td className="px-6 py-4 text-sm text-gray-800">
                {p.category || "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default ProductTable;
