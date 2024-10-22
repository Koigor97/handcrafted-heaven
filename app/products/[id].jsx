import { getProductById } from '@/services/productService';
import Image from 'next/image';

export async function getServerSideProps({ params }) {
  const { productId } = params;
  const product = await getProductById(productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: { product },
  };
}

export default function ProductDetails({ product }) {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="flex items-center justify-center">
          {product.imageUrl ? (
            <Image
              src={product.imageUrl}
              alt={product.name}
              width={500}
              height={500}
              className="object-cover rounded-lg"
            />
          ) : (
            <div className="h-64 w-full bg-gray-200 flex items-center justify-center text-gray-500">
              No Image Available
            </div>
          )}
        </div>

        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl text-gray-700 mb-4">${Number(product.price || 0).toFixed(2)}</p>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="text-sm text-gray-500">Stock: {product.stock}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
