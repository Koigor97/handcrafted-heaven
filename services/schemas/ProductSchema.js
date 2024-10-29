import { z } from "zod";

export const ProductFormSchema = z.object({
  product_name: z.string().min(1, { message: "Name is required" }),
  description: z.string().min(5, { message: "Description is required" }),
  price: z
    .string()
    .min(1, { message: "Price Required" })
    .transform((val) => parseFloat(val))
    .pipe(z.number()),
  quantity_in_stock: z
    .string()
    .min(1, { message: "Quantity is required" })
    .transform((val) => parseInt(val))
    .pipe(z.number()),
  image_url: z.instanceof(File).refine(
    (value) => {
      return value.size > 0;
    },
    {
      message: "Your product image is required",
    }
  ),
  category: z.object(
    {
      id: z.number(),
      name: z.string(),
    },
    { message: "Select a category" }
  ),
});
