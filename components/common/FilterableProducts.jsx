"use client"; // Make this a Client Component

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import FilterSidebar from '../layout/FilterSidebar';
import ProductGrid from '../layout/ProductGrid';
import Pagination from '../layout/Pagination'; // Import the Pagination component

export default function FilterableProducts({ products, categories }) {
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 7; // Number of items per page
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const priceQuery = searchParams.get('price');
    const categoriesQuery = searchParams.get('categories');

    if (priceQuery) {
      const [min, max] = priceQuery.split('-').map(Number);
      setPriceRange([min, max]);
    }

    if (categoriesQuery) {
      setSelectedCategories(categoriesQuery.split(','));
    }
  }, [searchParams]); // This should only run when the URL changes

  // Function to apply filters
  const applyFilters = () => {
    const filtered = products.filter((product) => {
      const inPriceRange = product.price >= priceRange[0] && product.price <= priceRange[1];
      const inCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_name);
      return inPriceRange && inCategory;
    });

    setFilteredProducts(filtered);
    setCurrentPage(1); // Reset to the first page when filters change
  };

  const updateUrlParams = () => {
    // Update the URL with query parameters for filters
    const query = {
      price: `${priceRange[0]}-${priceRange[1]}`,
      categories: selectedCategories.join(','),
    };

    const queryString = new URLSearchParams(query).toString();
    router.push(`/products?${queryString}`, undefined, { shallow: true });
  };

  const handleApplyFilters = () => {
    applyFilters(); // Apply filters when the button is clicked
    updateUrlParams(); // Update the URL when filters are explicitly applied
  };

  const resetFilters = () => {
    setFilteredProducts(products);
    setPriceRange([0, 1000]);
    setSelectedCategories([]);
    setCurrentPage(1); // Reset to the first page when filters reset
    router.push('/products'); // Reset the URL
  };

  // Get the current products for the current page
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Pagination handler
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex flex-wrap md:flex-nowrap max-w-custom-clamp2 mx-auto justify-center md:justify-start">
      {/* For small screens, center the sidebar */}
        <div className="flex max-w-xs">
          <FilterSidebar
            categories={categories}
            selectedCategories={selectedCategories}
            priceRange={priceRange}
            setSelectedCategories={setSelectedCategories}
            setPriceRange={setPriceRange}
            onApply={handleApplyFilters}
            onReset={resetFilters}
          />
        </div>

      <div className="flex-grow p-4 mx-auto max-w-6xl ">
        <ProductGrid products={products} className="bg-red-100"/>
        {/* Pagination Component */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
