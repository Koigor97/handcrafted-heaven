// userService.js - Service file to handle user account operations

import db from "@/lib/db";

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
    console.error("Error fetching user by email:", error);
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
    console.error("Error fetching user by id:", error);
    throw error;
  }
}

/**
 * Get artisan details along with their products and orders made on those products.
 *
 * @param {number} userId - The ID of the artisan user.
 * @returns {Promise<Object>} - Returns the artisan details, products, and orders.
 */
export async function getArtisanDashboardData(userId) {
  try {
    const artisanQuery = `
      SELECT a.shop_name, a.shop_logo_url, u.name
      FROM public.artisans a
      JOIN public.users u ON a.user_id = u.user_id
      WHERE u.user_id = $1;
    `;
    const artisanResult = await db.query(artisanQuery, [userId]);
    const artisanDetails = artisanResult.rows[0];

    if (!artisanDetails) {
      throw new Error("Artisan not found");
    }

    const productsQuery = `
      SELECT * FROM public.products WHERE artisan_id = (SELECT artisan_id FROM public.artisans WHERE user_id = $1);
    `;
    const productsResult = await db.query(productsQuery, [userId]);
    const products = productsResult.rows;

    const ordersQuery = `
      SELECT o.*, oi.product_id, oi.quantity
      FROM public.orders o
      JOIN public.order_items oi ON o.order_id = oi.order_id
      WHERE oi.product_id IN (
        SELECT product_id FROM public.products WHERE artisan_id = (SELECT artisan_id FROM public.artisans WHERE user_id = $1)
      );
    `;
    const ordersResult = await db.query(ordersQuery, [userId]);
    const orders = ordersResult.rows;

    return {
      artisanDetails,
      products,
      orders,
    };
  } catch (error) {
    console.error("Error fetching artisan dashboard data:", error);
    throw error;
  }
}

// salesService.js - Fetch sales and revenue data
export async function getArtisanSalesData(artisanId) {
  try {
    const salesQuery = `
      SELECT 
        to_char(o.created_at, 'Month') AS month, 
        SUM(o.total_amount) AS revenue, 
        COUNT(o.order_id) AS total_sales
      FROM public.orders o
      JOIN public.order_items oi ON o.order_id = oi.order_id
      WHERE oi.product_id IN (
        SELECT product_id FROM public.products WHERE artisan_id = $1
      )
      GROUP BY month
      ORDER BY month;
    `;
    const result = await db.query(salesQuery, [artisanId]);
    return result.rows;
  } catch (error) {
    console.error("Error fetching sales data:", error);
    throw error;
  }
}

/**
 * Fetches dashboard metrics for an artisan.
 *
 * @param {number} artisanId - The ID of the artisan to fetch metrics for.
 * @returns {Promise<Object>} - A promise that resolves to an object with the following properties:
 *   totalSales: The total sales of the artisan.
 *   ordersCompleted: The total number of orders completed by the artisan.
 *   revenue: The total revenue of the artisan.
 *   itemsSold: The total number of items sold by the artisan.
 */
export async function getDashboardMetrics(artisanId) {
  try {
    const totalSalesQuery = `
      SELECT SUM(price * quantity_in_stock) as total_sales
      FROM public.products
      WHERE artisan_id = $1;
    `;
    const ordersCompletedQuery = `
      SELECT COUNT(order_id) as orders_completed
      FROM public.orders o
      JOIN public.products p ON o.product_id = p.product_id
      WHERE p.artisan_id = $1 AND o.status = 'completed';
    `;
    const revenueQuery = `
      SELECT SUM(amount) as revenue
      FROM public.payments pay
      JOIN public.orders o ON pay.order_id = o.order_id
      JOIN public.products p ON o.product_id = p.product_id
      WHERE p.artisan_id = $1 AND pay.payment_status = 'completed';
    `;
    const itemsSoldQuery = `
      SELECT SUM(quantity) as items_sold
      FROM public.order_items oi
      JOIN public.products p ON oi.product_id = p.product_id
      WHERE p.artisan_id = $1;
    `;

    const totalSales = await db.query(totalSalesQuery, [artisanId]);
    const ordersCompleted = await db.query(ordersCompletedQuery, [artisanId]);
    const revenue = await db.query(revenueQuery, [artisanId]);
    const itemsSold = await db.query(itemsSoldQuery, [artisanId]);

    return {
      totalSales: totalSales.rows[0].total_sales || 0,
      ordersCompleted: ordersCompleted.rows[0].orders_completed || 0,
      revenue: revenue.rows[0].revenue || 0,
      itemsSold: itemsSold.rows[0].items_sold || 0,
    };
  } catch (error) {
    console.error("Error fetching dashboard metrics:", error);
    throw error;
  }
}

// services/artisanService.js

/**
 * Get the artisan ID from the artisan table using the user ID (foreign key).
 *
 * @param {number} userId - The user ID to retrieve the artisan ID.
 * @returns {Promise<number>} - A promise that resolves to the artisan ID.
 */
export async function getArtisanIdByUserId(userId) {
  const query = `
    SELECT artisan_id
    FROM public.artisans
    WHERE user_id = $1
  `;
  try {
    const result = await db.query(query, [userId]);
    console.log("Query Statement result", result.rows);
    if (result.rows.length === 0) {
      throw new Error("Artisan not found for the given user ID");
    }
    return result.rows[0].artisan_id;
  } catch (error) {
    console.error("Error fetching artisan ID by user ID:", error);
    throw error;
  }
}
