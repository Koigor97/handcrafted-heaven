// app/products/page.jsx
// import ProductGrid from '@/components/layout/ProductGrid';
import { Suspense } from 'react';
import HeaderMenu from '@/components/layout/HeaderMenu';
import HeroMain from '@/components/layout/HeroMain';
import FilterableProducts from '@/components/common/FilterableProducts';
import { getAllProducts, getCategories, getProductsByFilter } from '@/services/productService';
import ToolBar from '@/components/common/ToolBar';
import { getFilteredProducts } from '@/services/productService';

export const metadata = {
  title: "Product Page",
  description: "Welcome to the product page",
};

export default async function ProductPage({searchParams}) {
  const query = searchParams?.query || '';
  const categoriesQuery = searchParams?.categories || '';
  const price = searchParams?.price || '';

  // console.log(category, price)
  try {
    const categories = await getCategories(); // Fetch the categories
    const products = await getProductsByFilter(query, categoriesQuery)


    return (
      <div>
        <div className='flex items-center justify-end my-3 max-w-custom-clamp2 mx-auto'>
          <ToolBar/>
        </div>
        {/* <HeroMain />          */}
        <div className="text-center my-2 sm:text-center py-5 md:py-10">
          <div className='max-w-custom-clamp2 mx-auto'>

          <h1 className="text-4xl font-extrabold mb-2">Our Products</h1>
          <p className="text-lg">Discover a carefully curated selection of high-quality products designed to meet your every need. Whether you&#39;re looking for the latest trends or timeless classics, we offer a wide variety of items at unbeatable prices. Explore our collection and find exactly what you&#39;re looking for—quality and style, all in one place.</p>
          <div className="mt-4 h-1 w-20 bg-green-600 mx-auto rounded"></div>
          </div>
        </div>
            {/* <ProductGrid products={products} /> */}
        <Suspense fallback={<div>Loading...</div> }>
          <FilterableProducts products={products} categories={categories}/>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    return (
      <div>
        <h1 className="text-center text-4xl font-extrabold text-gray-800">Our Products</h1>
        <p>Error loading products. Please try again later.</p>
      </div>
    );
  }
}
