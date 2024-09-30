/**
 * Cloudinary configuration file
 * This file sets up the Cloudinary API connection using environment
 * variables for cloud name, API key, and API secret.
 * It exports the configured Cloudinary object for use in other parts
 * of the application.
 */

import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export the cloudinary object
export default cloudinary;
