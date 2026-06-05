"use client";

import { useEffect, useState } from "react";

import LinkCard from "@/components/dashboard/LinkCard";

import { getArchivedLinks } from "@/services/linkService";

export default function ArchivedPage() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArchivedLinks();
  }, []);

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

  const collectionCount = new Set(
    links
      .filter((link) => link.collectionId?._id)
      .map((link) => link.collectionId._id)
  ).size;

  if (loading) {
    return (
      <div className="p-10 text-gray-400">
        Loading archived links...
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* HERO */}

      <div
        className="
        rounded-[32px]
        border
        border-white/10

        bg-gradient-to-r
        from-white/[0.03]
        via-violet-500/[0.02]
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
            text-violet-400
            uppercase
            tracking-wider
            text-sm
            font-medium
            "
          >
            ARCHIVED RESOURCES
          </p>

          <h1
            className="
            text-6xl
            font-bold
            mt-3
            "
          >
            Archive 📦
          </h1>

          <p className="text-gray-400 mt-4 text-lg">
            Store links you don't need right now
            but want to keep for future reference.
          </p>
        </div>

        <div
          className="
          h-32
          w-32

          rounded-3xl

          bg-violet-500/10

          border
          border-violet-500/20

          flex
          items-center
          justify-center

          text-6xl
          "
        >
          📦
        </div>
      </div>

      {/* STATS */}

      <div className="grid md:grid-cols-3 gap-6">
        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          "
        >
          <p className="text-gray-400">
            Archived Links
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {links.length}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          "
        >
          <p className="text-gray-400">
            Collections
          </p>

          <h2 className="text-5xl font-bold mt-3">
            {collectionCount}
          </h2>
        </div>

        <div
          className="
          rounded-3xl
          border
          border-white/10
          bg-white/[0.03]
          p-8
          "
        >
          <p className="text-gray-400">
            Status
          </p>

          <h2
            className="
            text-5xl
            font-bold
            mt-3
            text-violet-400
            "
          >
            Active
          </h2>
        </div>
      </div>

      {/* LINKS */}

      <div>
        <div
          className="
          flex
          justify-between
          items-center
          mb-8
          "
        >
          <h2 className="text-5xl font-bold">
            Archived Links
          </h2>

          <span className="text-gray-400 text-lg">
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

            p-20

            text-center
            "
          >
            <div className="text-8xl mb-6">
              📦
            </div>

            <h3 className="text-4xl font-bold">
              No Archived Links
            </h3>

            <p className="text-gray-400 mt-4">
              Archived resources will appear
              here automatically.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {links.map((link) => (
              <LinkCard
                key={link._id}
                link={link}
                showArchived={true}
                showCollection={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}