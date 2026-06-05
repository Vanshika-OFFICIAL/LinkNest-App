"use client";

import { useEffect, useState } from "react";
import { getCurrentUser } from "@/services/authService";

export default function Navbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.data.user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <header
      className="
      sticky
      top-0
      z-50

      border-b
      border-white/10

      bg-[#050816]/80
      backdrop-blur-xl

      px-8
      py-4
    "
    >
      <div className="flex items-center justify-between">
        {/* Search */}

        <div
          className="
          w-full
          max-w-xl

          rounded-xl
          border
          border-white/10

          bg-white/[0.03]

          px-4
          py-3
        "
        >
          <input
            type="text"
            placeholder="Search links, collections..."
            className="
            bg-transparent
            outline-none
            w-full
            text-sm
          "
          />
        </div>

        {/* User */}

        <div className="flex items-center gap-4">
          <button
            className="
            h-10
            w-10
            rounded-xl

            border
            border-white/10

            bg-white/[0.03]
          "
          >
            🔔
          </button>

          <div className="flex items-center gap-3">
            <div
              className="
              h-10
              w-10

              rounded-full

              bg-gradient-to-r
              from-violet-600
              to-purple-500

              flex
              items-center
              justify-center

              font-semibold
            "
            >
              {user?.name?.charAt(0)}
            </div>

            <div>
              <p className="font-medium">
                {user?.name}
              </p>

              <p className="text-xs text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}