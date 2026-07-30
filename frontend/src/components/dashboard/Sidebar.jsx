"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  CircleHelp,
  FolderOpen,
  Heart,
  Home,
  Link2,
  Plus,
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "All Links", href: "/dashboard/all-links", icon: Link2 },
    { name: "Collections", href: "/dashboard/collections", icon: FolderOpen },
    { name: "Favorites", href: "/dashboard/favorites", icon: Heart },
    { name: "Archived", href: "/dashboard/archived", icon: Archive },
    { name: "Help", href: "/dashboard/help", icon: CircleHelp },
  ];

  return (
    <aside
      className="sticky top-0 z-30 hidden h-screen w-28 shrink-0 flex-col border-r border-white/[0.07] bg-[#0b0d18] px-3 py-4 lg:flex"
    >
      <nav className="space-y-1.5 lg:mt-2">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const active =
            href === "/dashboard"
              ? pathname === href
              : pathname.startsWith(href);

          return (
            <Link
              key={name}
              href={href}
              className={`group flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition lg:flex-col lg:gap-1 lg:px-1 lg:py-3 lg:text-[11px] ${
                active
                  ? "bg-violet-600/25 text-violet-200 shadow-[0_8px_22px_rgba(124,58,237,0.2)]"
                  : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-100"
              }`}
            >
              <Icon size={21} strokeWidth={2.1} />
              <span>{name}</span>
            </Link>
          );
        })}
      </nav>

      <Link
        href="/dashboard/add-link"
        className="mt-4 flex items-center justify-center gap-2 rounded-xl bg-linear-to-br from-violet-500 to-purple-700 px-3 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.32)] transition hover:brightness-110 lg:mt-3 lg:flex-col lg:gap-1 lg:px-1 lg:text-[11px]"
      >
        <Plus size={21} />
        <span>Add Link</span>
      </Link>
    </aside>
  );
}
