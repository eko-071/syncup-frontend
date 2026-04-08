"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "Dashboard",       href: "/dashboard" },
  { label: "Browse Projects", href: "/browse" },
  { label: "My projects",     href: "/projects" },
  { label: "Messages",        href: "/messages" },
  { label: "My profile",      href: "/profile" },
  { label: "Settings",        href: "/settings" },
];

export default function Sidebar() {
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const pathname = usePathname();

  return (
    <>
      <style>{`
        @import url('https://fonts.cdnfonts.com/css/maghfirea');
        *, *::before, *::after { font-family: 'Maghfirea', Georgia, serif !important; box-sizing: border-box; }
      `}</style>
      <aside style={{
        width: "319px", flexShrink: 0,
        background: "radial-gradient(50% 50% at 50% 50%, #355194 0%, #254591 0.01%, #12317B 51.92%, #091C49 100%)",
        display: "flex", flexDirection: "column",
        padding: "28px 0 24px", position: "sticky", top: 0, height: "100vh",
      }}>
        <Link href="/dashboard" style={{ textDecoration: "none" }}>
          <div style={{ padding: "0 28px 36px", fontSize: "64px", fontWeight: 400, lineHeight: "100%", color: "#fff" }}>
            SyncUp
          </div>
        </Link>

        {navItems.map(n => {
          const isActive = pathname === n.href;
          const isHovered = hoveredNav === n.label;
          return (
            <Link
              key={n.label}
              href={n.href}
              onMouseEnter={() => setHoveredNav(n.label)}
              onMouseLeave={() => setHoveredNav(null)}
              style={{
                display: "block", padding: "11px 28px",
                fontSize: "36px", fontWeight: 400, lineHeight: "100%",
                color: "#ffffff",
                backgroundColor: isActive ? "#3a5fa0" : isHovered ? "#5073A2" : "transparent",
                borderLeft: isActive ? "4px solid #ffffff" : "3px solid transparent",
                textDecoration: "none",
                transition: "background-color 0.2s, color 0.2s",
                whiteSpace: "nowrap",
              }}
            >{n.label}</Link>
          );
        })}
      </aside>
    </>
  );
}