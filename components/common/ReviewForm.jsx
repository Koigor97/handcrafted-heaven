// components/common/ReviewForm.jsx
"use client";

import { useState } from "react";
import PropTypes from "prop-types";
import StarRating from "./Ratings"; // Assuming this is your existing star rating component

export default function ReviewForm({ onSubmitReview }) {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setName("");
    setRating(0);
    setComment("");
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-md">
      <h3 className="text-2xl font-semibold mb-4">Write a Review</h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="border p-2 rounded"
        />

        <StarRating onSetRating={setRating} defaultRating={rating} />
        
        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          className="border p-2 rounded"
          required
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500"
        >
          Submit Review
        </button>
      </form>
    </div>
  );
}

ReviewForm.propTypes = {
  onSubmitReview: PropTypes.func.isRequired,
};
