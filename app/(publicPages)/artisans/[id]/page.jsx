import { notFound } from 'next/navigation';
import db from '../../../../lib/db';
import React from 'react';

export default async function ArtisanPage({ params }) {
  const id = params.id; // Extracting id from params
  const artisans = await getArtisanInfo(id);
  const artisan = artisans[0];
  if (!artisan) {
    notFound();
  }

  console.log(artisans);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 my-4">
      <div className="bg-white shadow-md rounded-lg flex flex-col md:flex-row w-11/12 md:w-3/4 max-w-6xl">
        <div className="w-full md:w-1/2 flex justify-center items-start p-4 md:p-0">
          {artisan.shop_logo_url ? (
            <img
              src={artisan.shop_logo_url}
              alt={`${artisan.shop_name} Logo`}
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="text-gray-400">[Logo Placeholder]</div>
          )}
        </div>
        {/* Bottom Section on Mobile - Artisan Details */}
        <div className="w-full md:w-1/2 p-6 md:p-8">
          <h1 className="text-2xl font-bold mb-4">
            {artisan.shop_name || 'Shop Name'}
          </h1>
          <p className="text-gray-600 mb-6">
            {artisan.bio || 'Short bio about the artisan or the shop.'}
          </p>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              {artisan.user_image_url ? (
                <img
                  src={artisan.user_image_url}
                  alt={`${artisan.name}'s Profile`}
                  className="w-16 h-16 rounded-full object-cover"
                />
              ) : (
                <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                  No Image
                </div>
              )}
              <p className="text-gray-800 font-medium">
                {artisan.name || 'Owner Name'}
              </p>
            </div>
            <p className="text-gray-800">
              <span className="font-semibold">Address:</span>{' '}
              {artisan.address || 'Shop Address'}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Shop Description:</span>{' '}
              {artisan.shop_description || 'Description of the shop.'}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Phone:</span>{' '}
              {artisan.phone || 'Shop Phone.'}
            </p>
          </div>
          {/* Product Section */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Products</h2>
            {artisans.map((product) => (
              <div
                key={product.product_id}
                className="mb-4 p-4 border rounded flex items-center space-x-4"
              >
                {product.product_image_url ? (
                  <img
                    src={product.product_image_url}
                    alt={product.product_name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-500">
                    No Image
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-lg font-medium">
                    {product.product_name}
                  </h3>
                  <a
                    href={`/products/${product.product_id}`}
                    className="inline-block mt-2 text-blue-500 hover:text-blue-700"
                  >
                    View Product
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

async function getArtisanInfo(artisanId) {
  const query = ` SELECT a.artisan_id, 
           a.shop_description, 
           u.name, 
           u.user_image_url, 
           a.bio, 
           a.shop_name, 
           a.shop_logo_url, 
           u.address, 
           u.phone, 
           p.product_id,
           p.name AS product_name,
           p.image_url AS product_image_url
    FROM public.artisans a
    JOIN public.users u
      ON u.user_id = a.user_id
    LEFT JOIN public.products p
      ON p.artisan_id = a.artisan_id
    WHERE a.artisan_id = $1
    ORDER BY total_sales DESC, rating DESC
  `;

  try {
    const result = await db.query(query, [artisanId]);
    return result.rows;
  } catch (error) {
    notFound();
  }
}
