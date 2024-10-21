"use client";

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { addItemToLocalStorage, findItemInLocalStorage, deleteItemFromLocalStorage } from '@/utils/helper';

function Product({ id, image, name, price, quantity }) {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const handleWishlistClick = () => {
    if (findItemInLocalStorage('wishlist', id)) {
      deleteItemFromLocalStorage('wishlist', id);
      setIsWishlisted(false);
      window.dispatchEvent(new Event('wishlistUpdated'));
    } else {
      addItemToLocalStorage('wishlist', {productId: id, name, imageUrl: image});
      setIsWishlisted(!isWishlisted)
      window.dispatchEvent(new Event('wishlistUpdated'))
    }
  };

  const checkProductInWishlist = useCallback(() => {
    const isProductInWishlist = findItemInLocalStorage('wishlist', id);
    setIsWishlisted(isProductInWishlist);
  }, [id]);

  useEffect(() => {

    checkProductInWishlist();

    window.addEventListener('deletedFromWishlist', checkProductInWishlist)

    return () => {
      window.removeEventListener('deletedFromWishlist', checkProductInWishlist)
    }

  }, [id, checkProductInWishlist])

  return (
    <div className="relative bg-white rounded-lg shadow-lg overflow-hidden p-3 max-w-[200px] mx-auto w-full">
      <button onClick={handleWishlistClick} className="absolute top-2 right-2 text-gray-300 hover:text-red-500">
        <FaHeart className={`text-lg ${isWishlisted ? 'text-red-500' : ''}`} />
      </button>
      <Link href={`/product/${id}`}>
        {image ? (
          <Image
            src={image}
            alt={name}
            width={200}
            height={200}
            className="object-cover rounded-t-lg"
          />
        ) : (
          <div className="h-36 w-full bg-gray-200 rounded-t-lg flex items-center justify-center text-gray-500">
            No Image Available
          </div>
        )}
      </Link>
      <div className="p-2 text-center">
        <Link href={`/product/${id}`}>
          <h3 className="font-bold text-sm truncate">{name}</h3>
        </Link>
        <p className="text-sm text-gray-600">${Number(price || 0).toFixed(2)}</p>
        <p className="text-xs text-gray-500">Stock: {quantity}</p>
      </div>
    </div>
  );
}

export default Product;
