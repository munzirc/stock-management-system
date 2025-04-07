import React from "react";
import AddIcon from "@mui/icons-material/Add"

const MobileAddButton = ({ handleAddProduct }) => {
  return (
    <button
      onClick={handleAddProduct}
      className="fixed z-[999] bottom-32 right-4 bg-green-600 text-white w-14 h-14 flex items-center justify-center rounded-full shadow-lg hover:bg-green-700 active:scale-90 transition-transform sm:hidden"
    >
      <AddIcon fontSize="medium" />
    </button>
  );
};

export default MobileAddButton;
