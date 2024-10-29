import { z } from "zod";
import { UserFormSchema } from "./UserFormSchema";

export const ArtisanFormSchema = UserFormSchema.extend({
  shop_name: z
    .string()
    .min(2, { message: "Your shop name must be at least 2 characters long" }),
  shop_description: z.string().min(5, {
    message: "Your shop description must be at least 5 characters long",
  }),
  shop_logo_url: z.instanceof(File).refine(
    (value) => {
      return value.size > 0;
    },
    {
      message: "Your shop logo is required",
    }
  ),
});
