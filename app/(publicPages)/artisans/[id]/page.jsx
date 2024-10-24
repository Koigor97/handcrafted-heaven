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

  console.log(artisan);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white shadow-md rounded-lg flex w-3/4 max-w-6xl">
        {/* Left Side - Artisan Details */}
        <div className="w-1/2 p-8">
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
              <span className="font-semibold">Address:</span>{' '}
              {artisan.address || 'Shop Address.'}
            </p>
            <p className="text-gray-800">
              <span className="font-semibold">Phone:</span>{' '}
              {artisan.phone || 'Shop Phone.'}
            </p>
          </div>
        </div>
        {/* Right Side - Shop Logo */}
        <div className="w-1/2 bg-gray-200 flex justify-center items-center">
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
      </div>
    </div>
  );
}

async function getArtisanInfo(artisanId) {
  const query = `
    SELECT a.artisan_id, a.shop_description, u.name, u.user_image_url, a.bio, a.shop_name, a.shop_logo_url, u.address, u.phone
    FROM public.artisans a
    JOIN public.users u
    ON u.user_id = a.user_id
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
