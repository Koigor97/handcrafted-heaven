// userService.js - Service file to handle user account operations

import db from '@/lib/db';

/**
 * Retrive a user account from the database. Using the user's email address.
 *
 * @param {string} email - The email address of the user.
 * @returns {Promise<Object>} - A promise that resolves to the user account object.
 */
export async function getUserByEmail(email) {
  try {
    const query = `
            SELECT
                u.user_id,
                u.name,
                u.email,
                u.role,
                u.user_image_url,
                u.password
            FROM public.users u
            WHERE u.email = $1
        `;
    const result = await db.query(query, [email]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by email:', error);
    throw error;
  }
}

/**
 * Retrieve user image, name, id and role from the database. Using the user's id.
 *
 * @param {string} userId - The id of the user.
 * @returns {Promise<Object>} - A promise that resolves to the user account object.
 */
export async function getUserLoginById(userId) {
  try {
    const query = `
            SELECT
                u.user_id,
                u.name,
                u.role,
                u.user_image_url
            FROM public.users u
            WHERE u.user_id = $1
        `;

    const result = await db.query(query, [userId]);
    return result.rows[0];
  } catch (error) {
    console.error('Error fetching user by id:', error);
    throw error;
  }
}
