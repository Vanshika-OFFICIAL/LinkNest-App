"use client";

import { useEffect, useState } from "react";

import {
  getCurrentUser as getMe,
  updateProfile,
} from "@/services/authService";

export default function SettingsPage() {
  const [user, setUser] =
    useState(null);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const res = await getMe();

      setUser(res.data.user);

      setName(res.data.user.name);
      setEmail(res.data.user.email);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave =
    async () => {
      try {
        setSaving(true);

        const res =
          await updateProfile({
            name,
            email,
          });

        setUser(res.data.user);

        alert(
          "Profile updated successfully"
        );
      } catch (error) {
        console.error(error);
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="p-10">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Hero */}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10">
        <p className="uppercase tracking-widest text-violet-400 text-sm">
          Account Settings
        </p>

        <h1 className="text-5xl font-bold mt-3">
          Settings ⚙️
        </h1>

        <p className="text-gray-400 mt-3">
          Manage your account and
          preferences.
        </p>
      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6">
        <div className="rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Account Status
          </p>

          <h2 className="text-3xl font-bold text-green-400 mt-2">
            Active
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Collections
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              user?.collectionsCount
            }
          </h2>
        </div>

        <div className="rounded-2xl border border-white/10 p-6">
          <p className="text-gray-400">
            Favorites
          </p>

          <h2 className="text-3xl font-bold mt-2">
            {
              user?.favoritesCount
            }
          </h2>
        </div>
      </div>

      {/* Form */}

      <div className="rounded-3xl border border-white/10 p-8">
        <h2 className="text-2xl font-bold mb-6">
          Profile Information
        </h2>

        <div className="space-y-5">
          <div>
            <label>
              Full Name
            </label>

            <input
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
              className="w-full mt-2 border border-white/10 rounded-xl p-3 bg-black/20"
            />
          </div>

          <div>
            <label>Email</label>

            <input
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full mt-2 border border-white/10 rounded-xl p-3 bg-black/20"
            />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="
              px-6
              py-3
              rounded-xl
              bg-gradient-to-r
              from-violet-600
              to-purple-500
            "
          >
            {saving
              ? "Saving..."
              : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}