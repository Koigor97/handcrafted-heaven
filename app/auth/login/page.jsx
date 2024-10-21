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
    <form action={formAction}>
      <LoginForm errors={state?.errors}/>
    </form>
  );
}
