"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Link2, Plus } from "lucide-react";

import Link from "next/link";
import LinkCard from "@/components/dashboard/LinkCard";
import {
  deleteLink,
  getAllLinks,
  toggleArchive,
  toggleFavorite,
} from "@/services/linkService";

export default function AllLinksPage() {
  const router = useRouter();
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await getAllLinks();
        setLinks(response.data.links || []);
      } catch (error) {
        console.error("Failed to load links", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const updateLinkState = (linkId, field) => {
    setLinks((currentLinks) =>
      currentLinks.map((link) =>
        link._id === linkId ? { ...link, [field]: !link[field] } : link,
      ),
    );
  };

  const handleFavorite = async (linkId) => {
    try {
      await toggleFavorite(linkId);
      updateLinkState(linkId, "isFavorite");
    } catch (error) {
      console.error("Failed to update favorite", error);
    }
  };

  const handleArchive = async (linkId) => {
    try {
      await toggleArchive(linkId);
      updateLinkState(linkId, "isArchived");
    } catch (error) {
      console.error("Failed to update archive", error);
    }
  };

  const handleDelete = async (linkId) => {
    if (!window.confirm("Delete this link permanently?")) return;

    try {
      await deleteLink(linkId);
      setLinks((currentLinks) => currentLinks.filter((link) => link._id !== linkId));
    } catch (error) {
      console.error("Failed to delete link", error);
    }
  };

  const handleEdit = (link) => {
    const collectionId = link.collectionId?._id || link.collectionId;
    if (collectionId) router.push(`/dashboard/collections/${collectionId}`);
  };

  if (loading) {
    return <div className="flex min-h-[70vh] items-center justify-center text-slate-400">Loading links...</div>;
  }

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="flex flex-col justify-between gap-4 rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-violet-500/[0.05] to-white/[0.02] p-5 md:flex-row md:items-center md:p-6">
        <div>
          <p className="text-sm uppercase tracking-[0.18em] text-violet-400">Resource Library</p>
          <h1 className="mt-2 text-3xl font-bold">All Links</h1>
          <p className="mt-2 text-slate-400">Browse every saved resource and its folder.</p>
        </div>
        <Link href="/dashboard/add-link" className="inline-flex items-center justify-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white">
          <Plus size={18} /> Add Link
        </Link>
      </section>

      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold">Saved Resources</h2>
        <span className="text-sm text-slate-400">{links.length} items</span>
      </div>

      {links.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
          <Link2 size={42} className="mx-auto text-violet-400" />
          <h2 className="mt-4 text-2xl font-bold">No Links Yet</h2>
          <p className="mt-2 text-slate-400">Add your first resource to build your library.</p>
          <Link href="/dashboard/add-link" className="mt-5 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-4 py-3 text-sm font-semibold text-white">
            <Plus size={18} /> Add Your First Link
          </Link>
        </div>
      ) : (
        <div className="space-y-5">
          {links.map((link) => (
            <LinkCard
              key={link._id}
              link={link}
              showCollection
              onFavorite={handleFavorite}
              onArchive={handleArchive}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
