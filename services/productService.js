/**
 * Product Service Module
 *
 * This module provides a set of functions for interacting with product data in the database.
 * It includes operations for retrieving, creating, updating, and deleting products.
 *
 * The module uses the database connection established in the db module to execute SQL queries.
 *
 * Functions:
 * - getAllProducts(): Retrieves all products with related artisan and category information.
 * - getProductById(productId): Fetches a single product by its ID.
 * - addProduct(product): Adds a new product to the database.
 * - updateProduct(productId, productData): Updates an existing product.
 * - deleteProduct(productId): Removes a product from the database.
 *
 * Each function handles its own error logging and throws errors for the caller to handle.
 *
 * Usage:
 * const productService = require('./productService');
 * const allProducts = await productService.getAllProducts();
 *
 * Note: This service assumes the existence of 'products', 'artisans', and 'categories' tables
 * in the database with appropriate relationships.
 *
 * @module productService
 * @requires ../lib/db
 */

import db from '../lib/db';

/**
 * Get all products from the database.
 * This function fetches all products and their related categories and artisans.
 *
 * @returns {Promise<Array>} - A promise that resolves to an array of product objects.
 */
export async function getAllProducts() {
  const query = `
    SELECT
      p.product_id,
      p.name,
      p.description,
      p.price,
      p.quantity_in_stock,
      p.image_url,
      a.shop_name AS artisan_name,
      c.name AS category_name
    FROM public.products p
    JOIN public.artisans a ON p.artisan_id = a.artisan_id
    JOIN public.categories c ON p.category_id = c.category_id
  `;

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get a product by its ID from the database.
 *
 * @param {number} productId - The ID of the product to retrieve.
 * @returns {Promise<Object>} - A promise that resolves to the product object.
 */
export async function getProductById(productId) {
  const query = `
    SELECT
      p.product_id,
      p.name,
      p.description,
      p.price,
      p.quantity_in_stock,
      p.image_url,
      a.shop_name AS artisan_name,
      c.name AS category_name
    FROM public.products p
    JOIN public.artisans a ON p.artisan_id = a.artisan_id
    JOIN public.categories c ON p.category_id = c.category_id
    WHERE p.product_id = $1
  `;
  try {
    const result = await db.query(query, [productId]);
    return result.rows[0];
  } catch (error) {
    console.error(`Error fetching product with ID ${productId}:`, error);
    throw error;
  }
}

/**
 * Add a new product to the database.
 *
 * @param {Object} product - The product data to be inserted.
 * @param {string} product.name - The name of the product.
 * @param {string} product.description - The description of the product.
 * @param {number} product.price - The price of the product.
 * @param {number} product.quantity_in_stock - The quantity in stock.
 * @param {string} product.image_url - The URL of the product image.
 * @param {number} product.artisan_id - The ID of the artisan.
 * @param {number} product.category_id - The ID of the category.
 * @returns {Promise<Object>} - A promise that resolves to the newly created product.
 */
export async function addProduct(product) {
  const query = `
    INSERT INTO public.products (name, description, price, quantity_in_stock, image_url, artisan_id, category_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `;
  const values = [
    product.name,
    product.description,
    product.price,
    product.quantity_in_stock,
    product.image_url,
    product.artisan_id,
    product.category_id
  ];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error('Error adding new product:', error);
    throw error;
  }
}

/**
 * Update an existing product in the database.
 *
 * @param {number} productId - The ID of the product to update.
 * @param {Object} productData - The updated product data.
 * @returns {Promise<Object>} - A promise that resolves to the updated product.
 */
export async function updateProduct(productId, productData) {
  const query = `
    UPDATE public.products
    SET name = $1, description = $2, price = $3, quantity_in_stock = $4, image_url = $5, artisan_id = $6, category_id = $7
    WHERE product_id = $8
    RETURNING *;
  `;
  const values = [
    productData.name,
    productData.description,
    productData.price,
    productData.quantity_in_stock,
    productData.image_url,
    productData.artisan_id,
    productData.category_id,
    productId
  ];

  try {
    const result = await db.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error(`Error updating product with ID ${productId}:`, error);
    throw error;
  }
}

/**
 * Delete a product from the database by its ID.
 *
 * @param {number} productId - The ID of the product to delete.
 * @returns {Promise<void>}
 */
export async function deleteProduct(productId) {
  const query = `
    DELETE FROM public.products WHERE product_id = $1;
  `;
  try {
    await db.query(query, [productId]);
  } catch (error) {
    console.error(`Error deleting product with ID ${productId}:`, error);
    throw error;
  }
}

/**
 * Get products based on a query
 *
 * @param {string} searchQuery - The query from the search bar
 * @returns {Promise<Array>} - A promise that resolves to an array of product objects.
 */
export async function getFilteredProducts(searchQuery) {
  const searchTerm = '%' + searchQuery + '%';
  const query = ` SELECT
      p.product_id,
      p.name,
      p.description,
      p.price,
      p.quantity_in_stock,
      p.image_url,
      a.shop_name AS artisan_name,
      c.name AS category_name
    FROM public.products p
    JOIN public.artisans a ON p.artisan_id = a.artisan_id
    JOIN public.categories c ON p.category_id = c.category_id
    WHERE
      p.name ILIKE $1 OR
      c.name ILIKE $1 OR
      p.price::text ILIKE $1
    `;

  try {
    const result = await db.query(query, [searchTerm]);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

/**
 * Get products based on featured column
 * This function fetches products from the database based on the featured column if columns is True the values will be returned.
 * @returns {Promise<Array>} - A promise that resolves to an array of product objects.
 */
export async function getFeaturedProducts() {
  const query = `
    SELECT
    p.product_id,
      p.name,
      p.price,
      p.quantity_in_stock,
      p.image_url
    FROM public.products p
    WHERE p.featured IS NULL
  `;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching featured products:', error);
    throw error;
  }
}

/**
 * Get products based on the raiting of the product
 * This function fetches products from the database based on the rating in the review table, if rating >= 4 the products will be returned.
 * @returns {Promise<Array>} - A promise that resolves to an array of product objects.
 */
export async function getProductsByRating() {
  const query = `
    SELECT
      p.product_id,
      p.name,
      p.price,
      p.quantity_in_stock,
      p.image_url
    FROM public.products p
    JOIN public.reviews r ON p.product_id = r.product_id
    WHERE r.rating >= 4
  `;
  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching products by rating:', error);
    throw error;
  }
}
