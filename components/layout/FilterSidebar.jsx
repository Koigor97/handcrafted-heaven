"use client";

import React, { useEffect } from 'react';
import Slider, { Range } from 'rc-slider';
import 'rc-slider/assets/index.css'; // Import the slider styles
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar"
import { ChevronDown } from 'lucide-react';
import SearchBar from '../common/SearchBar';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useState } from 'react';

function FilterSidebar({ categories }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [localPriceRange, setLocalPriceRange] = useState([0, 1000]);

  useEffect(() => {
    const currentCategories = searchParams.get('categories');
    const categoriesArray = currentCategories ? currentCategories.split(',') : [];
    setCategoriesSelected(categoriesArray);
  }, [searchParams])

  const handleClickCategory = useDebouncedCallback((category) => {
    const params = new URLSearchParams(searchParams);
    const index = categoriesSelected.indexOf(category);

    if (index !== -1) {
      categoriesSelected.splice(index, 1);
    } else {
      categoriesSelected.push(category);
    }

    if(categoriesSelected.length === 0) {
      params.delete('categories');
    } else {
      params.set('categories', categoriesSelected.join(','));
    }

    // Actualizamos la URL
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  const handlePriceChange = (value) => {
    setLocalPriceRange(value); // Actualiza el estado local inmediatamente
    // Llama a la función debounced solo para actualizar la URL
    debouncedUpdatePrice(value);
  };

// Define la función debounced que actualiza la URL
  const debouncedUpdatePrice = useDebouncedCallback((value) => {
    const params = new URLSearchParams(searchParams);

    if (value[0] === 0 && value[1] === 1000) {
      params.delete('price'); // Elimina el parámetro de precio si es el valor por defecto
    } else {
      params.set('price', `${value[0]}-${value[1]}`);
    }
    replace(`${pathname}?${params.toString()}`);
  }, 400);

  return (
    <div className="p-4 md:px-2">
      <div className='mb-6'>
          <h4 className='text-sm md:text-base md:font-bold mb-2'>Filter By Name</h4>
          <SearchBar/>
        </div>
      <aside className="hidden w-full md:flex md:flex-col md:w-64">

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
                  checked={categoriesSelected.includes(category.name)}
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
            <span>Min: ${localPriceRange[0]}</span>
            <span>Max: ${localPriceRange[1]}</span>
          </div>

          {/* Dual-Handle Range Slider */}
          <Slider range
            min={0}
            max={1000} // Adjust max as needed
            value={localPriceRange}
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

      <Menubar className="h-max md:hidden my-3">
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
                onClick={() => handleClickCategory(category.name)}
                checked={categoriesSelected.includes(category.name)}
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
                <span className='text-sm md:text-base'>Min:${localPriceRange[0]}</span>
                <span className='text-sm md:text-base'>Max:${localPriceRange[1]}</span>
              </div>

              {/* Dual-Handle Range Slider */}
              <Slider range
                min={0}
                max={1000} // Adjust max as needed
                value={localPriceRange}
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
    </div>
  );
}

export default FilterSidebar;
