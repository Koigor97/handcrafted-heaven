import db from '../../lib/db';
import { notFound } from 'next/navigation';
import React from 'react';

export default async function ArtisansSection() {
  const artisans = await getFiveTopArtisans();

  return (
    <section className="text-center py-12">
      <h2 className="text-2xl font-semibold mb-4">
        Crafted by Passionate Hands
      </h2>
      <p className="text-base mb-8">
        Behind every unique piece is an artisan dedicated to their craft.
        Discover the creators who make Handcrafted Haven so special.
      </p>
      <div className="flex flex-wrap justify-around gap-6">
        {artisans.map((artisan) => (
          <ArtisanCard
            key={artisan.artisan_id}
            name={artisan.name}
            description={artisan.shop_description}
            imageUrl={artisan.user_image_url}
            profileLink={`/artisans/${artisan.artisan_id}`}
          />
        ))}
      </div>
    </section>
  );
}

const ArtisanCard = ({ name, description, imageUrl, profileLink }) => {
  return (
    <div className=" flex flex-col justify-between w-56 h-[500px] p-6">
      <img
        src={imageUrl}
        alt={`${name}`}
        className="w-32 h-auto block mx-auto rounded-full mb-4 object-contain"
      />
      <h3 className="text-lg font-medium mb-2">{name}</h3>
      <p className="text-sm mb-4">{description}</p>
      <a
        href={profileLink}
        className=".absolute bottom-0  inline-block px-4 py-2 bg-accent2-500 text-white rounded hover:bg-green-700"
      >
        View Profile
      </a>
    </div>
  );
};

async function getFiveTopArtisans() {
  const query = `
    SELECT a.artisan_id, a.shop_description, u.name, u.user_image_url
    FROM public.artisans a
    JOIN public.users u
    ON u.user_id = a.user_id
    ORDER BY total_sales DESC, rating DESC
    LIMIT 5
`;

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}
