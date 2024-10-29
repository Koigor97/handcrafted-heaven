import { z } from 'zod';

export const ReviewSchema = z.object({
  user_id: z.string().uuid({ message: 'User ID is invalid' }),
  product_id: z.string().uuid({ message: 'Product ID is invalid' }),
  rating: z
    .number()
    .min(1, { message: 'Rating must be at least 1' }) // Mensaje personalizado
    .max(5, { message: 'Rating must be between 1 and 5' }),
  review_text: z.string().min(5, {
    message: 'Review text is required and must be at least 5 characters long'
  })
});
