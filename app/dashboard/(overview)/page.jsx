import OrdersTableArtisan from "@/components/common/OrdersTableArtisan";
import OverviewCardLayout from "@/components/layout/OverviewCardLayout";
import SalesRevenueChartSection from "@/components/layout/SalesRevenueChart";

async function DashboardPage() {
  return (
    <div className="grid gap-5">
      <OverviewCardLayout />
      <SalesRevenueChartSection />
      <OrdersTableArtisan />
    </div>
  );
}

export default DashboardPage;
