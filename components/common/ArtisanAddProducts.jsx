"use client";

import { useFormState } from "react-dom";
import { Plus } from "lucide-react";
import { productFormAction } from "@/utils/productAction";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Checkbox } from "../ui/checkbox";
import ImagePicker from "./ImagePicker";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import AddingProductsButton from "../ui/addingProductButton";

function ArtisanAddProductsModal() {
  const initialState = { message: null, errors: {} };
  const [state, formAction] = useFormState(productFormAction, initialState);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="py-2 px-3">
          <Plus size={16} className=" md:hidden" />
          <span className="hidden md:flex">Add Product</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a product to your store</DialogTitle>
          <DialogDescription>
            Fill in the input field with the product information. All input
            fields are required
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="flex flex-col gap-5">
          <div>
            <Label>Product name:</Label>
            <Input id="product_name" name="product_name" required />
            {state?.errors?.product_name && (
              <p style={{ color: "red" }}>{state.errors.product_name}</p>
            )}
          </div>
          <div>
            <Label>Product description:</Label>
            <Textarea id="product_description" name="description" required />
            {state?.errors?.description && (
              <p style={{ color: "red" }}>{state.errors.description}</p>
            )}
          </div>
          <div>
            <Label>Product price:</Label>
            <Input type="number" id="product_price" name="price" required />
            {state?.errors?.price && (
              <p style={{ color: "red" }}>{state.errors.price}</p>
            )}
          </div>
          <div>
            <Label>Product Stock:</Label>
            <Input
              type="number"
              id="quantity_in_stock"
              name="quantity_in_stock"
              required
            />
            {state?.errors?.quantity_in_stock && (
              <p style={{ color: "red" }}>{state.errors.quantity_in_stock}</p>
            )}
          </div>
          <div>
            <Label>Product image:</Label>
            <ImagePicker name={"image_url"} />
            {state?.errors?.image_url && (
              <p style={{ color: "red" }}>{state.errors.image_url}</p>
            )}
          </div>
          <div>
            <Label>Product category:</Label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="bg-background">
                <SelectItem value='{"id": 1, "name":"Furnitures"}'>
                  Furniture
                </SelectItem>
                <SelectItem value='{"id": 2, "name":"Jewelry"}'>
                  Jewelry
                </SelectItem>
                <SelectItem value='{"id": 3, "name":"Pottery"}'>
                  Pottery
                </SelectItem>
                <SelectItem value='{"id": 4, "name":"Artistry"}'>
                  Artistry
                </SelectItem>
                <SelectItem value='{"id": 5, "name":"Woodwork"}'>
                  Woodwork
                </SelectItem>
              </SelectContent>
            </Select>
            {state?.errors?.category && (
              <p style={{ color: "red" }}>{state.errors.category}</p>
            )}
          </div>
          <div className="flex gap-2">
            <Label>Featured:</Label>
            <Checkbox id="featured" name="featured" />
          </div>
          <DialogClose asChild>
            <AddingProductsButton />
          </DialogClose>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ArtisanAddProductsModal;
