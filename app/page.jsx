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
    <HeroMain />
    <BannerArrivals />
    </>
  );
}
