'use server';

import { revalidatePath } from 'next/cache';
import { ReviewSchema } from '@/services/schemas/reviewSchema';
import { createReview } from '@/services/reviewService';
/**
 * Handle review creation.
 * @param {Object} previousState - Previous form state.
 * @param {FormData} formData - Form data.
 * @returns {Promise<Object|Array<Object>>} - Returns the newly created review object or an array of error objects.
 */
export async function reviewAction(previousState, formData) {
  const ratingSend = formData.get('rating');
  const review_text = formData.get('review_text');
  const user_id = formData.get('user_id');
  const product_id = formData.get('product_id');

  const isFormDataValid = {
    rating: Number(ratingSend),
    review_text,
    user_id,
    product_id
  };

  const validationResult = ReviewSchema.safeParse(isFormDataValid);
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      mesagge: 'Failed to create user account'
    };
  }

  await createReview(isFormDataValid);

  revalidatePath(`/products/${product_id}`, 'page');
  return { success: true, message: 'Review submitted successfully' };
}
