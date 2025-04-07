import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddProductButton = ({handleAddProduct}) => {
  return (
    <div>
      <button
        onClick={handleAddProduct}
        className="hidden sm:flex items-center leading-0 right-2 gap-1  px-4 py-2 bg-green-600 text-white text-md font-semibold text-sm rounded-xl transition-all duration-150 hover:bg-green-700 active:scale-95 shadow-md hover:shadow-lg"
      >
        <AddIcon sx={{ fontSize: 16 }} />
        Add Product
      </button>
    </div>
  );
};

export default AddProductButton;
