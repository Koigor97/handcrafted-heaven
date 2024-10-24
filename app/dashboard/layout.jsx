import SidebarDashboard from "@/components/layout/SidebarDashboard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children, // will be a page or nested layout
}) {
  return (
    <SidebarProvider className="max-w-custom-clamp2 mx-auto">
      <div>
        <SidebarDashboard />
      </div>
      <main className="w-full py-3 px-5 ">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
}
