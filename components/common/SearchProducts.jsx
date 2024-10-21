import SearchBar from './SearchBar';
import { getFilteredProducts } from '@/services/productService';
import Image from 'next/image';
import { formatPrice } from '@/utils/helper';
import Link from 'next/link';

export default async function SearchProducts({searchParams}) {
  const query = searchParams?.query || '';
  return (
    <div className='relative w-full'>
      <SearchBar/>
      <SearchResultList query={query}/>
    </div>
  )
}

async function SearchResultList({query}) {
  const products = await getFilteredProducts(query)
  if (query) {
    return (
      products.length > 0 ? (
      <ul className='flex flex-col gap-3 bg-primary rounded max-h-80
      [&::-webkit-scrollbar]:w-2
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-foreground
      max-w-sm absolute top-12 overflow-y-scroll'>
        {
          products.map((product) => (
            <li key={product.product_id}>
              <Link href={`/product/${product.product_id}`} className='flex flex-row gap-4 items-center text-xs hover:bg-background p-3 rounded'>
                <Image
                  src={product.image_url}
                  alt={product.name}
                  width={60}
                  height={60}
                  className="object-cover rounded-sm"
                />
                <div className='flex flex-col gap-2 w-full'>
                  <span className='text-base font-bold'>
                    {product.name}
                  </span>
                  <span>
                    Category: {product.category_name}
                  </span>
                  <span>
                    Price: {formatPrice(product.price)}
                  </span>
                </div>
              </Link>
            </li>
          ))
        }
      </ul>
      ) : (<p className='absolute top-11 text-center bg-primary text-text-950 rounded-md px-8 py-2'>No products found!</p>)
    )
  }
}
