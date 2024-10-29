import db from '@/lib/db';

/**
 *
 * @param {*} review
 * @returns {<Promise<Object>>}
 */

export async function createReview(review) {
  const query = `
        INSERT INTO public.reviews (rating, review_text, user_id, product_id)
        VALUES ($1, $2, $3, $4)
        RETURNING *;
    `;
  const values = [
    review.rating,
    review.review_text,
    review.user_id,
    review.product_id
  ];
  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
}
