import { verifyToken } from "@/lib/auth";
import { cookies } from "next/headers";
import { getArtisanDashboardData } from "@/services/userService";
import Product from "./Product";

async function DashboardProductCard() {
  const cookieToken = cookies().get("token")?.value;
  const verifiedTokenPayload = await verifyToken(cookieToken);

  /**
   * get the needed data base on the artisan id
   */
  const artisanDashboardData = await getArtisanDashboardData(
    verifiedTokenPayload.id
  );
  const { products } = artisanDashboardData;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {products.map((product) => (
        <Product
          key={product.product_id}
          name={product.name}
          id={product.product_id}
          image={product.image_url}
          price={product.price}
          quantity={product.quantity_in_stock}
        />
      ))}
    </div>
  );
}

export default DashboardProductCard;
