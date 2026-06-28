"use client";

export default function LinkCard({
  link,
  showCollection = true,

  onFavorite,
  onArchive,
  onDelete,
  onEdit,
}) {
  return (
    <div
      className="
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
      hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]

      transition-all
      duration-300
      "
    >
      {/* TOP */}

      <div className="flex justify-between gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg md:text-xl font-bold">
            {link.title}
          </h3>

          <a
            href={link.url}
            target="_blank"
            rel="noreferrer"
            className="
            text-violet-400
            hover:text-violet-300

            break-all

            mt-2
            block
            "
          >
            {link.url} ↗
          </a>

          {link.description && (
            <p className="text-gray-400 mt-3">
              {link.description}
            </p>
          )}

          {link.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4">
              {link.tags.map((tag) => (
                <span
                  key={tag}
                  className="
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
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* FOOTER */}

      <div
        className="
        mt-6
        pt-4

        border-t
        border-white/10

        flex
        flex-col
        md:flex-row

        justify-between
        gap-4
        "
      >
        {/* LEFT */}

        <div>
          {showCollection && (
            <div
              className="
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
              📁 {link.collectionId?.name || "No Collection"}
            </div>
          )}

          <p className="text-xs text-gray-500 mt-3">
            {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* RIGHT */}

        <div className="flex flex-wrap gap-3">
          {onFavorite && (
            <button
              onClick={() => onFavorite(link._id)}
              title={
                link.isFavorite
                  ? "Remove Favorite"
                  : "Add Favorite"
              }
              className="
              h-12
              w-12

              rounded-xl

              border
              border-white/10

              flex
              items-center
              justify-center

              text-xl

              hover:border-yellow-400
              hover:bg-yellow-500/10

              transition
              "
            >
              {link.isFavorite ? "⭐" : "☆"}
            </button>
          )}

          {onArchive && (
            <button
              onClick={() => onArchive(link._id)}
              title={
                link.isArchived
                  ? "Restore Link"
                  : "Archive Link"
              }
              className="
              h-12
              w-12

              rounded-xl

              border
              border-white/10

              flex
              items-center
              justify-center

              text-xl

              hover:border-orange-400
              hover:bg-orange-500/10

              transition
              "
            >
              {link.isArchived ? "📂" : "📦"}
            </button>
          )}

          {onEdit && (
            <button
              onClick={() => onEdit(link)}
              className="
              px-5
              py-3

              rounded-xl

              bg-yellow-500
              text-black

              font-medium

              hover:bg-yellow-400

              transition
              "
            >
              ✏️ Edit
            </button>
          )}

          {onDelete && (
            <button
              onClick={() => onDelete(link._id)}
              className="
              px-5
              py-3

              rounded-xl

              bg-red-600
              text-white

              font-medium

              hover:bg-red-500

              transition
              "
            >
              🗑️
            </button>
          )}
        </div>
      </div>
    </div>
  );
}