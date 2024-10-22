import OrdersTableArtisan from "@/components/common/OrdersTableArtisan";
import TotalSaleCard from "@/components/common/TotalSaleCard";
import DashboardHeader from "@/components/layout/DashboardHeader";
import OverviewCardLayout from "@/components/layout/OverviewCardLayout";
import SalesRevenueChartSection from "@/components/layout/SalesRevenueChart";

function DashboardPage() {
  return (
    <div className="grid gap-5">
      <DashboardHeader />
      <OverviewCardLayout />
      <SalesRevenueChartSection />
      <OrdersTableArtisan />
    </div>
  );
}

export default DashboardPage;
