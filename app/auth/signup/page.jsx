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

function SignUpPage() {
  const [state, formAction] = useFormState(userAccountAction, {});

  // Safely reduce errors into an object if errors exist and it's an array
  // Safely reduce errors into an object if errors exist and it's an array
  const errors = Array.isArray(state)
    ? state.reduce((acc, errorObj) => {
        const key = Object.keys(errorObj)[0];
        const message = errorObj[key];

        // If key exists, concatenate the new error message, else assign the first error
        if (acc[key]) {
          acc[key] = `${acc[key]}, ${message}`;
        } else {
          acc[key] = message;
        }

        return acc;
      }, {})
    : {}; // Default to an empty object if errors are not an array

  return (
    <Card className="mx-auto max-w-sm bg-accent1-100 my-5">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up as a User</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          {/* User Information Form */}
          <UserForm errors={errors} />

          {/* Action Buttons */}
          <div className="mt-6 flex flex-col gap-4 md:flex-row md:gap-6">
            <CreateAccountButton />
            <Button variant="outline" className="w-full md:w-auto">
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
