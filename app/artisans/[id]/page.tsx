import { notFound } from 'next/navigation';
import db from '../../../lib/db';
import React from 'react';

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id; // Extracting id from params
  console.log(params.id); // Should log: { id: 'c42ca76d-b067-461e-83aa-4c87177cdc0b' }

  return <main>Hello world</main>;
}

async function getFiveTopArtisans() {
  const query = `
    SELECT a.user_id, a.shop_description, u.name, u.user_image_url
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
