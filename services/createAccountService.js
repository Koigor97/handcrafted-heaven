// createAccount.js - Service file to handle creating user and artisan accounts

import db from "@/lib/db";
import bcrypt from "bcryptjs";

/**
 * Create a user account in the database.
 *
 * @param {Object} userData - User account information.
 * @param {string} userData.name - The name of the user.
 * @param {string} userData.email - The email address of the user.
 * @param {string} userData.password - The password of the user.
 * @param {string} [userData.oauth_provider] - The OAuth provider (if any).
 * @param {string} [userData.oauth_id] - The OAuth user ID (if any).
 * @param {string} [userData.role] - The role of the user ('customer', 'artisan', 'admin'). Default is 'customer'.
 * @returns {Promise<Object>} - Returns the newly created user object.
 */
export async function createUserAccount(userData) {
  try {
    // Hash password if provided (OAuth users won't have a password)
    const hashedPassword = userData.password
      ? await bcrypt.hash(userData.password, 12)
      : null;

    const query = `
      INSERT INTO public.users (name, email, password, oauth_provider, oauth_id, role, address, phone, user_image_url)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
      RETURNING *;
    `;
    const values = [
      userData.name,
      userData.email,
      hashedPassword,
      userData.oauth_provider || null,
      userData.oauth_id || null,
      userData.role || "customer",
      userData.address || null,
      userData.phone || null,
      userData.user_image_url || null,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating user account:", error);
    throw error;
  }
}

/**
 * Create an artisan account in the database.
 *
 * @param {Object} artisanData - Artisan account information.
 * @param {number} artisanData.user_id - The user ID (foreign key) of the artisan.
 * @param {string} artisanData.bio - The bio of the artisan.
 * @param {string} artisanData.shop_name - The name of the artisan's shop.
 * @param {string} artisanData.shop_description - The description of the artisan's shop.
 * @param {string} [artisanData.shop_logo_url] - The URL of the artisan's shop logo.
 * @returns {Promise<Object>} - Returns the newly created artisan object.
 */
export async function createArtisanAccount(artisanData) {
  try {
    const query = `
      INSERT INTO public.artisans (user_id, bio, shop_name, shop_description, shop_logo_url, rating, total_sales)
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *;
    `;
    const values = [
      artisanData.user_id,
      artisanData.bio,
      artisanData.shop_name,
      artisanData.shop_description,
      artisanData.shop_logo_url || null,
      artisanData.rating || 0,
      artisanData.total_sales || 0,
    ];

    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Error creating artisan account:", error);
    throw error;
  }
}

// export default {
//   createUserAccount,
//   createArtisanAccount,
// };
