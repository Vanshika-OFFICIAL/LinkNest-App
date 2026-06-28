"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";
import LinkCard from "@/components/dashboard/LinkCard";
import CollectionCard from "@/components/dashboard/CollectionCard";

import { getCurrentUser } from "@/services/authService";
import { getAllLinks } from "@/services/linkService";
import { getCollections } from "@/services/collectionService";
import { getDashboardStats } from "@/services/dashboardService";

const initialStats = {
  totalLinks: 0,
  favoriteLinks: 0,
  archivedLinks: 0,
  collections: 0,
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(initialStats);
  const [collections, setCollections] = useState([]);
  const [recentLinks, setRecentLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const fetchDashboard = async () => {
      try {
        const [userRes, collectionsRes, allLinksRes, statsRes] =
          await Promise.all([
            getCurrentUser(),
            getCollections(),
            getAllLinks(),
            getDashboardStats(),
          ]);

        if (!isMounted) {
          return;
        }

        const fetchedCollections =
          collectionsRes?.data?.collections || [];
        const fetchedLinks = allLinksRes?.data?.links || [];
        const fetchedStats = statsRes?.data?.stats || initialStats;

        setUser(userRes?.data?.user || null);
        setCollections(fetchedCollections);
        setStats({
          totalLinks: Number(fetchedStats.totalLinks) || 0,
          favoriteLinks: Number(fetchedStats.favoriteLinks) || 0,
          archivedLinks: Number(fetchedStats.archivedLinks) || 0,
          collections: Number(fetchedStats.collections) || 0,
        });
        setRecentLinks(
          [...fetchedLinks]
            .sort(
              (firstLink, secondLink) =>
                new Date(secondLink.createdAt || 0) -
                new Date(firstLink.createdAt || 0)
            )
            .slice(0, 5)
        );
      } catch (error) {
        console.error("Failed to load dashboard data", error);

        if (!isMounted) {
          return;
        }

        setUser(null);
        setStats(initialStats);
        setCollections([]);
        setRecentLinks([]);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchDashboard();

    return () => {
      isMounted = false;
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[80vh]">
        <p className="text-gray-400">Loading Dashboard...</p>
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

        p-6 md:p-10

        flex
        items-center
        justify-between
      "
      >
<div>
          <p
            className="
            uppercase
            tracking-[0.2em]
            text-violet-400
            text-sm
            mb-4
          "
          >
            WELCOME BACK
          </p>

          <h1
            className="
            text-2xl sm:text-3xl md:text-4xl lg:text-5xl
            font-bold
            mb-4
          "
          >
            Hello {user?.name} 👋
          </h1>

          <p
            className="
            text-gray-400
            max-w-xl
          "
          >
            Organize, save and access your favorite resources in one place.
          </p>
        </div>

        <div
          className="
          h-20
w-20

md:h-24
md:w-24

lg:h-32
lg:w-32

text-4xl
md:text-5xl
lg:text-6xl

          bg-gradient-to-br
          from-violet-500/20
          to-purple-500/20

          border
          border-violet-500/20

          flex
          items-center
          justify-center

          text-2xl
        "
        >
          🚀
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-4 gap-6">
        <StatsCard title="Collections" value={stats.collections} icon="📁"  clickable onClick={() => router.push("/dashboard/collections")}  />

        <StatsCard title="Favorites" value={stats.favoriteLinks} icon="⭐" clickable onClick={() => router.push("/dashboard/favorites")} />

        <StatsCard title="Archived" value={stats.archivedLinks} icon="📦" clickable onClick={() => router.push("/dashboard/archived")} />

        <StatsCard title="Resources" value={stats.totalLinks} icon="🔗" clickable onClick={() => router.push("/dashboard")} />
      </div>

      {/* CONTENT */}

      <div className="grid xl:grid-cols-3 gap-8">
        {/* LEFT */}

        <div className="xl:col-span-2 space-y-8">
          {/* Recent Resources */}

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl md:text-3xl font-bold">Recent Resources</h2>

              <span className="text-gray-400">{recentLinks.length}</span>
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
                  <LinkCard key={link._id} link={link} />
                ))
              )}
            </div>
          </div>

          {/* Collections */}

          <div>
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-2xl md:text-3xl font-bold">Collections</h2>

              <span className="text-gray-400">{stats.collections}</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {collections.slice(0, 4).map((collection) => (
                <CollectionCard key={collection._id} collection={collection} />
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
            <h3 className="text-xl font-semibold mb-4">Profile</h3>

            <div className="space-y-3">
              <p className="text-gray-300">{user?.name}</p>

              <p className="text-gray-500 text-sm">{user?.email}</p>
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
            <h3 className="text-xl font-semibold mb-5">Activity</h3>

            <div className="space-y-4">
              <div>
                ⭐ Favorites:
                <span className="ml-2 text-violet-400">
                  {stats.favoriteLinks}
                </span>
              </div>

              <div>
                📦 Archived:
                <span className="ml-2 text-violet-400">
                  {stats.archivedLinks}
                </span>
              </div>

              <div>
                📁 Collections:
                <span className="ml-2 text-violet-400">{stats.collections}</span>
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
            <h3 className="font-semibold mb-3">Productivity Tip</h3>

            <p className="text-sm text-gray-400">
              Organize links into topic specific collections to improve
              retrieval speed and reduce information overload.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}