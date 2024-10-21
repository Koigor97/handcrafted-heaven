"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function CreateAccountButton() {
  const status = useFormStatus();

  return (
    <Button className="w-full md:w-auto">
      {status.pending ? "Creating Account..." : "Create Account"}
    </Button>
  );
}

export default CreateAccountButton;
