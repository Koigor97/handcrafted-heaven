import OrdersCompletedCard from "../common/OrdersCompletedCard";
import RevenueCard from "../common/RevenueCard";
import TotalSaleCard from "../common/TotalSaleCard";
import ItemsSoldCard from "../common/ItemsSold";

function OverviewCardLayout() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-4">
      <TotalSaleCard />
      <OrdersCompletedCard />
      <RevenueCard />
      <ItemsSoldCard />
    </div>
  );
}

export default OverviewCardLayout;
