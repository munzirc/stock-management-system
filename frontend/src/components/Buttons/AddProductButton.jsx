import React from "react";
import AddIcon from "@mui/icons-material/Add";

const AddProductButton = ({handleAddProduct}) => {
  return (
    <div>
      <button
        onClick={handleAddProduct}
        className="hidden px-4 py-2 max-w-fit rounded-lg text-white text-xs sm:text-sm font-semibold sm:flex items-center justify-center transition bg-green-600 hover:bg-green-700"
      >
        <AddIcon sx={{ fontSize: 16 }} />
        Add Product
      </button>
    </div>
  );
};

export default AddProductButton;
