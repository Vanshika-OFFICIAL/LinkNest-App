"use client";

import { useEffect, useState } from "react";

import {
getCurrentUser,
updateProfile,
} from "@/services/authService";

import {
getDashboardStats,
} from "@/services/dashboardService";

export default function ProfilePage() {
const [user, setUser] = useState(null);

const [stats, setStats] = useState({
collections: 0,
favoriteLinks: 0,
archivedLinks: 0,
totalLinks: 0,
});

const [loading, setLoading] = useState(true);

const [showMenu, setShowMenu] =
useState(false);

const [showEditModal, setShowEditModal] =
useState(false);

const [saving, setSaving] =
useState(false);

const [name, setName] =
useState("");

const [email, setEmail] =
useState("");

useEffect(() => {
fetchProfile();
}, []);

const fetchProfile = async () => {
try {
const [userRes, statsRes] =
await Promise.all([
getCurrentUser(),
getDashboardStats(),
]);

  const currentUser =
    userRes.data.user;

  setUser(currentUser);

  setName(currentUser.name);
  setEmail(currentUser.email);

  setStats(
    statsRes.data.stats || {}
  );
} catch (error) {
  console.error(error);
} finally {
  setLoading(false);
}

};

const handleSave = async () => {
try {
setSaving(true);

  const res =
    await updateProfile({
      name,
      email,
    });

  setUser(res.data.user);

  setShowEditModal(false);
} catch (error) {
  console.error(error);
} finally {
  setSaving(false);
}

};

if (loading) {
return (
<div className="flex justify-center items-center min-h-[70vh]">
Loading Profile...
</div>
);
}

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

    p-5 md:p-8
    "
  >
    <p className="uppercase tracking-widest text-violet-400 text-sm">
      User Profile
    </p>

    <h1 className="text-3xl md:text-5xl font-bold mt-3">
      Profile 👤
    </h1>

    <p className="text-gray-400 mt-3">
      View and manage your
      LinkNest profile.
    </p>
  </div>

  {/* PROFILE CARD */}

  <div
    className="
    relative

    rounded-3xl
    border
    border-white/10

    bg-white/[0.03]

    p-5 md:p-8
    "
  >
    <div className="flex justify-between items-start">
      <div>
        
        <h2 className="text-2xl font-bold mt-4">
          {user?.name}
        </h2>

        <p className="text-gray-400 mt-1">
          {user?.email}
        </p>
      </div>

      <button
        onClick={() =>
          setShowMenu(
            !showMenu
          )
        }
        className="
        h-10
        w-10

        rounded-xl

        border
        border-white/10

        hover:bg-white/5
        "
      >
        ⋮
      </button>
    </div>

    {showMenu && (
      <div
        className="
        absolute
        right-5
        top-20

        w-48

        rounded-2xl

        border
        border-white/10

        bg-[#0b1020]

        overflow-hidden

        z-50
        "
      >
        <button
          onClick={() => {
            setShowEditModal(
              true
            );

            setShowMenu(
              false
            );
          }}
          className="
          w-full
          text-left

          px-4
          py-3

          hover:bg-white/5
          "
        >
          ✏ Edit Profile
        </button>
      </div>
    )}

    <div
      className="
      mt-6

      rounded-xl

      border
      border-white/10

      bg-black/20

      p-4
      "
    >
      <p className="text-xs text-gray-500">
        MEMBER SINCE
      </p>

      <p className="mt-1 text-gray-300">
        {new Date(
          user?.createdAt
        ).toLocaleDateString()}
      </p>
    </div>
  </div>

  {/* EDIT MODAL */}

  {showEditModal && (
    <div
      className="
      fixed
      inset-0

      bg-black/70

      flex
      items-center
      justify-center

      z-[100]
      "
    >
      <div
        className="
        w-[90%]
        max-w-lg

        rounded-3xl

        bg-[#0b1020]

        border
        border-white/10

        p-6
        "
      >
        <h3 className="text-2xl font-bold mb-6">
          Edit Profile
        </h3>

        <div className="space-y-4">
          <input
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="
            w-full

            rounded-xl

            border
            border-white/10

            bg-black/20

            p-3
            "
          />

          <input
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
            w-full

            rounded-xl

            border
            border-white/10

            bg-black/20

            p-3
            "
          />
        </div>

        <div className="flex gap-3 mt-6">
          <button
            onClick={() =>
              setShowEditModal(
                false
              )
            }
            className="
            flex-1

            py-3

            rounded-xl

            border
            border-white/10
            "
          >
            Cancel
          </button>

          <button
            onClick={
              handleSave
            }
            disabled={saving}
            className="
            flex-1

            py-3

            rounded-xl

            bg-gradient-to-r
            from-violet-600
            to-purple-500
            "
          >
            {saving
              ? "Saving..."
              : "Save"}
          </button>
        </div>
      </div>
    </div>
  )}
</div>

);
}