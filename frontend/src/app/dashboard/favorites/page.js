"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import LinkCard from "@/components/dashboard/LinkCard";

import {
  getFavoriteLinks,
  toggleFavorite,
  toggleArchive,
  deleteLink,
} from "@/services/linkService";

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res = await getFavoriteLinks();

      setFavorites(res.data.links || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavorite = async (id) => {
    try {
      await toggleFavorite(id);

      setFavorites((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (id) => {
    try {
      await toggleArchive(id);

      setFavorites((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this link permanently?"
    );

    if (!confirmDelete) return;

    try {
      await deleteLink(id);

      setFavorites((prev) =>
        prev.filter((item) => item._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const collectionsCount = new Set(
    favorites
      .filter((item) => item.collectionId)
      .map((item) => item.collectionId._id)
  ).size;

  const thisWeekFavorites = favorites.filter((link) => {
    const created = new Date(link.createdAt);
    const now = new Date();

    return (
      now - created <
      7 * 24 * 60 * 60 * 1000
    );
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-400 text-lg">
          Loading favorites...
        </p>
      </div>
    );
  }
const thisMonthLinks = favorites.filter((link) => {
  const created = new Date(link.createdAt);
  const now = new Date();

  return (
    now - created <
    30 * 24 * 60 * 60 * 1000
  );
}).length;
  return (
    <div className="space-y-10">
      {/* HERO */}

      <div
        className="
        rounded-3xl
        border
        border-white/10

        bg-gradient-to-r
        from-white/[0.04]
        via-violet-500/[0.04]
        to-white/[0.02]

        p-5 md:p-10
        flex
        flex-col
        md:flex-row

        justify-between
        gap-6
        items-start md:items-center
        backdrop-blur-xl
      "
      >
        <div>
          <p
            className="
             text-violet-400
            uppercase
            tracking-widest
            text-sm
            mb-4
          "
          >
            Favorite Resources
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Favorites ⭐
          </h1>

          <p className="text-gray-400">
            All your important saved links in one place.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Favorites"
          value={favorites.length}
          icon="⭐"
          clickable
          onClick={() => router.push("/dashboard/favorites")}
        />

        <StatsCard
          title="Collections"
          value={collectionsCount}
          icon="📁"
          clickable
          onClick={() => router.push("/dashboard/collections")}
        />

       <StatsCard
  title="This Month"
  value={thisMonthLinks}
  icon="🔥"
  clickable
  onClick={() => router.push("/dashboard")}
/>
      </div>

      {/* LINKS */}

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            Favorite Links
          </h2>

          <span className="text-gray-400 text-sm md:text-base">
            {favorites.length} total
          </span>
        </div>

        {favorites.length === 0 ? (
          <div
            className="
            rounded-3xl
            border
            border-white/10

            bg-white/[0.03]

            p-8 md:p-20

            text-center
          "
          >
            <div className="text-5xl md:text-7xl mb-4">
              ⭐
            </div>

            <h3 className="text-xl md:text-3xl font-bold">
              No Favorites Yet
            </h3>

            <p className="text-gray-400 mt-3">
              Favorite links will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {favorites.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                showFavorite={true}
                onFavorite={handleFavorite}
                onArchive={handleArchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}