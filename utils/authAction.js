"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { convertImage, uploadImageToCloudinary } from "./cloudinaryHelper";
import { createToken } from "@/lib/auth";
import {
  createUserAccount,
  createArtisanAccount,
} from "@/services/createAccountService";
import { UserFormSchema } from "@/services/schemas/UserFormSchema";
import { ArtisanFormSchema } from "@/services/schemas/ArtisanFormSchema";
import { LoginFormSchema } from "@/services/schemas/LoginFormSchema";
import { getUserByEmail, getUserLoginById } from "@/services/userService";
import bcrypt from "bcryptjs";
import { verifyToken } from "@/lib/auth";

/**************** ARTISAN ACCOUNT FORM ACTION  *****************/
/**
 * Handle artisan account creation.
 *
 * @param {Object} previousState - Previous form state.
 * @param {FormData} formData - Form data.
 *
 * @returns {Promise<Object|Array<Object>>} - Returns the newly created user object or an array of error objects.
 */
export async function artisanAccountAction(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const userImageUrl = formData.get("user_image_url");
  const shop_name = formData.get("shop_name");
  const shop_description = formData.get("shop_description");
  const bio = formData.get("bio");
  const shopLogoUrl = formData.get("shop_logo_url");

  /**
   * validate name, email, password, shop_name, shop_description, shop_logo_url using useFormState
   */
  const isFormDataValid = {
    name,
    email,
    password,
    phone,
    shop_name,
    shop_description,
    shop_logo_url: shopLogoUrl,
  };

  const validationResult = ArtisanFormSchema.safeParse(isFormDataValid);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      mesagge: "Failed to create user account",
    };
  }

  let user_image_url;

  try {
    user_image_url = await uploadImageToCloudinary(
      convertImage,
      userImageUrl,
      "users"
    );
  } catch (error) {
    new Error(" Error uploading user image to Cloudinary: " + error);
  }

  let shop_logo_url;

  try {
    shop_logo_url = await uploadImageToCloudinary(
      convertImage,
      shopLogoUrl,
      "artisans-logo"
    );
  } catch (error) {
    new Error(" Error uploading shop logo image to Cloudinary: " + error);
  }

  const userData = {
    name,
    email,
    password,
    role: "artisan",
    phone,
    user_image_url,
  };

  const user = await createUserAccount(userData);
  const token = await createToken(user);

  const artisanData = {
    user_id: user.user_id,
    shop_name,
    shop_description,
    bio,
    shop_logo_url,
  };

  const artisan = await createArtisanAccount(artisanData);

  cookies().set("token", token, {
    httpOnly: true,
  });
  redirect("/dashboard");
}

/***************** USER ACCOUNT FORM ACTION  **************************
/**
 * Creates a new user account.
 *
 * @param {Object} previousState - Previous form state.
 * @param {FormData} formData - Form data.
 *
 * @returns {Promise<Object|Array<Object>>} - Returns the newly created user object or an array of error objects.
 */
export async function userAccountAction(previousState, formData) {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const phone = formData.get("phone");
  const userImageUrl = formData.get("user_image_url");

  /**
   * validate name, email, password, shop_name, shop_description, shop_logo_url using useFormState
   */
  const isFormDataValid = {
    name,
    email,
    password,
    phone,
  };

  const validationResult = UserFormSchema.safeParse(isFormDataValid);
  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      mesagge: "Failed to create user account",
    };
  }

  let user_image_url;

  try {
    user_image_url = await uploadImageToCloudinary(
      convertImage,
      userImageUrl,
      "users"
    );
  } catch (error) {
    new Error(" Error uploading user image to Cloudinary: " + error);
  }

  const userData = {
    name,
    email,
    password,
    phone,
    user_image_url,
  };

  const user = await createUserAccount(userData);
  const token = await createToken(user);

  cookies().set("token", token, {
    httpOnly: true,
  });

  redirect("/");
}

/***************** LOGIN FORM ACTION  **************************
/**
 * Creates a new user account.
 *
 * @param {Object} previousState - Previous form state.
 * @param {FormData} formData - Form data.
 *
 * @returns {VoidFunction} - Returns the newly created user object or an array of error objects.
 */
export async function loginAction(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  /**
   * validate email, password using useFormState
   */
  const isFormDataValid = {
    email,
    password,
  };

  const validationResult = LoginFormSchema.safeParse(isFormDataValid);

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
      mesagge: "Failed to login",
    };
  }

  const user = await getUserByEmail(email);

  if (!user) {
    return {
      errors: { email: ["User not found, check your email"] },
      message: "User not found, try again",
    };
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  delete user.password;
  if (!isPasswordValid) {
    return {
      errors: { password: ["Incorrect password, try again"] },
      message: "Incorrect password, try again",
    };
  }
  const token = await createToken(user);

  cookies().set("token", token, {
    httpOnly: true,
  });

  if (user.role === "artisan") {
    redirect("/dashboard");
  }
  redirect("/");
}

/***************** IS USER LOGGED IN ACTIONS *****************/
/**
 * Check if the user is logged in and send the user image, name, id and role
 *
 * @returns {Object} - Returns the user that has the token on the cookie
 */

export async function isUserLoggedIn() {
  const token = cookies().get("token")?.value;

  const verifiedToken = token && (await verifyToken(token));
  if (!verifiedToken) {
    return null;
  }
  const user = await getUserLoginById(verifiedToken?.id);
  return user;
}

/***************** Log out Action *****************************/
/**
 * Logs out the user by deleting the cookie with the token
 *
 * @returns {void} - The function does not return any value
 */
export async function logOut() {
  // Delete the token cookie
  cookies().delete("token");
  // redirect("/");
}
