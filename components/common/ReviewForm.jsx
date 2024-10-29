// components/common/ReviewForm.jsx
"use client";

import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import StarRating from './Rating'; // Assuming this is your existing star rating component
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useFormState } from 'react-dom';

export default function ReviewForm({ userName, userId, reviewAction, productId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(reviewAction, initialState);

  useEffect(() => {
    if (state && state.message) {
      setRating(0); // Restablecer la calificación
      setComment(""); // Borrar el contenido del Textarea
    }
  }, [state]);

  return (
    <div className="max-w-lg mt-8 p-4 bg-accent1-100 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Write a Review</h3>
      <form action={formAction} className="flex flex-col gap-3">
        <input type='hidden' value={userId} name='user_id'/>
        <input type='hidden' value={productId} name='product_id'/>
        <div className='flex flex-col gap-1'>
            <label htmlFor="user_name" className="text-sm text-gray-700">
            Your Name
            </label>
            <input
            type="text"
            placeholder="Your Name"
            value={userName}
            className="rounded bg-accent1-100"
            id="user_name"
            name="user_name"
            disabled
            />
        </div>

        <div className='flex flex-col gap-1'>
            <label htmlFor='rating' className='text-sm text-gray-700'>Rating</label>
            <input type='hidden' value={rating} name='rating'/>
            <StarRating onSetRating={setRating} defaultRating={rating} size={24}/>
            {
              state?.errors?.rating && (
                <p style={{ color: "red" }}>{state.errors.rating}</p>
              )
            }
        </div>

        <Textarea
          id="review_text"
          placeholder="Write your review..."
          name="review_text"
          className="resize-none"
          value={comment} // Vincular el valor del Textarea con el estado
          onChange={(e) => setComment(e.target.value)} // Actualizar el estado al cambiar
        />
        {
            state?.errors?.review_text && (
              <p style={{ color: "red" }}>{state.errors.review_text}</p>
            )
        }

        <Button
          type="submit"
          className="px-4 py-2 rounded"
        >
          Submit Review
        </Button>
      </form>
    </div>
  );
}

ReviewForm.propTypes = {
  onSubmitReview: PropTypes.func.isRequired,
};