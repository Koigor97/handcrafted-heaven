import jwt from "jsonwebtoken";

export const createToken = (user) => {
  return jwt.sign(
    {
      id: user.user_id,
      role: user.role, // artisan or user
    },
    process.env.JWT_SECRET, // Make sure to add this in your .env file
    { expiresIn: "1sec" }
  );
};
