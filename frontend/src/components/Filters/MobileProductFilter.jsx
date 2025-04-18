import { Slider } from "@mui/material";
import React from "react";

const MobileProductFilter = ({
  filters,
  categories,
  handlePriceChange,
  handleClear,
  handleChange,
  applyFilters,
}) => {
  return (
    <div className="hidden sm:block lg:hidden p-4 space-y-4 bg-white rounded-2xl shadow-md">
      <div className="flex flex-col sm:flex-row gap-2">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            value={filters.category}
            name="category"
            onChange={handleChange}
            className="w-full text-sm px-3 py-2 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B49AC]"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Keyword */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Keyword
          </label>
          <input
            type="text"
            name="keyword"
            value={filters.keyword}
            onChange={handleChange}
            placeholder="Search by keyword"
            className="w-full text-sm px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#4B49AC]"
          />
        </div>
      </div>

      {/* Price Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Price Range (₹)
        </label>
        <Slider
          value={[filters.minPrice, filters.maxPrice]}
          onChange={handlePriceChange}
          valueLabelDisplay="auto"
          min={5}
          max={500000}
          disableSwap
          sx={{
            color: "#4B49AC",
            "& .MuiSlider-thumb": {
              backgroundColor: "#4B49AC",
              "&:hover, &.Mui-focusVisible, &.Mui-active": {
                boxShadow: "0px 0px 0px 8px rgba(75, 73, 172, 0.2)",
              },
            },
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button
          onClick={applyFilters}
          className="flex-1 bg-[#4B49AC] text-white py-2 rounded-md text-sm font-medium hover:bg-[#3a3890] active:scale-95 transition"
        >
          Apply
        </button>
        <button
          onClick={handleClear}
          className="flex-1 bg-red-500 text-white py-2 rounded-md text-sm font-medium hover:bg-red-600 active:scale-95 transition"
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MobileProductFilter;
