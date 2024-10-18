"use client";

import { useFormState } from "react-dom";
import Link from "next/link";

import { Button } from "../ui/button";

import CreateAccountButton from "../ui/createAccountButton";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { UserForm } from "../auth/UserForm";
import ArtisanForm from "../auth/ArtisanForm";

function ArtisanOnBoardingForm({ artisanAccountAction }) {
  const [state, formAction] = useFormState(artisanAccountAction, {});

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
    <Card className="mx-auto max-w-4xl bg-accent1-100 p-6 md:my-5">
      <CardHeader>
        <CardTitle className="text-xl">Sign Up as an Artisan</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* User Information Form */}
            <UserForm errors={errors} />

            {/* Artisan Information Form */}
            <ArtisanForm errors={errors} />
          </div>

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

export default ArtisanOnBoardingForm;
