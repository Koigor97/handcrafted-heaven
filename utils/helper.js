import cloudinary from "@/lib/cloudinary";

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

/**
 * Validate the form data against required fields and specific formats.
 *
 * @param {Object} formData - The form data object to be validated.
 * @returns {Array<Object>} - An array of objects, each containing the field name and corresponding error message.
 *   If the form data is valid, an empty array is returned.
 */
export function validateForm(formData) {
  const errors = [];

  // Check required fields for ArtisanForm
  if (!formData.shop_name || formData.shop_name.trim() === "") {
    errors.push({ shop_name: "Shop name is required" });
  }
  if (!formData.shop_description || formData.shop_description.trim() === "") {
    errors.push({ shop_description: "Shop description is required" });
  }
  if (!formData.shopLogoUrl || formData.shopLogoUrl.size === 0) {
    errors.push({ shop_logo_url: "Shop logo is required" });
  }

  // Check required fields for UserForm
  if (!formData.name || formData.name.trim() === "") {
    errors.push({ name: "Name is required" });
  }
  if (!formData.email) {
    errors.push({ email: "Email is required" });
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    errors.push({ email: "Email format is invalid." });
  }
  if (!formData.password) {
    errors.push({ password: "Password is required" });
  } else if (formData.password.length <= 8) {
    console.log(formData.password);
    errors.push({
      password:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character - @$!%*?#&.",
    });
  }
  if (
    formData.phone &&
    !/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)
  ) {
    errors.push({
      phone:
        "Phone number format is invalid. Use XXX-XXX-XXXX or (XXX) XXX-XXXX.",
    });
  }

  return errors;
}

export async function convertImage(image) {
  const imageData = await image.arrayBuffer();
  const mime = image.type;
  const encoding = "base64";
  const base64Data = Buffer.from(imageData).toString("base64");
  const fileUri = "data:" + mime + ";" + encoding + "," + base64Data;
  return fileUri;
}

export async function uploadImageToCloudinary(fn, imageFile, folderName) {
  if (!imageFile) return;

  const fileUri = await fn(imageFile);
  const result = await cloudinary.uploader.upload(fileUri, {
    folder: folderName,
  });
  return result.secure_url;
}
