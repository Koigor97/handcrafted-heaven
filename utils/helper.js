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

// utils/getLocalStorage.js

/**
 * Get the value of a given key from local storage.
 *
 * @param {string} key - The key of the value to retrieve from local storage.
 * @returns {string|null} - The value associated with the given key, or null if the key is not found.
 */
export function getLocalStorage(key) {
  // Check if the window object exists
  if (typeof window !== "undefined") {
    // Get the value from local storage
    const storedValue = localStorage.getItem(key);
    // If the value exists, return it as a JSON object
    return storedValue ? JSON.parse(storedValue) : [];
  }
  return [];
}

// utils/setLocalStorage.js

/**
 * Set the value of a given key in local storage.
 *
 * @param {string} key - The key of the value to set in local storage.
 * @param {string} value - The value to set in local storage.
 */
export function setLocalStorage(key, value) {
  // Convert the value to a JSON string
  const jsonValue = JSON.stringify(value);

  // Set the value in local storage
  localStorage.setItem(key, jsonValue);
}

// utils/addToLocalStorage.js

/**
 * Add a new value to a given key in local storage.
 *
 * @param {string} key - The key of the value to add to local storage.
 * @param {string} value - The value to add to local storage.
 */
export function addItemToLocalStorage(key, value) {
  // Get the current value from local storage
  let currentValue = getLocalStorage(key) || [];

  const existingItem = currentValue.find(
    (item) => item.productId === value.productId
  );
  if (!existingItem) {
    // Add the new value to the array
    currentValue.push({ ...value, quantity: 1 });
    // Set the new value in local storage
    setLocalStorage(key, currentValue);
  } else {
    console.log("Item already exists in local storage");
  }
}

// utils/deleteFromLocalStorage.js

/**
 * Delete the value of a given key in local storage.
 *
 * @param {string} key - The key of the value to delete from local storage.
 * @param {string} itemId - The ID of the item to delete from local storage.
 */
export function deleteItemFromLocalStorage(key, productId) {
  // Delete the value from local storage
  let value = getLocalStorage(key);
  if (value) {
    value = value.filter((item) => item.productId !== productId);
    setLocalStorage(key, value);
  }
}

// utils/findItemInLocalStorage.js

/**
 * Find the value of a given key in local storage.
 *
 * @param {string} key - The key of the value to find in local storage.
 * @param {string} itemId - The ID of the item to find in local storage.
 * @returns {Object} - The found value, or null if not found.
 */
export function findItemInLocalStorage(key, productId) {
  // Get the value from local storage
  const value = getLocalStorage(key);

  // Find the item with the given ID in the array
  const item = value.find((item) => item.productId === productId);

  // Return the found item, or null if not found
  return item || null;
}

// helper function for formatting dashboard date
export function formatDashboardDate(date) {
  const options = { year: "numeric", month: "long", day: "2-digit" };
  return new Intl.DateTimeFormat("en-US", options).format(date);
}

/**
 * Update an existing value in local storage.
 *
 * @param {string} key - The key of the value to update in local storage.
 * @param {string} productId - The ID of the item to update.
 * @param {Object} newValue - The new values to update the item with.
 */
export function updateItemInLocalStorage(key, productId, newValue) {
  // Get the current value from local storage
  let currentValue = getLocalStorage(key);

  // Find the index of the item to update
  const index = currentValue.findIndex(item => item.productId === productId);

  // If the item exists, update its properties
  if (index !== -1) {
    currentValue[index] = { ...currentValue[index], ...newValue };
    // Set the updated value back in local storage
    setLocalStorage(key, currentValue);
  } else {
    console.log("Item not found in local storage");
  }
}