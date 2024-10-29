"use client";

import LoginForm from "@/components/auth/LoginForm";
import { useFormState } from 'react-dom';
import { loginAction } from '@/utils/authAction';

export const description =
  "A login form with email and password. There's an option to login with Google and a link to sign up if you don't have an account.";

export default function LoginFormPage() {
  const initialState = {message: null, errors: {}}
  const [state, formAction] = useFormState(loginAction, initialState);

  return (
    <>

    <form action={formAction}>
      <LoginForm errors={state?.errors}/>
    </form>
    <div className='flex flex-col mt-4 justify-center items-center'>
      <p>To test the app and access the dashboard as an artisan, please use the following credentials:</p>
      <p>Email: samuel@handcraftedhaven.com</p>
      <p>Password: maxINE12345#</p>
      <p>To test the app and access the dashboard as a customer, please use the following credentials:</p>
      <p>Email: mario@gmail.com</p>
      <p>Password: Password123*</p>
    </div>
    </>
  );
}