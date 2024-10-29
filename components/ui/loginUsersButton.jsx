"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

import LoadingSpinner from "./loader";

function LoginUsersButton() {
  const status = useFormStatus();

  return (
    <Button className="w-full md:w-auto">
      {status.pending ? <LoadingSpinner /> : "Login"}
    </Button>
  );
}

export default LoginUsersButton;
