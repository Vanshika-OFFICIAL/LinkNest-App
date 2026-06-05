"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createLink } from "@/services/linkService";
import { getCollections } from "@/services/collectionService";

import { useEffect } from "react";

export default function AddLinkPage() {
  const router = useRouter();

  const [collections, setCollections] =
    useState([]);

  const [formData, setFormData] =
    useState({
      title: "",
      url: "",
      description: "",
      tags: "",
      collectionId: "",
    });

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections =
    async () => {
      try {
        const res =
          await getCollections();

        setCollections(
          res.data.collections || []
        );
      } catch (error) {
        console.error(error);
      }
    };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        await createLink({
          ...formData,
          tags: formData.tags
            .split(",")
            .map((tag) =>
              tag.trim()
            )
            .filter(Boolean),
        });

        router.push(
          "/dashboard"
        );
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

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

        p-10
      "
      >
        <p className="uppercase tracking-widest text-violet-400 text-sm mb-3">
          Resource Management
        </p>

        <h1 className="text-5xl font-bold mb-4">
          Add New Link 🔗
        </h1>

        <p className="text-gray-400">
          Save resources, articles,
          videos and references.
        </p>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
        rounded-3xl
        border
        border-white/10

        bg-white/[0.03]

        p-8

        space-y-6
      "
      >
        <div>
          <label className="block mb-2 font-medium">
            Link Title *
          </label>

          <input
            type="text"
            name="title"
            required
            value={
              formData.title
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10

            outline-none
          "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            URL *
          </label>

          <input
            type="url"
            name="url"
            required
            value={formData.url}
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10
          "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Description
          </label>

          <textarea
            rows="4"
            name="description"
            value={
              formData.description
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10
          "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Tags
          </label>

          <input
            type="text"
            name="tags"
            placeholder="react, frontend, interview"
            value={
              formData.tags
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10
          "
          />
        </div>

        <div>
          <label className="block mb-2 font-medium">
            Collection
            (Optional)
          </label>

          <select
            name="collectionId"
            value={
              formData.collectionId
            }
            onChange={
              handleChange
            }
            className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10
          "
          >
            <option value="">
              No Collection
            </option>

            {collections.map(
              (
                collection
              ) => (
                <option
                  key={
                    collection._id
                  }
                  value={
                    collection._id
                  }
                >
                  {
                    collection.name
                  }
                </option>
              )
            )}
          </select>
        </div>

        <button
          disabled={loading}
          className="
          px-8
          py-4

          rounded-2xl

          bg-gradient-to-r
          from-violet-500
          to-purple-500

          font-semibold
        "
        >
          {loading
            ? "Saving..."
            : "Save Link"}
        </button>
      </form>
    </div>
  );
}