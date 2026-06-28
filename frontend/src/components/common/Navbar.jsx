"use client";

import { useEffect, useState } from "react";
import { searchLinks } from "@/services/linkService";
import { Menu, Search, X } from "lucide-react";

export default function Navbar({ openSidebar }) {
  const [showSearch, setShowSearch] = useState(false);

  const [query, setQuery] = useState("");

  const [results, setResults] = useState([]);

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

  return (
    <header
      className="
      lg:hidden

      fixed
      top-0
      left-0
      right-0

      z-[60]

      h-16

      px-4

      flex
      items-center
      justify-between

      border-b
      border-white/10

      bg-[#050816]/95
      backdrop-blur-xl
      "
    >
      {/* LEFT */}

      <div className="flex items-center gap-3">
        <button
          onClick={openSidebar}
          className="
          h-10
          w-10

          rounded-xl

          border
          border-white/10

          flex
          items-center
          justify-center

          bg-white/[0.03]

          hover:border-violet-500/30

          transition
          "
        >
          <Menu size={20} />
        </button>

        {!showSearch && (
          <div>
            <h1 className="font-bold text-lg">LinkNest</h1>

            <p
              className="
              text-[10px]
              text-violet-400
              tracking-widest
              "
            >
              KNOWLEDGE HUB
            </p>
          </div>
        )}
      </div>

      {/* RIGHT */}

      {!showSearch ? (
        <button
          onClick={() => setShowSearch(true)}
          className="
          h-10
          w-10

          rounded-xl

          border
          border-white/10

          flex
          items-center
          justify-center

          bg-white/[0.03]

          hover:border-violet-500/30

          transition
          "
        >
          <Search size={18} />
        </button>
      ) : (
        <div
          className="
          relative

          flex
          items-center
          gap-2

          flex-1
          ml-3
          "
        >
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search links..."
            className="
            flex-1

            h-10

            px-4

            rounded-xl

            border
            border-white/10

            bg-white/[0.03]

            text-sm

            outline-none

            focus:border-violet-500/40
            "
          />

          {/* RESULTS */}

          {results.length > 0 && (
            <div
              className="
              absolute top-12 left-0 right-12
              rounded-2xl
              border
              border-white/10
              bg-[#0B0B0F]
              backdrop-blur-xl
              overflow-hidden
              shadow-xl
              z-[70] "
            >
              {results.map((link) => (
                <a
                  key={link._id}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="
                    block

                    px-4
                    py-3

                    border-b
                    border-white/5

                    hover:bg-white/[0.04]
                    "
                >
                  <p className="font-medium">{link.title}</p>

                  <>
                    <p className="text-xs text-violet-400">
                      📁 {link.collectionId?.name}
                    </p>

                    <p className="text-xs text-gray-400 truncate">{link.url}</p>
                  </>
                </a>
              ))}
            </div>
          )}

          <button
            onClick={() => {
              setShowSearch(false);
              setQuery("");
              setResults([]);
            }}
            className="
            h-10
            w-10
            rounded-xl
            border
            border-white/10 flex
            items-center
            justify-center
            bg-white/[0.03] "
          >
            <X size={18} />
          </button>
        </div>
      )}
    </header>
  );
}
