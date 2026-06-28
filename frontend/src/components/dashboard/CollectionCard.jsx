"use client";

import Link from "next/link";

export default function CollectionCard({ collection, onEdit, onDelete }) {
  return (
    <div
      className="
      group

      rounded-3xl

      border
      border-white/10

      bg-gradient-to-br
      from-white/[0.03]
      via-violet-500/[0.02]
      to-white/[0.02]

      backdrop-blur-xl

      p-6

      hover:border-violet-500/40
      hover:-translate-y-1

      transition-all
      duration-300
    "
    >
      <Link href={`/dashboard/collections/${collection._id}`}>
        <div>
          <div className="flex justify-between items-start  gap-3">
            <div className="text-4xl md:text-5xl">📁</div>

            <span
              className="
              text-violet-400
              text-lg md:text-xl

              opacity-100 md:opacity-0
              group-hover:opacity-100

              transition
            "
            >
              →
            </span>
          </div>

          <h3
            className="
            text-lg md:text-xl break-words font-bold mt-4 group-hover:text-violet-400 transition">
            {collection.name}
          </h3>

          <p className="text-gray-500 text-sm mt-3">
            Created {new Date(collection.createdAt).toLocaleDateString()}
          </p>

          {collection.linksCount !== undefined && (
            <div
              className="
              mt-4

              inline-flex
              items-center

              gap-2

              px-3
              py-1

              rounded-full

              bg-violet-500/10
              border
              border-violet-500/20

              text-violet-300
              text-xs
            "
            >
              🔗 {collection.linksCount} Links
            </div>
          )}
        </div>
      </Link>

      {(onEdit || onDelete) && (
        <div
          className="
          mt-6
          pt-4

          border-t
          border-white/10

          flex
          gap-2
        "
        >
          {onEdit && (
            <button
              onClick={() => onEdit(collection)}
              className="
              flex-1

              py-3 min-h-[44px]

              rounded-xl

              bg-blue-500/10
              border
              border-blue-500/20

              text-blue-300

              hover:bg-blue-500/20

              transition
            "
            >
              Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(collection._id)}
              className="
              flex-1

              py-2

              rounded-xl

              bg-red-500/10
              border
              border-red-500/20

              text-red-300

              hover:bg-red-500/20

              transition
            "
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  );
}
