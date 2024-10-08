// utils/formatPrice.js

/**
 * Format a given number as a currency value.
 * This function uses the Intl.NumberFormat API to format a numeric value into a specific currency.
 * The default currency is USD, but you can pass any valid ISO 4217 currency code.
 *
 * @param {number} price - The numeric price value to be formatted.
 * @param {string} [currency='USD'] - The currency code to format the price in (e.g., 'USD', 'EUR').
 * @returns {string} - The formatted price string, e.g., "$500.00".
 */
export function formatPrice(price, currency = "USD") {
  // Use Intl.NumberFormat to format the price to a specific currency
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}
