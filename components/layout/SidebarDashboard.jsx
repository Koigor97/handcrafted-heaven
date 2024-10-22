"use client";

import Link from "next/link";
import Image from "next/image";
import clsx from "clsx";
import { usePathname } from "next/navigation";

import {
  SquareChartGantt,
  Logs,
  Settings,
  ShoppingBasket,
  LogOut,
} from "lucide-react";

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
} from "../ui/sidebar";

// menu items
const linkItems = [
  { name: "Overview", href: "/dashboard", icon: SquareChartGantt },
  {
    name: "Items",
    href: "/dashboard/products",
    icon: Logs,
  },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBasket },
  { name: "Settings", href: "/dashboard/settings", icon: Settings },
];

function SidebarDashboard() {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="grid justify-center mb-3">
        <Image
          src="/handcrafted-haven-logo.png"
          alt="handcrafted Logo"
          width={273}
          height={306}
          className="w-16 md:w-28"
        />
      </SidebarHeader>
      <SidebarContent className="px-1">
        <SidebarMenu className="gap-2">
          {linkItems.map((item) => {
            const LinkIcon = item.icon;
            return (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Link
                    href={item.href}
                    className={clsx({
                      "bg-primary1-200 text-primary2-100":
                        pathname === item.href,
                    })}
                  >
                    <LinkIcon size={30} />
                    <span className="text-base md:text-lg">{item.name}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="hover:bg-primary1-200">
        <Link href={"/logout"} className="flex gap-2 ">
          <LogOut />
          <span>Logout</span>
        </Link>
      </SidebarFooter>
    </Sidebar>
  );
}

export default SidebarDashboard;
