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

export async function getLimitedProductsForTesting() {
  const query = `
    SELECT
      p.product_id,
      p.name,
      p.price,
      p.image_url,
      p.quantity_in_stock
    FROM public.products p
    LIMIT 5

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
    c.name AS category_name,
    -- Agrupa todas las reseñas en un array de JSON
    COALESCE(
        JSON_AGG(
            JSON_BUILD_OBJECT(
                'user_id', r.user_id,
                'rating', r.rating,
                'review_text', r.review_text,
                'user_name', u.name,
                'user_image_url', u.user_image_url
            )
        ) FILTER (WHERE r.review_id IS NOT NULL),
        '[]'
    ) AS reviews
    FROM public.products p
    JOIN public.artisans a ON p.artisan_id = a.artisan_id
    JOIN public.categories c ON p.category_id = c.category_id
    LEFT JOIN public.reviews r ON p.product_id = r.product_id
    LEFT JOIN public.users u ON r.user_id = u.user_id
    WHERE p.product_id = $1
    GROUP BY
        p.product_id, p.name, p.description, p.price,
        p.quantity_in_stock, p.image_url, a.shop_name, c.name;
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
    WHERE p.featured
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
    SELECT DISTINCT
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

/**
 * Get all categories with product count.
 */
export async function getCategories() {
  const query = `
    SELECT
      c.name,
      COUNT(p.product_id) AS count
    FROM public.categories c
    LEFT JOIN public.products p ON p.category_id = c.category_id
    GROUP BY c.category_id
    ORDER BY count DESC
  `;

  try {
    const result = await db.query(query);
    return result.rows;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Get products based on name, category and price
 * This function fetches products from the database based on the name, category and price, the values will be returned, even if one of the values is empty, and the pagination is also returned.
 * @returns {Promise<Array>} - A promise that resolves to an array of product objects and the total pages.
 */
export async function getProductsByFilter(
  nameInput,
  categories,
  minPrice,
  maxPrice,
  currentPage,
  itemsPerPage
) {
  const offset = (currentPage - 1) * itemsPerPage;
  let baseQuery = `
    FROM public.products p
    JOIN public.categories c ON p.category_id = c.category_id
  `;

  const filters = [];
  const values = [];
  const categoryArray = Array.isArray(categories) ? categories : [categories];

  // Agregar filtros según estén disponibles
  if (nameInput) {
    filters.push(`p.name ILIKE $${filters.length + 1}`);
    values.push(`${nameInput}%`);
  }

  if (categoryArray.length > 0) {
    filters.push(`c.name = ANY($${filters.length + 1}::text[])`);
    values.push(categoryArray);
  }

  if (minPrice) {
    filters.push(`p.price >= $${filters.length + 1}`);
    values.push(minPrice);
  }

  if (maxPrice) {
    filters.push(`p.price <= $${filters.length + 1}`);
    values.push(maxPrice);
  }

  const whereClause =
    filters.length > 0 ? `WHERE ${filters.join(' AND ')}` : '';

  const countQuery = `SELECT COUNT(*) ${baseQuery} ${whereClause}`;

  const productQuery = `
    SELECT
      p.product_id,
      p.name,
      p.description,
      p.price,
      p.quantity_in_stock,
      p.image_url,
      p.category_id,
      c.name AS category_name
    ${baseQuery}
    ${whereClause}
    LIMIT ${itemsPerPage} OFFSET ${offset}
  `;

  try {
    const countResult = await db.query(countQuery, values);
    const totalPages = Math.ceil(
      Number(countResult.rows[0].count) / itemsPerPage
    );
    const { rows: products } = await db.query(productQuery, values);
    return { products, totalPages };
  } catch (error) {
    console.error('Error fetching products by filter:', error);
    throw error;
  }
}
