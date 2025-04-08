import { Slider } from "@mui/material";
import React, { useState } from "react";
import { ChevronUp, ChevronDown, SlidersHorizontal } from "lucide-react";

const ToggleFilter = ({
  filters,
  categories,
  handlePriceChange,
  handleClear,
  handleChange,
  applyFilters,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden fixed top-[60px] left-0 right-0 z-99">
      {/* Slide Down Filter Panel */}
      <div
        className={`transition-all duration-300 ease-in-out bg-white rounded-b-2xl shadow-xl pb-4 px-4 ${
          isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0 overflow-hidden"
        }`}
      >
        <div className="space-y-4">
          {/* Category & Keyword */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="flex-1">
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
            <div className="flex-1">
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
      </div>

      {/* Toggle Button */}
      <div
        className={`fixed ${isOpen ? 'top-[345px]' : 'top-[84px]' } right-4 mx-auto w-fit ${isOpen ? 'mt-2' : ''} bg-[#4B49AC] text-white text-sm py-2 px-4 flex items-center justify-center gap-2 cursor-pointer rounded-full shadow-lg`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <SlidersHorizontal size={16} />
        {isOpen ? <span className="hidden sm:flex">Hide Filters</span> : <span className="hidden sm:flex">Show Filters</span>}
        {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </div>
    </div>
  );
};

export default ToggleFilter;
