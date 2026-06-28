"use client";

import { useEffect, useState } from "react";

import LinkCard from "@/components/dashboard/LinkCard";
import { useRouter } from "next/navigation";
import StatsCard from "@/components/dashboard/StatsCard";

import {
  getArchivedLinks,
  toggleArchive,
  toggleFavorite,
  deleteLink,
} from "@/services/linkService";

export default function ArchivedPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fetchArchivedLinks = async () => {
    try {
      const res = await getArchivedLinks();

      setLinks(res.data.links || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
useEffect(() => {
    fetchArchivedLinks();
  }, []);

  const handleUnarchive = async (id) => {
    try {
      await toggleArchive(id);

      setLinks((prev) =>
        prev.filter((link) => link._id !== id)
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

      setLinks((prev) =>
        prev.filter((link) => link._id !== id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  const collectionCount = new Set(
    links
      .filter((link) => link.collectionId?._id)
      .map((link) => link.collectionId._id)
  ).size;

  const thisMonthArchived = links.filter((link) => {
    const created = new Date(link.createdAt);
    const now = new Date();

    return (
      now - created <
      30 * 24 * 60 * 60 * 1000
    );
  }).length;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <p className="text-gray-400">
          Loading archived links...
        </p>
      </div>
    );
  }
const handleFavorite = async (id) => {
  try {
    await toggleFavorite(id);

    setLinks((prev) =>
      prev.map((link) =>
        link._id === id
          ? {
              ...link,
              isFavorite: !link.isFavorite,
            }
          : link
      )
    );
  } catch (error) {
    console.error(error);
  }
};
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

        p-5 md:p-10 flex flex-col md:flex-row gap-6 justify-between
items-start
md:items-center
      "
      >
        <div>
          <p className=" text-violet-400 uppercase tracking-widest text-sm mb-4">
            Archived Resources
          </p>

          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Archive 📦
          </h1>

          <p className="text-gray-400">
            Store links for future reference.
          </p>
        </div>
      </div>

      {/* STATS */}

      <div className="grid grid-cols-3 md:grid-cols-3 gap-4 md:gap-6">
        <StatsCard
          title="Archived"
          value={links.length}
          icon="📦"
          clickable
          onClick={() => router.push("/dashboard/archived")}
        />

        <StatsCard
          title="Collections"
          value={collectionCount}
          icon="📁"
          clickable
          onClick={() => router.push("/dashboard/collections")}
        />

        <StatsCard
          title="This Month"
          value={thisMonthArchived}
          icon="🔥"
          clickable
          onClick={() => router.push("/dashboard")}
        />
      </div>

      {/* LINKS */}

      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-4xl font-bold">
            Archived Links
          </h2>

          <span className="text-gray-400 text-sm md:text-base">
            {links.length} total
          </span>
        </div>

        {links.length === 0 ? (
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
            <div className="text-8xl mb-6">
              📦
            </div>

            <h3 className="text-xl md:text-3xl font-bold">
              No Archived Links
            </h3>

            <p className="text-gray-400 mt-4">
              Archived resources will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                showArchived={true}
                showCollection={true}
                onFavorite={handleFavorite}
                onArchive={handleUnarchive}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}