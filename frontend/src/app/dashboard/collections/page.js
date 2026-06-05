"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

import {
  getCollections,
  createCollection,
} from "@/services/collectionService";

export default function CollectionsPage() {
  const [collections, setCollections] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      const res = await getCollections();
      setCollections(res.data.collections);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  const handleCreateCollection = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      setLoading(true);

      await createCollection({
        name,
      });

      setName("");
      fetchCollections();
    } catch (error) {
      console.error(error);
      alert("Failed to create collection");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div>
            <p className="text-violet-400 text-sm font-medium">
              COLLECTION MANAGEMENT
            </p>

            <h1 className="text-4xl font-bold mt-2">
              Organize Your Links 📁
            </h1>

            <p className="text-gray-400 mt-3 max-w-xl">
              Create collections and organize
              your resources efficiently.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-violet-500/20 bg-violet-500/10 p-5 min-w-[160px]">
              <p className="text-gray-400 text-sm">
                Collections
              </p>

              <p className="text-3xl font-bold mt-1">
                {collections.length}
              </p>
            </div>

            <div className="rounded-2xl border border-blue-500/20 bg-blue-500/10 p-5 min-w-[160px]">
              <p className="text-gray-400 text-sm">
                Status
              </p>

              <p className="text-lg font-semibold mt-2">
                Active
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CREATE COLLECTION */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
        <h2 className="text-2xl font-bold mb-5">
          Create Collection
        </h2>

        <form
          onSubmit={handleCreateCollection}
          className="flex flex-col md:flex-row gap-4"
        >
          <input
            type="text"
            placeholder="Frontend, Backend, DSA..."
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
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
            disabled={loading}
            className="
              px-8
              py-4
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-purple-500
              font-semibold
              hover:scale-105
              transition
            "
          >
            {loading
              ? "Creating..."
              : "Create Collection"}
          </button>
        </form>
      </div>

      {/* COLLECTION GRID */}
      <div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold">
            Your Collections
          </h2>

          <span className="text-gray-400">
            {collections.length} total
          </span>
        </div>

        {collections.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-12 text-center">
            <div className="text-6xl mb-4">
              📂
            </div>

            <h3 className="text-2xl font-semibold">
              No Collections Yet
            </h3>

            <p className="text-gray-400 mt-3">
              Create your first collection to
              start organizing links.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {collections.map(
              (collection) => (
                <Link
                  key={collection._id}
                  href={`/dashboard/collections/${collection._id}`}
                >
                  <div
                    className="
                    group
                    h-full
                    rounded-3xl
                    border
                    border-white/10
                    bg-white/5
                    backdrop-blur-xl
                    p-6
                    hover:border-violet-500/50
                    hover:-translate-y-1
                    transition-all
                    duration-300
                    cursor-pointer
                  "
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="text-5xl mb-4">
                          📁
                        </div>

                        <h3 className="text-xl font-bold group-hover:text-violet-400 transition">
                          {collection.name}
                        </h3>
                      </div>

                      <div className="text-violet-400 text-xl">
                        →
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-white/10">
                      <p className="text-xs text-gray-500">
                        CREATED
                      </p>

                      <p className="text-sm mt-1">
                        {new Date(
                          collection.createdAt
                        ).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}