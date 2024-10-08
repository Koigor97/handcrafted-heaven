// import { getAllProducts, getProductById } from "@/services/productService";
import HeroMain from '@/components/layout/HeroMain';
import BannerArrivals from '@/components/layout/BannerArrivals';
import HeaderMenu from '@/components/layout/HeaderMenu';

export default async function Home() {
  // const products = await getProductById("e41bc845-8e19-403d-96eb-f9aa691df447");
  // console.log(products);

  return (
    <>
    <HeaderMenu/>
    <div>
      <h1>Welcome to Handcrafted Haven</h1>
      <p>
        Handcrafted Haven is an online marketplace connecting artisans with
        consumers who value unique, handmade creations. Explore a curated
        selection of pottery, furniture, jewelry, and other beautifully crafted
        items, all made by skilled artisans. Shop for one-of-a-kind treasures
        and support small businesses dedicated to craftsmanship and creativity.
      </p>
    </div>
    <HeroMain />
    <BannerArrivals />
    </>
  );
}
