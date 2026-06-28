"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import CollectionCard from "@/components/dashboard/CollectionCard";

import {
  getCollections,
  createCollection,
  updateCollection,
  deleteCollection,
} from "@/services/collectionService";

import { getDashboardStats } from "@/services/dashboardService";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const [stats, setStats] = useState({
    totalLinks: 0,
    favoriteLinks: 0,
    archivedLinks: 0,
    collections: 0,
  });

  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [collectionsRes, statsRes] = await Promise.all([
        getCollections(),
        getDashboardStats(),
      ]);

      setCollections(collectionsRes?.data?.collections || []);

      setStats(
        statsRes?.data?.stats || {
          totalLinks: 0,
          favoriteLinks: 0,
          archivedLinks: 0,
          collections: 0,
        },
      );
    } catch (error) {
      console.error("Failed to fetch collections", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setSaving(true);

      if (editingId) {
        await updateCollection(editingId, {
          name,
        });
      } else {
        await createCollection({
          name,
        });
      }

      setName("");
      setEditingId(null);

      await fetchData();
    } catch (error) {
      console.error(error);
      alert("Operation failed");
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (collection) => {
    setEditingId(collection._id);
    setName(collection.name);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this collection?",
    );

    if (!confirmDelete) return;

    try {
      await deleteCollection(id);

      setCollections((prev) =>
        prev.filter((collection) => collection._id !== id),
      );

      setStats((prev) => ({
        ...prev,
        collections: prev.collections > 0 ? prev.collections - 1 : 0,
      }));
    } catch (error) {
      console.error(error);
      alert("Failed to delete collection");
    }
  };

  const filteredCollections = useMemo(() => {
    return collections.filter((collection) =>
      collection.name?.toLowerCase().includes(search.toLowerCase()),
    );
  }, [collections, search]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-400">Loading Collections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* HERO */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
        <p className="text-violet-400 text-sm uppercase tracking-widest">
          Collection Management
        </p>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-3">
          Collections 📁
        </h1>

        <p className="text-gray-400 mt-3">
          Organize all your resources into smart collections.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <StatsCard title="Collections" value={stats.collections} icon="📁" clickable onClick={() => router.push("/dashboard/collections")} />

        <StatsCard title="Resources" value={stats.totalLinks} icon="🔗" clickable onClick={() => router.push("/dashboard")} />

        <StatsCard title="Favorites" value={stats.favoriteLinks} icon="⭐" clickable onClick={() => router.push("/dashboard/favorites")} />

        <StatsCard title="Archived" value={stats.archivedLinks} icon="📦" clickable onClick={() => router.push("/dashboard/archived")}/>
      </div>

      {/* CREATE / EDIT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-5">
          {editingId ? "Edit Collection" : "Create Collection"}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            value={name}
            placeholder="Frontend, Backend, DSA..."
            onChange={(e) => setName(e.target.value)}
            className="
              flex-1
              rounded-xl
              border
              border-white/10
              bg-black/20
              px-5
              py-4
              outline-none
              focus:border-violet-500
            "
          />

          <button
            type="submit"
            disabled={saving}
            className="
               w-full md:w-auto  px-8  py-4
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-purple-500
              font-semibold
            "
          >
            {saving ? "Saving..." : editingId ? "Update" : "Create"}
          </button>
        </form>
      </div>

      {/* SEARCH */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <input
          type="text"
          placeholder="Search collections..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="
            w-full
            rounded-xl
            border
            border-white/10
            bg-black/20
            px-5
            py-4
            outline-none
            focus:border-violet-500
          "
        />
      </div>

      {/* HEADER */}

      <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center">
        <h2 className="text-3xl font-bold">Your Collections</h2>

        <span className="text-gray-400">
          Showing {filteredCollections.length} of {collections.length}
        </span>
      </div>

      {/* COLLECTIONS */}

      {filteredCollections.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-16 text-center">
          <div className="text-7xl mb-4">📂</div>

          <h3 className="text-2xl md:text-3xl font-bold">No Collections Found</h3>

          <p className="text-gray-400 mt-3">
            Create your first collection to start organizing resources.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredCollections.map((collection) => (
            <CollectionCard
              key={collection._id}
              collection={collection}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}
