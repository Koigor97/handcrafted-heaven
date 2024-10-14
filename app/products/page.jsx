// app/products/page.jsx
import ProductGrid from '@/components/layout/ProductGrid';
import HeroMain from '@/components/layout/HeroMain';
import { getAllProducts } from '@/services/productService';

export const metadata = {
  title: "Product Page",
  description: "Welcome to the product page",
};

export default async function ProductPage() {
  try {
    // Fetch products directly from the database
    const products = await getAllProducts();

    return (
      <div>
        <HeroMain />
        <div className="text-center my-8">
          <h1 className="text-4xl font-extrabold text-gray-800 mb-2">Our Products</h1>
          <p className="text-lg text-gray-500">Explore our curated selection of products</p>
          <div className="mt-4 h-1 w-20 bg-green-600 mx-auto rounded"></div>
        </div>
        <ProductGrid products={products} />
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
