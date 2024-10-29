"use server";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

import { ProductFormSchema } from "@/services/schemas/ProductSchema";
import { convertImage, uploadImageToCloudinary } from "./cloudinaryHelper";
import { addProduct } from "@/services/productService";
import { verifyToken } from "@/lib/auth";
import { getArtisanIdByUserId } from "@/services/userService";

export async function productFormAction(previousState, formData) {
  const product_name = formData.get("product_name");
  const description = formData.get("description");
  const price = formData.get("price");
  const image_url = formData.get("image_url");
  const category = formData.get("category");
  const quantity_in_stock = formData.get("quantity_in_stock");
  const featured = formData.get("featured");

  console.log("Raw  Data", formData);

  const isDataValid = {
    product_name: product_name || "",
    description: description || "",
    price: price !== "" ? price : "",
    image_url: image_url !== "" ? image_url : "",
    category: category !== "" ? JSON.parse(category) : "",
    quantity_in_stock: quantity_in_stock || "",
    featured,
  };

  console.log("isValid Data", isDataValid);

  const token = cookies().get("token")?.value;
  const verifiedTokenPayload = await verifyToken(token);
  // console.log("token and payload", token, verifiedTokenPayload);

  const artisanId = await getArtisanIdByUserId(verifiedTokenPayload.id);
  console.log("Artisan Id", artisanId);

  // validate data
  const validationResult = ProductFormSchema.safeParse(isDataValid);

  // if not valid
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      message: "Failed to add product",
    };
  }

  let product_image;

  try {
    product_image = await uploadImageToCloudinary(
      convertImage,
      isDataValid.image_url,
      isDataValid.category?.name.toLowerCase()
    );
  } catch (error) {
    new Error("Failed to upload image to cloudinary");
  }

  const product = {
    name: isDataValid.product_name,
    description: isDataValid.description,
    price: isDataValid.price,
    image_url: product_image,
    category_id: isDataValid.category.id,
    quantity_in_stock: isDataValid.quantity_in_stock,
    featured,
    artisan_id: artisanId,
  };
  console.log("Product before saved", product);

  const fromDataBase = await addProduct(product);
  console.log("From database", fromDataBase);
  revalidatePath("/dashboard/products", "page");
}
