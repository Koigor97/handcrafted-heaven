import { EB_Garamond, Nunito } from "next/font/google";

/**
 * The NextJS docs provided two way of using multiple imported
 * fonts. 1. The first first approach is to create a utility function,
 * exports the fonts and import them to the pages that would use it.
 * 2. The second approach is to use CSS Variable.
 * However, we are using the first approach in this project.
 */

export const eb_Garamond = EB_Garamond({
  display: "swap",
  subsets: ["latin"],
});

export const nunito = Nunito({
  display: "swap",
  subsets: ["latin"],
});
