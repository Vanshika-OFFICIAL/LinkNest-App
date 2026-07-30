"use client";

import { Archive, Edit3, Heart, RotateCcw, Trash2 } from "lucide-react";

export default function LinkCard({
  link,
  showCollection = true,
  onFavorite,
  onArchive,
  onDelete,
  onEdit,
}) {
  const hasActions = onFavorite || onArchive || onEdit || onDelete;

  return (
    <div className="rounded-3xl border border-white/10 bg-gradient-to-br from-white/[0.03] via-violet-500/[0.02] to-white/[0.02] p-5 backdrop-blur-xl transition-all duration-300 hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)] md:p-6">
      <div className="min-w-0">
        <h3 className="text-lg font-bold md:text-xl">{link.title}</h3>

        <a
          href={link.url}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block break-all text-violet-400 hover:text-violet-300"
        >
          {link.url}
        </a>

        {link.description && (
          <p className="mt-3 text-gray-400">{link.description}</p>
        )}

        {link.tags?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {link.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-col justify-between gap-4 border-t border-white/10 pt-4 md:flex-row">
        <div>
          {showCollection && (
            <div className="inline-flex items-center gap-2 rounded-full border border-violet-500/20 bg-violet-500/10 px-3 py-1 text-xs text-violet-300">
              {link.collectionId?.name || "No Collection"}
            </div>
          )}

          <p className="mt-3 text-xs text-gray-500">
            {new Date(link.createdAt).toLocaleDateString()}
          </p>
        </div>

        {hasActions && (
          <div className="flex flex-wrap items-center gap-2">
            {onFavorite && (
              <ActionButton
                label={link.isFavorite ? "Remove from favorites" : "Add to favorites"}
                onClick={() => onFavorite(link._id)}
                className="hover:border-yellow-500/40 hover:bg-yellow-500/10"
              >
                <Heart
                  size={18}
                  className={link.isFavorite ? "fill-yellow-400 text-yellow-400" : ""}
                />
              </ActionButton>
            )}

            {onArchive && (
              <ActionButton
                label={link.isArchived ? "Restore link" : "Archive link"}
                onClick={() => onArchive(link._id)}
                className="hover:border-orange-500/40 hover:bg-orange-500/10"
              >
                {link.isArchived ? <RotateCcw size={18} /> : <Archive size={18} />}
              </ActionButton>
            )}

            {onEdit && (
              <ActionButton
                label="Edit link"
                onClick={() => onEdit(link)}
                className="hover:border-yellow-500/40 hover:bg-yellow-500/10 hover:text-yellow-300"
              >
                <Edit3 size={18} />
              </ActionButton>
            )}

            {onDelete && (
              <ActionButton
                label="Delete link"
                onClick={() => onDelete(link._id)}
                className="hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-300"
              >
                <Trash2 size={18} />
              </ActionButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function ActionButton({ label, onClick, className, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-gray-200 transition ${className}`}
    >
      {children}
    </button>
  );
}
