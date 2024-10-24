// import { getAllProducts, getProductById } from "@/services/productService";
import HeroMain from "@/components/layout/HeroMain";
import BannerArrivals from "@/components/layout/BannerArrivals";
import ArtisansSection from "@/components/layout/ArtistSection";
import HeaderMenu from "@/components/layout/HeaderMenu";
import FeaturedSection from "@/components/layout/FeaturedSection";
import BestSellerSection from "@/components/layout/BestSellerSection";

export default async function Home({ searchParams }) {
  // const products = await getProductById("e41bc845-8e19-403d-96eb-f9aa691df447");
  // console.log(products);

  return (
    <>
      <div className="max-w-custom-clamp2 mx-auto">
        <HeaderMenu searchParams={searchParams} />
      </div>
      <HeroMain />
      <div className="max-w-custom-clamp2 mx-auto">
        <FeaturedSection />
        <BestSellerSection />
        <BannerArrivals />
        <ArtisansSection />
      </div>
    </>
  );
}
