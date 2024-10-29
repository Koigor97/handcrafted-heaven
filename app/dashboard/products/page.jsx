import SearchBar from "@/components/common/SearchBar";
import ArtisanAddProductsModal from "@/components/common/ArtisanAddProducts";
import DashboardProductCard from "@/components/common/DashboardProductCard";

function ProductListPage() {
  return (
    <section className="grid gap-4 md:gap-7 mt-3">
      <div className="flex gap-2 justify-between items-center md:flex-row">
        <SearchBar />
        <ArtisanAddProductsModal />
      </div>
      <DashboardProductCard />
    </section>
  );
}

export default ProductListPage;
