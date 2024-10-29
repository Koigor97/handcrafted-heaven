"use client";

import Link from "next/link";
import { useFormState } from "react-dom";
import { UserForm } from "@/components/auth/UserForm";
import { userAccountAction } from "@/utils/authAction";
import CreateAccountButton from "@/components/ui/createAccountButton";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {signIn} from "next-auth/react";

function SignUpPage() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(userAccountAction, initialState);

  return (
    <Card className="mx-3 mt-5 bg-accent1-100 md:mx-auto md:max-w-sm md:mt-16">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up as a User</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          {/* User Information Form */}
          <UserForm errors={state?.errors} />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-6">
            <CreateAccountButton />
            <Button variant="outline"
              className="w-full md:w-auto"
              type="button"
              onClick={() => signIn("google")}>
              Sign up with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="underline">
              Sign in
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

export default SignUpPage;
