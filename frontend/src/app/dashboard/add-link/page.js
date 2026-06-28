"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createLink } from "@/services/linkService";
import { getCollections } from "@/services/collectionService";

import { useEffect } from "react";

export default function AddLinkPage() {
  const router = useRouter();

  const [collections, setCollections] = useState([]);

  const [formData, setFormData] = useState({
    title: "",
    url: "",
    description: "",
    tags: "",
    collectionId: "",
  });

  const [loading, setLoading] = useState(false);

  const fetchCollections = async () => {
    try {
      const res = await getCollections();

      setCollections(res.data.collections || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await createLink({
        ...formData,
        tags: formData.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      router.push("/dashboard");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchCollections();
  }, []);
  return (
    <div className="max-w-6xl mx-auto space-y-8">
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

     p-5 md:p-8

flex
flex-col
md:flex-row

gap-6

justify-between
items-start
md:items-center
    "
      >
        <div>
          <p className="uppercase tracking-widest text-violet-400 text-sm mb-3">
            Resource Management
          </p>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Add New Link 🔗</h1>

          <p className="text-gray-400">
            Save resources, articles, videos and references.
          </p>
        </div>

        <div
          className="
        h-16
        w-16
        md:h-24 md:w-24
        rounded-3xl

        bg-violet-500/10
        border
        border-violet-500/20

        flex
        items-center
        justify-center

        text-3xl md:text-5xl
      "
        >
          🔗
        </div>
      </div>

      {/* FORM */}

      <form
        onSubmit={handleSubmit}
        className="
      rounded-3xl
      border
      border-white/10

      bg-white/[0.03]

      p-5 md:p-8

      space-y-6
    "
      >
        {/* TITLE + URL */}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Link Title *
            </label>

            <input
              type="text"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10

            focus:border-violet-500/40
            outline-none
          "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">URL *</label>

            <input
              type="url"
              name="url"
              required
              value={formData.url}
              onChange={handleChange}
              className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10

            focus:border-violet-500/40
            outline-none
          "
            />
          </div>
        </div>

        {/* DESCRIPTION */}

        <div>
          <label className="block mb-2 text-sm text-gray-400">
            Description
          </label>

          <textarea
            rows="3"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="
          w-full
          p-4
          rounded-xl

          bg-black/40
          border
          border-white/10

          focus:border-violet-500/40
          outline-none
        "
          />
        </div>

        {/* TAGS + COLLECTION */}

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-sm text-gray-400">Tags</label>

            <input
              type="text"
              name="tags"
              placeholder="react, frontend, interview"
              value={formData.tags}
              onChange={handleChange}
              className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10

            focus:border-violet-500/40
            outline-none
          "
            />
          </div>

          <div>
            <label className="block mb-2 text-sm text-gray-400">
              Collection (Optional)
            </label>

            <select
              name="collectionId"
              value={formData.collectionId}
              onChange={handleChange}
              className="
            w-full
            p-4
            rounded-xl

            bg-black/40
            border
            border-white/10

            focus:border-violet-500/40
            outline-none
          "
            >
              <option value="">No Collection</option>

              {collections.map((collection) => (
                <option key={collection._id} value={collection._id}>
                  {collection.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* ACTIONS */}

        <div className="flex justify-stretch md:justify-end pt-2">
          <button
            disabled={loading}
            className="
          w-full md:w-auto px-8 py-4

          rounded-2xl

          bg-gradient-to-r
          from-violet-500
          to-purple-500

          hover:scale-[1.02]

          transition-all

          font-semibold
        "
          >
            {loading ? "Saving..." : "Save Link"}
          </button>
        </div>
      </form>
    </div>
  );
}
