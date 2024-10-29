import { eb_Garamond } from "@/app/font";
import { formatDashboardDate } from "@/utils/helper";
import Image from "next/image";
import { cookies } from "next/headers";
import { verifyToken } from "@/lib/auth";

import { getArtisanDashboardData } from "@/services/userService";

async function DashboardHeader({
  artisan = "John Doe",
  storeName = "Doe's Carpets",
  logo = "logo.png",
}) {
  const cookieToken = cookies().get("token")?.value;
  const verifiedTokenPayload = await verifyToken(cookieToken);
  const artisanDashboardData = await getArtisanDashboardData(
    verifiedTokenPayload.id
  );
  const { artisanDetails } = artisanDashboardData;

  return (
    <div className="text-text-750 grid gap-3">
      <div
        className={`${eb_Garamond.className} flex items-center justify-between text-lg font-semibold  md:text-2xl`}
      >
        <h1 className="">Dashboard Overview</h1>
        <h1>Welcome, {artisanDetails.name}</h1>
      </div>
      <hr />
      <div className="text-base md:text-xl flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="rounded-full w-4 md:w-8 ">
            <Image
              src={artisanDetails.shop_logo_url}
              alt={`${artisanDetails.shop_name} shop logo`}
              width={130}
              height={200}
              className=""
            />
          </div>
          <h2>{artisanDetails.shop_name}&apos;s Store</h2>
        </div>
        <p>Today: {formatDashboardDate(new Date())}</p>
      </div>
      <hr />
    </div>
  );
}

export default DashboardHeader;
