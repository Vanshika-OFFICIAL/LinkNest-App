"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import LinkCard from "@/components/dashboard/LinkCard";
import EmptyCollectionLinksPrompt from "@/components/dashboard/EmptyCollectionLinksPrompt";

import { getCollectionById } from "@/services/collectionService";
import {
  getLinksByCollection,
  deleteLink,
  updateLink,
  toggleFavorite,
  toggleArchive,
} from "@/services/linkService";

export default function CollectionDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [collection, setCollection] = useState(null);
  const [totalLinks, setTotalLinks] = useState(0);
  const [links, setLinks] = useState([]);

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
    <div className="space-y-6">
      {/* HEADER */}
      <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 md:p-6">
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

      <p className="text-3xl font-bold items-center">
        {totalLinks}
      </p>
    </div>

  </div>
</div>

      {/* LINKS */}
      <div>
        <div className="flex flex-col md:flex-row gap-3 justify-between md:items-center mb-4">
          <h2 className="text-2xl md:text-2xl  font-bold">Links</h2>

          <span className="text-gray-400">{links.length} items</span>
        </div>

        {links.length === 0 ? (
          <EmptyCollectionLinksPrompt
            onAddLink={() => router.push(`/dashboard/add-link?collectionId=${id}`)}
          />
        ) : (
          <div className="space-y-5">
            {links.map((link) => (
              <div
                key={link._id}
                className={
                  editingId === link._id
                    ? "rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition hover:border-violet-500/40"
                    : ""
                }
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
                    {/* Replaced by the shared LinkCard action layout. */}
                    {/*
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
      px-2
      py-2
      rounded-lg
      bg-yellow-300
      text-black
      font-medium
      text-sm
    "
  >
     ✏️
  </button>

  <button
    onClick={() => handleDelete(link._id)}
    className="
      px-2
      py-2
      rounded-lg
      bg-red-500
      text-white
      font-medium
      text-sm
    "
  >
    🗑️
  </button>
</div>
                    </div>
                    */}
                    <LinkCard
                      link={link}
                      showCollection={false}
                      onFavorite={handleFavorite}
                      onArchive={handleArchive}
                      onEdit={startEdit}
                      onDelete={handleDelete}
                    />
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
