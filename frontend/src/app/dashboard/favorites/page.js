"use client";

import { useEffect, useState } from "react";

import StatsCard from "@/components/dashboard/StatsCard";
import LinkCard from "@/components/dashboard/LinkCard";

import {
  getFavoriteLinks,
} from "@/services/linkService";

export default function FavoritesPage() {
  const [favorites, setFavorites] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    try {
      const res =
        await getFavoriteLinks();

      setFavorites(res.data.links || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const collectionsCount =
    new Set(
      favorites.map(
        (item) =>
          item.collectionId?._id
      )
    ).size;

  const thisWeekFavorites =
    favorites.filter((link) => {
      const created =
        new Date(link.createdAt);

      const now = new Date();

      const diff =
        now - created;

      return (
        diff <
        7 *
          24 *
          60 *
          60 *
          1000
      );
    }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-400">
          Loading favorites...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HERO */}

      <div
        className="
        rounded-3xl
        border
        border-white/10

        bg-white/[0.03]

        backdrop-blur-xl

        p-10

        flex
        flex-col
        lg:flex-row

        justify-between
        gap-8
      "
      >
        <div>
          <p
            className="
            text-violet-400
            uppercase
            tracking-wider
            text-sm
            mb-4
          "
          >
            Favorite Resources
          </p>

          <h1
            className="
            text-5xl
            font-bold
            mb-4
          "
          >
            Favorites ⭐
          </h1>

          <p className="text-gray-400 text-lg">
            Quick access to your most
            important resources.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div
            className="
            rounded-3xl
            border
            border-violet-500/20

            bg-violet-500/10

            p-6
            min-w-[180px]
          "
          >
            <p className="text-gray-400">
              Favorites
            </p>

            <h2 className="text-5xl font-bold mt-2">
              {favorites.length}
            </h2>
          </div>

          <div
            className="
            rounded-3xl
            border
            border-blue-500/20

            bg-blue-500/10

            p-6
            min-w-[180px]
          "
          >
            <p className="text-gray-400">
              Status
            </p>

            <h2 className="text-3xl font-bold mt-2 text-green-400">
              Active
            </h2>
          </div>
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <StatsCard
          title="Total Favorites"
          value={favorites.length}
          icon="⭐"
        />

        <StatsCard
          title="Collections"
          value={collectionsCount}
          icon="📁"
        />

        <StatsCard
          title="This Week"
          value={thisWeekFavorites}
          icon="🔥"
        />
      </div>

      {/* LINKS */}

      <div>
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">
            Favorite Links
          </h2>

          <span className="text-gray-400">
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

            p-20

            text-center
          "
          >
            <div className="text-7xl mb-4">
              ⭐
            </div>

            <h3 className="text-3xl font-bold">
              No Favorites Yet
            </h3>

            <p className="text-gray-400 mt-3">
              Favorite links will appear
              here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5">
            {favorites.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}