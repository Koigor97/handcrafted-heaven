// import { getAllProducts, getProductById } from "@/services/productService";
import HeroMain from '@/components/layout/HeroMain';
import BannerArrivals from '@/components/layout/BannerArrivals';
import ArtisansSection from '@/components/layout/ArtistSection';
import HeaderMenu from '@/components/layout/HeaderMenu';

export default async function Home({searchParams}) {
  // const products = await getProductById("e41bc845-8e19-403d-96eb-f9aa691df447");
  // console.log(products);

  return (
    <>
    <HeaderMenu searchParams={searchParams}/>
    <HeroMain />
    <BannerArrivals />
    <ArtisansSection />
    </>
  );
}
