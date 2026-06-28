"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { getCollectionById } from "@/services/collectionService";
import {
  createLink,
  getLinksByCollection,
  deleteLink,
  updateLink,
  toggleFavorite,
  toggleArchive,
} from "@/services/linkService";

export default function CollectionDetails() {
  const { id } = useParams();

  const [collection, setCollection] = useState(null);
  const [totalLinks, setTotalLinks] = useState(0);
  const [links, setLinks] = useState([]);

  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  const [editingId, setEditingId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editUrl, setEditUrl] = useState("");

  const fetchCollection = async () => {
    try {
      const res = await getCollectionById(id);

      setCollection(res.data.collection.collection);

      setTotalLinks(res.data.collection.totalLinks);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchLinks = async () => {
    try {
      const res = await getLinksByCollection(id);

      setLinks(res.data.links);
    } catch (error) {
      console.error(error);
    }
  };

useEffect(() => {
  if (!id) return;

  const loadData = async () => {
    await fetchCollection();
    await fetchLinks();
  };

  loadData();
}, [id]);

  const handleAddLink = async (e) => {
    e.preventDefault();

    if (!title.trim() || !url.trim()) return;

    try {
      await createLink({
        title,
        url,
        collectionId: id,
      });

      setTitle("");
      setUrl("");

      fetchLinks();
      fetchCollection();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (linkId) => {
    if (!confirm("Delete this link?")) return;

    try {
      await deleteLink(linkId);

      fetchLinks();
      fetchCollection();
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (link) => {
    setEditingId(link._id);
    setEditTitle(link.title);
    setEditUrl(link.url);
  };

  const handleUpdate = async () => {
    try {
      await updateLink(editingId, {
        title: editTitle,
        url: editUrl,
      });

      setEditingId(null);
      fetchLinks();
    } catch (error) {
      console.error(error);
    }
  };

  if (!collection) {
    return <div className="p-5 md:p-8">Loading...</div>;
  }
const handleFavorite = async (linkId) => {
  try {
    await toggleFavorite(linkId);

    setLinks((prev) =>
      prev.map((link) =>
        link._id === linkId
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

const handleArchive = async (linkId) => {
  try {
    await toggleArchive(linkId);

    setLinks((prev) =>
      prev.map((link) =>
        link._id === linkId
          ? {
              ...link,
              isArchived: !link.isArchived,
            }
          : link
      )
    );
  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8">
  <div className="flex items-start justify-between gap-4">
    
    <div className="flex-1">
      <p className="text-violet-400 text-sm uppercase tracking-widest mb-2">
        COLLECTION
      </p>

      <h1 className="text-2xl md:text-4xl font-bold">
        📁 {collection.name}
      </h1>

      <p className="text-gray-500 mt-2">
        Keep related resources organized in one place.
      </p>
    </div>

    <div
      className="
      h-24
      w-24

      rounded-3xl

      bg-violet-600/20
      border
      border-violet-500/20

      flex
      flex-col
      justify-center

      px-4
      shrink-0
      "
    >
      <p className="text-xs text-gray-400">
        Total Links
      </p>

      <p className="text-3xl font-bold">
        {totalLinks}
      </p>
    </div>

  </div>
</div>

      {/* ADD LINK */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-5 md:p-8">
        <h2 className="text-xl md:text-2xl font-bold mb-6">Add New Link</h2>

        <form onSubmit={handleAddLink} className="space-y-4">
          <input
            type="text"
            placeholder="Enter title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 p-4 outline-none focus:border-violet-500"
          />

          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className="w-full rounded-xl border border-white/10 bg-black/20 p-4 outline-none focus:border-violet-500"
          />

          <button
            type="submit"
            className=" w-full md:w-auto px-6 py-3 rounded-xl  bg-gradient-to-r from-violet-600 to-purple-500 font-semibold"
          >
            Add Link
          </button>
        </form>
      </div>

      {/* LINKS */}
      <div>
        <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center mb-6">
          <h2 className="text-2xl md:text-3xl  font-bold">Links</h2>

          <span className="text-gray-400">{links.length} items</span>
        </div>

        {links.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 text-center">
            No links found.
          </div>
        ) : (
          <div className="space-y-5">
            {links.map((link) => (
              <div
                key={link._id}
                className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-6 hover:border-violet-500/40 transition"
              >
                {editingId === link._id ? (
                  <>
                    <input
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/20 p-3 mb-3"
                    />

                    <input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-black/20 p-3 mb-4"
                    />

                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdate}
                        className="px-4 py-2 rounded-xl bg-green-600"
                      >
                        Save
                      </button>

                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 rounded-xl bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                   <div className="flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <h3 className="text-xl font-semibold">{link.title}</h3>

                        <a
                          href={link.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-violet-400 break-all"
                        >
                          {link.url}
                        </a>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 mt-4">
  <button
  onClick={() => handleFavorite(link._id)}
  className="
  h-11
  w-11

  rounded-xl

  border
  border-white/10

  bg-white/[0.03]

  hover:border-yellow-500/40

  flex
  items-center
  justify-center

  text-lg
  "
>
  {link.isFavorite ? "⭐" : "☆"}
</button>
<button
  onClick={() => handleArchive(link._id)}
  className="
  h-11
  w-11

  rounded-xl

  border
  border-white/10

  bg-white/[0.03]

  hover:border-orange-500/40

  flex
  items-center
  justify-center

  text-lg
  "
>
  {link.isArchived ? "📂" : "📦"}
</button>
<button
    onClick={() => startEdit(link)}
    className="
      px-4
      py-2
      rounded-lg
      bg-yellow-500
      text-black
      font-medium
      text-sm
    "
  >
     ✏️ Edit
  </button>

  <button
    onClick={() => handleDelete(link._id)}
    className="
      px-4
      py-2
      rounded-lg
      bg-red-600
      text-white
      font-medium
      text-sm
    "
  >
    Delete
  </button>
</div>
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
