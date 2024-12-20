"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import LoginUsersButton from "../ui/loginUsersButton";
import { signIn } from 'next-auth/react';


export default function LoginForm({ errors }) {
  return (
    <Card className="mx-3 mt-5 bg-accent1-100 md:mx-auto md:max-w-sm md:mt-16">
      <CardHeader>
        <CardTitle className="text-1xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              required
            />
            {errors?.email && (
              <p className="text-sm text-red-500">{errors.email}</p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="ml-auto inline-block text-sm underline">
                Forgot your password?
              </Link>
            </div>
            <Input id="password" type="password" name="password" required />
            {errors?.password && (
              <p className="text-sm text-red-500">{errors.password}</p>
            )}
          </div>

          <LoginUsersButton />
          <Button variant="outline" className="w-full" type="button" onClick={() => signIn("google")}>
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
