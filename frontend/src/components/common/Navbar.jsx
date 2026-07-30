"use client";

import { useEffect, useRef, useState } from "react";

import Link from "next/link";

import Image from "next/image";

import Logo from "@/assets/logos/logo.png";

import { useRouter } from "next/navigation";

import {
  Menu,
  Search,
  X,
  Plus,
  LogOut,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

import {
  searchLinks,
} from "@/services/linkService";

import {
  getCurrentUser,
  logoutUser,
} from "@/services/authService";


export default function Navbar({ openSidebar }) {
  const router = useRouter();

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

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

  useEffect(() => {
    const fetchResults = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }

      try {
        const res = await searchLinks(query);

        setResults(res.data.links || []);
      } catch (error) {
        console.error(error);
      }
    };

    const timer = setTimeout(fetchResults, 300);

    return () => clearTimeout(timer);
  }, [query]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logoutUser();

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      router.replace("/login");
    } catch (error) {
      console.error(error);
    }
  };

  const initials =
    user?.name
      ?.split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase() || "LN";

  const clearSearch = () => {
    setQuery("");
    setResults([]);
  };

  return (
    <header
      className="
        sticky
        top-0
        z-60

        flex
        items-center
        justify-between

        h-16
        lg:h-[74px]

        px-4
        lg:px-5

        border-b
        border-white/[0.07]

        bg-[#0b0d18]
      "
    >
      <div className="flex shrink-0 items-center gap-3">
        <button
          onClick={openSidebar}
          className="
            lg:hidden

            h-10
            w-10

            rounded-xl

            border
            border-white/10

            flex
            items-center
            justify-center

            bg-white/3
          "
        >
          <Menu size={20} />
        </button>

        <Link
          href="/dashboard"
          className="
            flex
            items-center
            gap-2
          "
        >
          <Image src={Logo} alt="Logo" width={38} height={38} />

          <div>
            <h2 className="text-lg font-bold leading-none">LinkNest</h2>

            <p className="mt-1 text-[9px] font-medium tracking-[0.14em] text-slate-400">
              KNOWLEDGE HUB
            </p>
          </div>
        </Link>
      </div>

      <div className="flex flex-1 items-center justify-end gap-3">
        <div className="relative hidden w-full max-w-xl lg:block">
            <div className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-[#121525] px-3 py-2.5 shadow-inner shadow-black/20">
              <Search size={18} className="shrink-0 text-gray-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search links"
                className="
                  w-full
                  bg-transparent
                  outline-none
                  text-sm
                  placeholder:text-gray-500
                "
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            {results.length > 0 && (
              <div className="absolute left-0 right-0 top-full mt-3 max-h-80 overflow-y-auto rounded-3xl border border-white/10 bg-[#0B0B0F] shadow-[0_20px_60px_rgba(0,0,0,0.45)] backdrop-blur-xl z-90">
                {results.map((link) => (
                  <button
                    key={link._id || link.id}
                    type="button"
                    className="w-full border-b border-white/5 px-4 py-3 text-left transition last:border-b-0 hover:bg-white/5"
                  >
                    <div className="font-medium text-sm">
                      {link.title || link.name || link.url || "Untitled link"}
                    </div>

                    <p className="text-xs text-gray-400 truncate">
                      {link.url || link.description || ""}
                    </p>
                  </button>
                ))}
              </div>
            )}
        </div>

        <button
          onClick={() => setShowSearch((current) => !current)}
          className="
            lg:hidden

            h-9
            w-9

            rounded-xl

            border
            border-white/10

            flex
            items-center
            justify-center

            bg-[#121525]
          "
        >
          <Search size={18} />
        </button>

        <Link
          href="/dashboard/add-link"
          className="
            lg:hidden

            h-9
            w-9

            rounded-xl

            border
            border-white/10

            flex
            items-center
            justify-center

            bg-[#121525]

            hover:bg-white/5
            transition
          "
        >
          <Plus size={18} />
        </Link>

        {showSearch && (
          <div className="absolute inset-0 z-90 flex items-center gap-2 bg-[#0b0d18] px-4 lg:hidden">
            <div className="flex flex-1 items-center gap-3 rounded-xl border border-white/[0.07] bg-[#121525] px-3 py-2.5">
              <Search size={18} className="shrink-0 text-gray-400" />

              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search links"
                className="
                  w-full

                  bg-transparent
                  outline-none

                  text-sm
                  placeholder:text-gray-500
                "
              />

              {query && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="text-gray-400 hover:text-white transition"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <button
              type="button"
              onClick={() => setShowSearch(false)}
              aria-label="Close search"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/[0.07] bg-[#121525] text-gray-400 transition hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            {results.length > 0 && (
              <div className="absolute left-3 right-3 top-full mt-2 max-h-72 overflow-y-auto rounded-2xl border border-white/10 bg-[#0B0B0F] shadow-[0_20px_60px_rgba(0,0,0,0.45)]">
                {results.map((link) => (
                  <button
                    key={link._id || link.id}
                    type="button"
                    className="w-full border-b border-white/5 px-4 py-3 text-left transition last:border-b-0 hover:bg-white/5"
                  >
                    <div className="font-medium text-sm">
                      {link.title || link.name || link.url || "Untitled link"}
                    </div>

                    <p className="text-xs text-gray-400 truncate">
                      {link.url || link.description || ""}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2"
          >
            {user?.avatar ? (
              <img
                src={user.avatar}
                className="
                  h-10
                  w-10

                  rounded-full

                  object-cover

                  border
                  border-violet-500
                "
              />
            ) : (
              <div
                className="
                  h-10
                  w-10

                  rounded-full

                  bg-violet-600

                  flex
                  items-center
                  justify-center

                  font-semibold
                "
              >
                {initials}
              </div>
            )}

            <ChevronDown size={18} className="hidden lg:block" />
          </button>

          {dropdownOpen && (
            <div
              className="
                absolute
                right-0
                mt-3

                w-72

                rounded-3xl

                border
                border-white/10

                bg-[#0B0B0F]

                backdrop-blur-xl

                shadow-[0_20px_60px_rgba(0,0,0,0.45)]

                overflow-hidden

                z-100
              "
            >
              <div className="p-4 border-b border-white/10">
                <div className="flex items-center gap-3">
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      className="
                        h-14
                        w-14

                        rounded-full

                        object-cover
                      "
                    />
                  ) : (
                    <div
                      className="
                        h-14
                        w-14

                        rounded-full

                        bg-violet-600

                        flex
                        items-center
                        justify-center

                        font-bold
                        text-lg
                      "
                    >
                      {initials}
                    </div>
                  )}

                  <div>
                    <h3 className="font-semibold">{user?.name}</h3>

                    <p
                      className="
                        text-xs
                        text-gray-400
                        truncate
                        max-w-40
                      "
                    >
                      {user?.email}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <button
                  onClick={() => {
                    router.push("/dashboard/profile");
                    setDropdownOpen(false);
                  }}
                  className="
                    w-full

                    flex
                    items-center
                    gap-3

                    px-2
                    py-2

                    rounded-2xl

                    hover:bg-white/5

                    transition
                  "
                >
                  <User size={18} />
                  My Profile
                </button>

                <button
                  onClick={() => {
                    router.push("/dashboard/settings");
                    setDropdownOpen(false);
                  }}
                  className="
                    w-full

                    flex
                    items-center
                    gap-3

                    px-4
                    py-3

                    rounded-2xl

                    hover:bg-white/5

                    transition
                  "
                >
                  <Settings size={18} />
                  Settings
                </button>

                <button
                  onClick={handleLogout}
                  className="
                    w-full

                    flex
                    items-center
                    gap-2

                    px-2
                    py-2

                    rounded-2xl

                    text-red-400

                    hover:bg-red-500/10

                    transition
                  "
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
