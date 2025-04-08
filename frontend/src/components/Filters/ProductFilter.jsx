import { Slider } from "@mui/material";
import React, { useState } from "react";

const ProductFilter = ({
  filters,
  categories,
  handlePriceChange,
  handleClear,
  handleChange,
  applyFilters,
}) => {
  const [priceRange, setPriceRange] = useState([5, 500000]);
  return (
    <div className="flex w-full xl:w-[70%] bg-white rounded-3xl h-10 ">
      {/* Ctaegory Filter*/}
      <div className="flex flex-1 items-center px-2">
        <select
          value={filters.category}
          name="category"
          onChange={handleChange}
          className="w-full text-sm  bg-white  text-gray-900 rounded-md focus:outline-none focus:ring-0 border-none"
        >
          <option value="" disabled>
            Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className="w-px bg-gray-300" />
      {/* Keyword Search*/}
      <div className="flex-1 flex items-center ">
        <input
          type="text"
          value={filters.keyword}
          placeholder="Keywords"
          name="keyword"
          onChange={handleChange}
          className="w-full text-sm px-2 border-none outline-none focus:outline-none focus:ring-0"
        />
      </div>
      <div className="w-px bg-gray-300" />
      {/* Price Filter */}
      <div className="flex-1 px-4 flex flex-col items-center ">
        <label className="block text-xs font-medium text-gray-700">
          Price Range (₹)
        </label>

        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={priceRange[0]}
          max={priceRange[1]}
          disableSwap
          sx={{
            color: "#1976d2",
            "& .MuiSlider-thumb": {
              backgroundColor: "#4B49AC",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "0px 0px 0px 8px rgba(255, 87, 34, 0.16)",
              },
            },
            "& .MuiSlider-track": {
              backgroundColor: "#1976d2",
            },
            "& .MuiSlider-rail": {
              backgroundColor: "#ccc",
            },
          }}
        />
      </div>
      {/* buttons */}
      <div className="flex-1 flex items-center">
        <button
          onClick={applyFilters}
          className="flex-1 px-4 py-2 bg-[#4B49AC] text-sm text-white transition-all duration-150 transform hover:bg-[#3a3890] active:scale-95 shadow-md hover:shadow-lg"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 px-4 py-2 bg-red-500 rounded-r-3xl text-sm text-white transition-all duration-150 transform hover:bg-red-600 active:scale-95 shadow-md hover:shadow-lg"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default ProductFilter;
