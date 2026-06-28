"use client";

import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getDashboardStats } from "@/services/dashboardService";

export default function Sidebar({ isOpen, closeSidebar }) {
  const pathname = usePathname();

  const [stats, setStats] = useState({
    totalLinks: 0,
    collections: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await getDashboardStats();

      setStats(res.data.stats);
    } catch (error) {
      console.error(error);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: "📊",
    },
    {
      name: "Collections",
      href: "/dashboard/collections",
      icon: "📁",
    },
    {
      name: "Favorites",
      href: "/dashboard/favorites",
      icon: "⭐",
    },
    {
      name: "Archived",
      href: "/dashboard/archived",
      icon: "📦",
    },
    {
      name: "Profile",
      href: "/dashboard/profile",
      icon: "👤",
    },
    {
      name: "Settings",
      href: "/dashboard/settings",
      icon: "⚙️",
    },
  ];

  return (
    <aside
      className={`
    fixed
    top-0
    left-0
    z-[70]

    h-screen
    w-64

    bg-[#0B0B0F]

    border-r
    border-white/10

    p-6

    flex
    flex-col
    justify-between

    transform
    transition-transform
    duration-300

    ${isOpen ? "translate-x-0" : "-translate-x-full"}

    lg:translate-x-0
    lg:sticky
    lg:top-0
  `}
    >
      {/* TOP */}
      <div>
        {/* LOGO */}

        <div className="flex items-center gap-4 mb-10">
          <div
  className="
  h-16
  w-16

  flex
  items-center
  justify-center
  "
>
  <Image
    src={Logo}
    alt="LinkNest Logo"
    width={64}
    height={64}
  />
</div>

          <div>
            <h1 className="text-3xl font-bold">LinkNest</h1>

            <p className="text-gray-400 text-sm">Knowledge Hub</p>
          </div>
        </div>

        {/* ADD LINK */}

        <Link
          href="/dashboard/add-link"
          onClick={() => {
            if (window.innerWidth < 1024) {
              closeSidebar();
            }
          }}
          className="
          block

          w-full

          mb-4

          py-2

          rounded-3xl

          text-center
          text-lg
          font-semibold

          bg-gradient-to-r
          from-violet-500
          to-purple-500

          shadow-[0_0_25px_rgba(168,85,247,0.35)]

          hover:scale-[1.02]

          transition-all
        "
        >
          + Add New Link
        </Link>

        {/* NAVIGATION */}

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => {
                  if (window.innerWidth < 1024) {
                    closeSidebar();
                  }
                }}
                className={`
                  flex
                  items-center
                  gap-4

                  px-5
                  py-4

                  rounded-2xl

                  transition-all

                  ${
                    active
                      ? `
                        bg-gradient-to-r
                        from-violet-500/20
                        to-purple-500/10

                        border
                        border-violet-500/30

                        text-violet-300

                        shadow-[0_0_20px_rgba(168,85,247,0.15)]
                      `
                      : `
                        text-gray-300

                        border
                        border-transparent

                        hover:bg-violet-500/10
                        hover:border-violet-500/20
                      `
                  }
                `}
              >
                <span className="text-xl">{item.icon}</span>

                <span className="font-medium text-lg">{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* BOTTOM STATS */}

      <div
        className="
        rounded-3xl

        bg-white/[0.03]

        border
        border-white/10

        backdrop-blur-xl

        p-6
      "
      >
        <div className="flex justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Links</p>

            <h3 className="text-3xl font-bold mt-2">{stats.totalLinks}</h3>
          </div>

          <div>
            <p className="text-sm text-gray-400">Collections</p>

            <h3
              className="
              text-3xl
              font-bold
              mt-2

              text-violet-400
            "
            >
              {stats.collections}
            </h3>
          </div>
        </div>

        <div className="mt-4">
          <div
            className="
            h-2

            bg-white/10

            rounded-full

            overflow-hidden
          "
          >
            <div
              className="
              h-full

              w-full

              bg-gradient-to-r
              from-violet-500
              to-purple-500
            "
            />
          </div>

          <p className="text-xs text-gray-500 mt-3">
            Live data from dashboard API
          </p>
        </div>
      </div>
    </aside>
  );
}
