// import { getAllProducts, getProductById } from "@/services/productService";
import HeroMain from '@/components/layout/HeroMain';
import BannerArrivals from '@/components/layout/BannerArrivals';
import ArtisansSection from '@/components/layout/ArtistSection';
import HeaderMenu from '@/components/layout/HeaderMenu';
import ProductGrid from '@/components/layout/ProductGrid';
import { getAllProducts } from '@/services/productService';



export default async function Home({searchParams}) {
  // const products = await getProductById("e41bc845-8e19-403d-96eb-f9aa691df447");
  // console.log(products);
  const products = await getAllProducts();


  return (
    <>
    <HeaderMenu searchParams={searchParams}/>
    <HeroMain />
    <BannerArrivals />
    <div className="my-8">
        <h2 className="text-center text-4xl font-extrabold text-gray-800 mb-2">Featured Products</h2>
        <p className="text-center text-lg text-gray-500">Check out our latest arrivals</p>
        <ProductGrid products={products} />
    </div>
    <ArtisansSection />
    </>
  );
}
