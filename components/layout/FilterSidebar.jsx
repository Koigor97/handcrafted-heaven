"use client";

import React from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the slider styles
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import Link from 'next/link';
import { useState } from 'react';

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

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleClickCategory = useDebouncedCallback((category) => {
    const params = new URLSearchParams(searchParams);
    const currentCategories = params.getAll('categories'); // Obtiene todas las categorías actuales

    // Si la categoría ya está seleccionada, la eliminamos
    if (currentCategories.includes(category)) {
      // Filtrar las categorías para eliminar la categoría seleccionada
      const updatedCategories = currentCategories.filter(cat => cat !== category);

      // Si no hay más categorías, eliminamos el parámetro
      if (updatedCategories.length === 0) {
        params.delete('categories');
      } else {
        // Si quedan categorías, actualizamos la URL
        params.delete('categories'); // Primero borramos todos
        updatedCategories.forEach(cat => params.append('categories', cat)); // Luego agregamos las restantes
      }
    } else {
      // Si no está seleccionada, la añadimos
      params.append('categories', category);
    }

    // Actualizar la URL
    replace(`${pathname}?${params.toString()}`);
  });



  return (
    <div className="p-4 md:px-2 md:py-8">

      <aside className="hidden w-full md:flex md:flex-col md:w-64">
        <SearchBar/>

        {/* Filter by Category */}
        <div className="mb-6">
          <h4 className="font-bold mb-2">Filter by Category</h4>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category.name} className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  onChange={() => handleClickCategory(category.name)}
                  checked={searchParams.getAll('categories').includes(category)}
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
            styles={{
                  track: {
                    backgroundColor: '#b3b3b3',
                  },
                  rail: {
                    backgroundColor: '#333333',
                  },
                  handle: {
                    borderColor: '#b3b3b3',
                  }
                }}
          />
        </div>
      </aside>

      <Menubar className="flex md:hidden my-3">
        <MenubarMenu>
          <MenubarTrigger className="px-1.5">
            Filter by Category <ChevronDown className='stroke-1'/>
          </MenubarTrigger>
          <MenubarContent className="bg-primary">
            {
              categories.map((category) => (
                <MenubarCheckboxItem
                key={category.name}
                value={category.name}
                onClick={() => handleCategoryChange(category.name)}
                checked={selectedCategories.includes(category.name)}
                >
                  {category.name} ({category.count})
                </MenubarCheckboxItem>
              ))
            }
          </MenubarContent>
        </MenubarMenu>
        <MenubarMenu>
          <MenubarTrigger className="px-1.5">
            Filter by Price <ChevronDown className='stroke-1'/>
          </MenubarTrigger>
          <MenubarContent className="bg-primary px-4">
            <div className="mb-6">
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
                styles={{
                  track: {
                    backgroundColor: '#f6f3ee',
                  },
                  rail: {
                    backgroundColor: '#a0a58d',
                  },
                  handle: {
                    borderColor: '#a0a58d',
                  }
                }}
              />
            </div>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      {/* Apply Filters Button */}
        <div className="flex space-x-2">
          <button
            onClick={onApply}
            className="w-full md:w-1/2 text-foreground border-2 border-foreground py-2 rounded-md hover:bg-foreground hover:text-text-50 transition"
          >
            Apply Filters
          </button>

          {/* Reset Filters Button */}
          <button
            onClick={onReset}
            className="w-full md:w-1/2 bg-foreground border-2 border-foreground text-text-50 py-2 rounded-md hover:bg-transparent hover:text-foreground transition"
          >
            Reset Filters
          </button>
        </div>
    </div>
  );
}

export default FilterSidebar;
