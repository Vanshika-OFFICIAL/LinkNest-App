"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import Sidebar from "@/components/dashboard/Sidebar";
import Navbar from "@/components/common/Navbar";

export default function DashboardLayout({
  children,
}) {
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const router = useRouter();

  useEffect(() => {
    const token =
      localStorage.getItem("token");

    if (!token) {
      router.replace("/login");
      return;
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return null;
  }

  return (
    <div
      className="
      min-h-screen
      bg-[#050816]
      text-white
      lg:flex
      "
    >
      <Sidebar
        isOpen={sidebarOpen}
        closeSidebar={() =>
          setSidebarOpen(false)
        }
      />

      {sidebarOpen && (
        <div
          onClick={() =>
            setSidebarOpen(false)
          }
          className="
            fixed
            inset-0
            bg-black/50
            z-40
            lg:hidden
          "
        />
      )}

      <div
        className="
        flex-1
        "
      >
        <Navbar
          openSidebar={() =>
            setSidebarOpen(true)
          }
        />

        <main
          className="
            pt-20

            px-4
            pb-4

            md:px-6
            md:pb-6

            lg:pt-8
            lg:p-8
          "
        >
          {children}
        </main>
      </div>
    </div>
  );
}