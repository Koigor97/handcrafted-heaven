"use client"; // Make this a Client Component

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterSidebar from '../layout/FilterSidebar';
import ProductGrid from '../layout/ProductGrid';
import Pagination from '../layout/Pagination'; // Import the Pagination component
import { Frown } from 'lucide-react';

export default function FilterableProducts({ products, categories, totalPages, showArrows }) {

  return (
    <div className="flex flex-wrap md:flex-nowrap max-w-custom-clamp2 mx-auto justify-center md:justify-start mb-2">
      {/* For small screens, center the sidebar */}
        <div className="flex max-w-xs">
          <FilterSidebar
            categories={categories}
          />
        </div>

      <div className="flex-grow mx-auto max-w-6xl ">
        {products.length === 0 && <div className='flex flex-col items-center justify-center gap-4'>
          <h1 className="text-center text-3xl font-bold">No products found</h1>
          <p className='text-center'>Try changing your filters or searching for another product</p>
          <Frown className="h-12 w-12"/>
          </div>}
        <ProductGrid products={products}/>
        {
          showArrows ? <Pagination
            totalPages={totalPages}/> : null
        }
      </div>
    </div>
  );
}
