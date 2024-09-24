import { nunito } from "./font";
import "./globals.css";

export const metadata = {
  title: "Handcrafted Haven - A place to find unique handcrafted items",
  description:
    "Handcrafted Haven is an online marketplace connecting artisans with consumers who value unique, handmade creations. Explore a curated selection of pottery, furniture, jewelry, and other beautifully crafted items, all made by skilled artisans. Shop for one-of-a-kind treasures and support small businesses dedicated to craftsmanship and creativity.",
  openGraph: {
    title: "Handcrafted Haven - Unique Handmade Products",
    description:
      "Discover unique handcrafted items from artisans around the world. Shop pottery, furniture, jewelry, and more at Handcrafted Haven, and support small businesses with every purchase.",
    type: "website",
    url: "https://your-domain.com",
    site_name: "Handcrafted Haven",
    images: [
      {
        url: "https://your-domain.com/path-to-image.jpg",
        width: 1200,
        height: 630,
        alt: "Handcrafted Haven Marketplace",
      },
    ],
    locale: "en_US", // Locale setting for your audience
  },
  twitter: {
    card: "summary_large_image",
    site: "@yourtwitterhandle", // Replace with your Twitter handle
    title: "Handcrafted Haven - Unique Handmade Products",
    description:
      "Explore a curated selection of handmade treasures from artisans. Support craftsmanship with every purchase.",
    images: [
      {
        url: "https://your-domain.com/path-to-image.jpg",
        alt: "Handcrafted Haven Website page",
      },
    ],
  },
  additionalMetaTags: [
    {
      name: "keywords",
      content:
        "handcrafted, handmade, pottery, furniture, jewelry, unique items, artisan market",
    },
    {
      name: "robots",
      content: "index, follow",
    },
    {
      httpEquiv: "Content-Type",
      content: "text/html; charset=UTF-8",
    },
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={nunito.className}>{children}</body>
    </html>
  );
}
