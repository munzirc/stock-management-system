import React from 'react';

const ProductCard = ({ product, onUpdate, onDelete }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md p-4  w-full flex flex-col justify-between transition hover:shadow-lg">
      <div>
        
        <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
        <p className="text-sm text-gray-500 mt-1">
          Price: <span className="font-medium text-black">₹{product.price}</span>
        </p>
        <p className="text-sm text-gray-500">
          Quantity: <span className="font-medium text-black">{product.quantityInStock}</span>
        </p>
        <p className="text-sm text-gray-600 mt-2 line-clamp-2">
          {product.description}
        </p>
      </div>

      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={() => onUpdate(product)}
          className="px-3 py-1 text-sm bg-[#4B49AC] text-white rounded-md hover:bg-blue-700 active:scale-95 transition"
        >
          Update
        </button>
        <button
          onClick={() => onDelete(product)}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 active:scale-95 transition"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
