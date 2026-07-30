"use client";

import { useEffect, useState } from "react";
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
import { getAllLinks } from "@/services/linkService";
import SuccessDialog from "@/components/onboarding/SuccessDialog";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const router = useRouter();
  const [stats, setStats] = useState({
    totalLinks: 0,
    favoriteLinks: 0,
    archivedLinks: 0,
    collections: 0,
  });

  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [createdCollection, setCreatedCollection] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const [collectionsRes, statsRes, linksRes] = await Promise.all([
        getCollections(),
        getDashboardStats(),
        getAllLinks(),
      ]);

      const links = linksRes?.data?.links || [];
      setCollections(
        (collectionsRes?.data?.collections || []).map((collection) => ({
          ...collection,
          linksCount: links.filter(
            (link) => (link.collectionId?._id || link.collectionId) === collection._id,
          ).length,
        })),
      );

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
        const response = await createCollection({
          name,
        });
        setCreatedCollection(response.data.collection);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <p className="text-gray-400">Loading Collections...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <SuccessDialog
        open={Boolean(createdCollection)}
        title="✅ Collection Created!"
        message="Your collection is ready. Now let's add your first resource."
        actionLabel="Add First Link"
        onAction={() => router.push(`/dashboard/add-link?collection=${createdCollection?._id}`)}
        onClose={() => setCreatedCollection(null)}
      />
      {/* HERO */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-6">
        <p className="text-violet-200 text-sm uppercase tracking-widest">
          Collection Management
        </p>

        <h1 className="text-2xl sm:text-4xl md:text-4xl font-bold mt-3">
          Collections 📁
        </h1>

        <p className="text-gray-400 mt-3">
          Organize all your resources into smart collections.
        </p>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 md:gap-4">
        <StatsCard title="Collections" value={stats.collections} icon="📁" clickable onClick={() => router.push("/dashboard/collections")} />

        <StatsCard title="Resources" value={stats.totalLinks} icon="🔗" clickable onClick={() => router.push("/dashboard")} />

        <StatsCard title="Favorites" value={stats.favoriteLinks} icon="⭐" clickable onClick={() => router.push("/dashboard/favorites")} />

        <StatsCard title="Archived" value={stats.archivedLinks} icon="📦" clickable onClick={() => router.push("/dashboard/archived")}/>
      </div>

      {/* CREATE / EDIT */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-4 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-4">
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
               w-full md:w-auto  px-6  py-4
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

      {/* HEADER */}

      <div className="flex flex-col md:flex-row gap-2 justify-between md:items-center">
        <h2 className="text-xl font-bold">Your Collections</h2>

        <span className="text-gray-300">
          {collections.length} collections
        </span>
      </div>

      {/* COLLECTIONS */}

      {collections.length === 0 ? (
        <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 md:p-16 text-center">
          <div className="text-7xl mb-4">📂</div>

          <h3 className="text-2xl md:text-3xl font-bold">No Collections Found</h3>

          <p className="text-gray-400 mt-2">
            Create your first collection to start organizing resources.
          </p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {collections.map((collection) => (
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
