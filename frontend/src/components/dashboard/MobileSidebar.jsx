"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  Archive,
  CircleHelp,
  ChevronRight,
  Crown,
  FolderOpen,
  Heart,
  Home,
  Link2,
  LogOut,
  Plus,
  Settings,
  User,
  X,
} from "lucide-react";

import Logo from "@/assets/logos/logo.png";
import { getCurrentUser, logoutUser } from "@/services/authService";

export default function MobileSidebar({ isOpen, closeSidebar }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await getCurrentUser();
        setUser(response.data.user || null);
      } catch (error) {
        console.error("Failed to load user", error);
      }
    };

    fetchUser();
  }, []);

  const initials = user?.name?.split(" ").map((word) => word[0]).join("").toUpperCase() || "LN";
  const navigate = () => closeSidebar();

  const handleLogout = async () => {
    try {
      await logoutUser();
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      closeSidebar();
      router.replace("/login");
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

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
      aria-hidden={!isOpen}
      className={`fixed inset-y-0 left-0 z-[70] flex w-[86vw] max-w-[322px] flex-col overflow-y-auto border-r border-white/[0.08] bg-[#090d1b] px-4 py-5 shadow-[20px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-300 lg:hidden ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between">
        <Link href="/dashboard" onClick={navigate} className="flex items-center gap-2">
          <Image src={Logo} alt="LinkNest" width={48} height={48} />
          <div>
            <h1 className="text-xl font-bold leading-none">LinkNest</h1>
            <p className="mt-1 text-[9px] font-semibold tracking-[0.2em] text-violet-400">KNOWLEDGE HUB</p>
          </div>
        </Link>
        <button type="button" onClick={closeSidebar} aria-label="Close menu" className="rounded-lg p-2 text-slate-300 transition hover:bg-white/[0.06] hover:text-white">
          <X size={21} />
        </button>
      </div>

      <div className="relative mt-7 overflow-hidden rounded-2xl border border-violet-500/15 bg-linear-to-br from-violet-500/20 to-purple-500/[0.07] p-4">
        <div className="absolute -right-2 -bottom-4 text-violet-400/20"><RocketDecoration /></div>
        <div className="relative flex items-center gap-3">
          {user?.avatar ? (
            <img src={user.avatar} alt="" className="h-12 w-12 rounded-full border border-violet-300/30 object-cover" />
          ) : (
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-linear-to-br from-violet-500 to-purple-700 text-lg font-bold">{initials}</div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{user?.name || "LinkNest User"}</p>
            <p className="mt-1 truncate text-xs text-slate-400">{user?.email || "Welcome back"}</p>
          </div>
        </div>
      </div>

      <p className="mt-7 text-[11px] font-semibold tracking-[0.18em] text-slate-500">MENU</p>
      <nav className="mt-3 space-y-1">
        {menuItems.map(({ name, href, icon: Icon }) => {
          const active = href === "/dashboard" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={name}
              href={href}
              onClick={navigate}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                active ? "bg-linear-to-r from-violet-600/60 to-purple-700/50 text-white" : "text-slate-300 hover:bg-white/[0.05]"
              }`}
            >
              <Icon size={19} className={active ? "text-violet-200" : "text-slate-400"} />
              {name}
            </Link>
          );
        })}
      </nav>

      <Link href="/dashboard/add-link" onClick={navigate} className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-fuchsia-600 px-4 py-3 text-sm font-semibold shadow-[0_12px_28px_rgba(124,58,237,0.35)] transition hover:brightness-110">
        <Plus size={19} /> Add Link
      </Link>

      <div className="mt-6 border-t border-white/[0.07] pt-5">
        <p className="text-[11px] font-semibold tracking-[0.18em] text-slate-500">ACCOUNT</p>
        <nav className="mt-3 space-y-1">
          <Link href="/dashboard/profile" onClick={navigate} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/[0.05]"><User size={19} className="text-slate-400" /> Profile</Link>
          <Link href="/dashboard/settings" onClick={navigate} className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-slate-300 transition hover:bg-white/[0.05]"><Settings size={19} className="text-slate-400" /> Settings</Link>
          <button type="button" onClick={handleLogout} className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm text-red-300 transition hover:bg-red-500/10"><LogOut size={19} /> Logout</button>
        </nav>
      </div>

      
    </aside>
  );
}

function RocketDecoration() {
  return <span className="text-5xl">✦</span>;
}
