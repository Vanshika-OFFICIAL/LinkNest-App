"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { EllipsisVertical, Folder, Pencil, Plus, Trash2 } from "lucide-react";

const folderThemes = [
  "bg-violet-500/20 text-violet-300 shadow-violet-500/20",
  "bg-amber-400/20 text-amber-300 shadow-amber-400/20",
  "bg-emerald-400/20 text-emerald-300 shadow-emerald-400/20",
  "bg-pink-400/20 text-pink-300 shadow-pink-400/20",
];

export default function CollectionCard({ collection, onEdit, onDelete }) {
 
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const themeIndex = collection.name?.charCodeAt(0) % folderThemes.length || 0;
  const linkCount = collection.linksCount || 0;
  const updatedAt = new Date(collection.updatedAt || collection.createdAt);

  useEffect(() => {
    const closeMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", closeMenu);
    return () => document.removeEventListener("mousedown", closeMenu);
  }, []);

  return (
    <article className="group relative rounded-2xl border border-white/[0.08] bg-[#101321]/80 p-4 shadow-[0_10px_24px_rgba(0,0,0,0.14)] transition hover:-translate-y-0.5 hover:border-violet-500/35 hover:bg-[#121629]">
      <div className="flex items-start justify-between gap-3">
        <Link href={`/dashboard/collections/${collection._id}`} className="flex min-w-0 flex-1 items-center gap-3">
          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg shadow-lg ${folderThemes[themeIndex]}`}>
            <Folder size={22} fill="currentColor" className="fill-current/20" />
          </div>
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-white transition group-hover:text-violet-200">{collection.name}</h3>
            <p className="mt-1 text-[11px] text-slate-400">
              <span className="text-violet-300">{linkCount} {linkCount === 1 ? "link" : "links"}</span>
              <span className="mx-1.5 text-slate-600">•</span>
              Updated {updatedAt.toLocaleDateString()}
            </p>
          </div>
        </Link>
        {(onEdit || onDelete) && (
          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label="Collection actions"
              aria-expanded={menuOpen}
              className="rounded-md p-1 text-slate-400 transition hover:bg-white/[0.06] hover:text-white"
            >
              <EllipsisVertical size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full z-20 mt-2 w-32 rounded-xl border border-white/10 bg-[#161a2b] p-1.5 shadow-[0_14px_32px_rgba(0,0,0,0.35)]">
                {onEdit && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onEdit(collection);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-slate-200 transition hover:bg-white/[0.06]"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                )}
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => {
                      setMenuOpen(false);
                      onDelete(collection._id);
                    }}
                    className="flex w-full items-center gap-2 rounded-lg px-2.5 py-2 text-left text-xs text-red-300 transition hover:bg-red-500/10"
                  >
                    <Trash2 size={14} /> Delete
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      <Link href={`/dashboard/collections/${collection._id}`} className="mt-4 block min-h-10 text-xs leading-5 text-slate-400">
        {collection.description || "Organize your saved resources, notes, and useful references."}
      </Link>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-white/[0.06] pt-3">
        <Link
          href={`/dashboard/add-link?collectionId=${collection._id}`}
          className="inline-flex items-center gap-1.5 rounded-lg bg-linear-to-r from-violet-500 to-purple-600 px-3 py-2 text-xs font-semibold text-white shadow-[0_6px_16px_rgba(124,58,237,0.25)] transition hover:brightness-110"
        >
          <Plus size={15} /> Add Link
        </Link>

      </div>
    </article>
  );
}
