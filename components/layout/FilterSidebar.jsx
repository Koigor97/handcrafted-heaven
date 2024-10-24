

import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the slider styles

function FilterSidebar({ categories, selectedCategories, priceRange, setSelectedCategories, setPriceRange, onApply, onReset }) {
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceChange = (value) => {
    setPriceRange(value); // value is an array with [min, max]
  };

  return (
    <aside className="w-64 max-w-xs p-4 mt-20">
      {/* Filter by Category */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Filter by Category</h4>
        <ul className="space-y-2">
          {categories.map((category) => (
            <li key={category.name} className="flex items-center">
              <input
                type="checkbox"
                className="mr-2"
                onChange={() => handleCategoryChange(category.name)}
                checked={selectedCategories.includes(category.name)}
              />
              <span>
                {category.name} ({category.count})
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Filter */}
      <div className="mb-6">
        <h4 className="font-bold mb-2">Filter by Price</h4>
        <div className="flex items-center justify-between mb-2">
          <span>Min: ${priceRange[0]}</span>
          <span>Max: ${priceRange[1]}</span>
        </div>
        
        {/* Dual-Handle Range Slider */}
        <Slider range
          min={0}
          max={1000} // Adjust max as needed
          value={priceRange}
          onChange={handlePriceChange}
          allowCross={false} // Prevent handles from crossing each other
          className="w-full"
        />
      </div>

      {/* Apply Filters Button */}
      <div className="flex space-x-2">
        <button
          onClick={onApply}
          className="w-full md:w-1/2 bg-green-500 text-white py-2 rounded-md hover:bg-green-700 transition"
        >
          Apply Filters
        </button>

        {/* Reset Filters Button */}
        <button
          onClick={onReset}
          className="w-full md:w-1/2 bg-destructive text-white py-2 rounded-md hover:bg-red-700 transition"
        >
          Reset Filters
        </button>
      </div>
    </aside>
  );
}

export default FilterSidebar;
