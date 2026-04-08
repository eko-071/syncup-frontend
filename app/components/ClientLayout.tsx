"use client";
import Sidebar from "./sidebar";
import { usePathname } from "next/navigation";

const noSidebarRoutes = ["/login", "/signup"];

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const showSidebar = !noSidebarRoutes.includes(pathname);

  return (
    <div style={{ display: "flex", minHeight: "100vh", backgroundColor: "#000000", color: "#ffffff" }}>
      {showSidebar && <Sidebar />}
      <main style={{ flex: 1, minWidth: 0 }}>
        {children}
      </main>
    </div>
  );
}