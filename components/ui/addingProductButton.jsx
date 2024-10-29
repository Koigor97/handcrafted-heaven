"use client";

import { useFormStatus } from "react-dom";
import { Button } from "./button";

function AddingProductsButton() {
  const status = useFormStatus();

  return (
    <Button type="submit" className="w-full hover:bg-primary1-500">
      {status.pending ? "Saving product..." : "Save"}
    </Button>
  );
}

export default AddingProductsButton;
