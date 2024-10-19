'use server';

import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';

import {
  validateForm,
  convertImage,
  uploadImageToCloudinary,
  validateUser
} from './helper';
import { createToken } from '@/lib/auth';
import {
  createUserAccount,
  createArtisanAccount
} from '@/services/createAccountService';

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
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('phone');
  const userImageUrl = formData.get('user_image_url');
  const shop_name = formData.get('shop_name');
  const shop_description = formData.get('shop_description');
  const bio = formData.get('bio');
  const shopLogoUrl = formData.get('shop_logo_url');

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
    shopLogoUrl
  };
  const errors = validateForm(isFormDataValid);

  if (errors.length > 0) return errors;

  let user_image_url;

  try {
    user_image_url = await uploadImageToCloudinary(
      convertImage,
      userImageUrl,
      'users'
    );
  } catch (error) {
    new Error(' Error uploading user image to Cloudinary: ' + error);
  }

  let shop_logo_url;

  try {
    shop_logo_url = await uploadImageToCloudinary(
      convertImage,
      shopLogoUrl,
      'artisans-logo'
    );
  } catch (error) {
    new Error(' Error uploading shop logo image to Cloudinary: ' + error);
  }

  const userData = {
    name,
    email,
    password,
    role: 'artisan',
    phone,
    user_image_url
  };

  const user = await createUserAccount(userData);

  const artisanData = {
    user_id: user.user_id,
    shop_name,
    shop_description,
    bio,
    shop_logo_url
  };

  const artisan = await createArtisanAccount(artisanData);
  redirect('/dashboard');
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
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const phone = formData.get('phone');
  const userImageUrl = formData.get('user_image_url');

  /**
   * validate name, email, password, shop_name, shop_description, shop_logo_url using useFormState
   */
  const isFormDataValid = {
    name,
    email,
    password,
    phone
  };
  // const errors = validateUser(isFormDataValid);

  // if (errors.length > 0) return errors;

  let user_image_url;

  try {
    user_image_url = await uploadImageToCloudinary(
      convertImage,
      userImageUrl,
      'users'
    );
  } catch (error) {
    new Error(' Error uploading user image to Cloudinary: ' + error);
  }

  const userData = {
    name,
    email,
    password,
    phone,
    user_image_url
  };

  const user = await createUserAccount(userData);
  const token = await createToken(user);
  console.log('user', user);
  console.log('token', token);

  cookies().set('token', token, {
    httpOnly: true
  });

  redirect('/');
}
