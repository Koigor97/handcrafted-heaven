// app/products/[id].jsx
import StarRating from '@/components/common/Ratings';
import { getProductById } from '@/services/productService';
import Image from 'next/image';

export default async function ProductDetails({ params }) {
  const { id } = params; // Accessing the dynamic route parameter 'id'

  // Fetch product by ID
  const product = await getProductById(id);

  // Handle case if product is not found
  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="max-w-7xl mx-auto p-8">
      {/* Product Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-8">
        {/* Product Image */}
        <div className="flex items-center justify-center bg-gray-100 rounded-lg p-8">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg shadow-lg"
            />
          ) : (
            <div className="h-64 w-full bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-5xl font-extrabold mb-4">{product.name}</h1>
            <StarRating />
            <p className="text-3xl text-green-600 mb-4">${Number(product.price || 0).toFixed(2)}</p>
            <p className="text-lg text-gray-600 mb-6">{product.description}</p>
            
            {/* Horizontal Divider */}
            <div className="h-1 w-20 bg-green-600 my-6 rounded"></div>

            {/* Stock Information */}
            <p className="text-md text-gray-500">Stock: {product.quantity_in_stock} available</p>


          </div>

          {/* Add to Cart / Wishlist Buttons */}
          <div className="mt-8 flex gap-4">
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-500">
              Add to Cart
            </button>
            <button className="border border-gray-300 text-gray-600 px-6 py-3 rounded-lg hover:border-gray-400">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">Product Details</h2>
        <div className="text-lg text-gray-600 leading-relaxed">
          {/* Additional details, categories, or features can go here */}
          <p>Category: {product.category_name}</p>
          <p>Artisan: {product.artisan_name}</p>
          {/* You can add more details here, like reviews or related products */}
        </div>
      </div>
    </div>
  );
}
