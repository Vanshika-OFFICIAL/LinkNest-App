"use client";

import { useEffect, useState } from "react";

import StatsCard from "@/components/dashboard/StatsCard";
import LinkCard from "@/components/dashboard/LinkCard";
import CollectionCard from "@/components/dashboard/CollectionCard";

import { getCurrentUser } from "@/services/authService";

import {
  getFavoriteLinks,
  getArchivedLinks,
} from "@/services/linkService";

import { getCollections } from "@/services/collectionService";

export default function DashboardPage() {
  const [user, setUser] = useState(null);

  const [favorites, setFavorites] =
    useState([]);

  const [archived, setArchived] =
    useState([]);

  const [collections, setCollections] =
    useState([]);

  const [recentLinks, setRecentLinks] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const [
        userRes,
        favoritesRes,
        archivedRes,
        collectionsRes,
      ] = await Promise.all([
        getCurrentUser(),
        getFavoriteLinks(),
        getArchivedLinks(),
        getCollections(),
      ]);

      setUser(userRes.data.user);

      setFavorites(
        favoritesRes.data.links || []
      );

      setArchived(
        archivedRes.data.links || []
      );

      setCollections(
        collectionsRes.data.collections || []
      );

      const latestLinks = [];

      collectionsRes.data.collections
        ?.slice(0, 4)
        ?.forEach((collection) => {
          latestLinks.push({
            _id: collection._id,
            title: collection.name,
            url: "Collection Resource",
            tags: ["collection"],
            createdAt:
              collection.createdAt,
          });
        });

      setRecentLinks(latestLinks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-400">
          Loading Dashboard...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
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

        backdrop-blur-xl

        p-10

        flex
        items-center
        justify-between
      "
      >
        <div>
          <p
            className="
            uppercase
            tracking-widest

            text-violet-400
            text-sm
            mb-3
          "
          >
            Knowledge Hub
          </p>

          <h1
            className="
            text-5xl
            font-bold
            mb-4
          "
          >
            Welcome{" "}
            {user?.name || "User"} 👋
          </h1>

          <p className="text-gray-400">
            Organize, favorite and archive
            your learning resources in one
            place.
          </p>
        </div>

        <div
          className="
          h-32
          w-32

          rounded-3xl

          bg-gradient-to-br
          from-violet-500/20
          to-purple-500/20

          border
          border-violet-500/20

          flex
          items-center
          justify-center

          text-6xl
        "
        >
          🚀
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard
          title="Collections"
          value={collections.length}
          icon="📁"
        />

        <StatsCard
          title="Favorites"
          value={favorites.length}
          icon="⭐"
        />

        <StatsCard
          title="Archived"
          value={archived.length}
          icon="📦"
        />

        <StatsCard
          title="Resources"
          value={
            favorites.length +
            archived.length
          }
          icon="🔗"
        />
      </div>

      {/* CONTENT */}

      <div className="grid xl:grid-cols-3 gap-8">
        {/* LEFT */}

        <div className="xl:col-span-2 space-y-8">
          {/* Recent Resources */}

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-bold">
                Recent Resources
              </h2>

              <span className="text-gray-400">
                {recentLinks.length}
              </span>
            </div>

            <div className="space-y-4">
              {recentLinks.length === 0 ? (
                <div
                  className="
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  p-10
                  text-center
                "
                >
                  No Resources Found
                </div>
              ) : (
                recentLinks.map((link) => (
                  <LinkCard
                    key={link._id}
                    link={link}
                  />
                ))
              )}
            </div>
          </div>

          {/* Collections */}

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-3xl font-bold">
                Collections
              </h2>

              <span className="text-gray-400">
                {collections.length}
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-5">
              {collections
                .slice(0, 4)
                .map((collection) => (
                  <CollectionCard
                    key={collection._id}
                    collection={
                      collection
                    }
                  />
                ))}
            </div>
          </div>
        </div>

        {/* RIGHT */}

        <div className="space-y-6">
          {/* Profile */}

          <div
            className="
            rounded-3xl

            border
            border-white/10

            bg-white/[0.03]

            p-6
          "
          >
            <h3 className="text-xl font-semibold mb-4">
              Profile
            </h3>

            <div className="space-y-3">
              <p className="text-gray-300">
                {user?.name}
              </p>

              <p className="text-gray-500 text-sm">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Activity */}

          <div
            className="
            rounded-3xl

            border
            border-white/10

            bg-white/[0.03]

            p-6
          "
          >
            <h3 className="text-xl font-semibold mb-5">
              Activity
            </h3>

            <div className="space-y-4">
              <div>
                ⭐ Favorites:
                <span className="ml-2 text-violet-400">
                  {favorites.length}
                </span>
              </div>

              <div>
                📦 Archived:
                <span className="ml-2 text-violet-400">
                  {archived.length}
                </span>
              </div>

              <div>
                📁 Collections:
                <span className="ml-2 text-violet-400">
                  {collections.length}
                </span>
              </div>
            </div>
          </div>

          {/* Quick Tips */}

          <div
            className="
            rounded-3xl

            border
            border-violet-500/20

            bg-violet-500/5

            p-6
          "
          >
            <h3 className="font-semibold mb-3">
              Productivity Tip
            </h3>

            <p className="text-sm text-gray-400">
              Organize links into topic
              specific collections to
              improve retrieval speed and
              reduce information overload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}