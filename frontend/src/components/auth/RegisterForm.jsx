"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { registerUser } from "@/services/authService";

export default function RegisterForm() {
  const router = useRouter();

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      password: "",
    });

  const [loading, setLoading] =
    useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = async (
    e
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await registerUser(
        formData
      );

      router.push("/login");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5"
    >
      <div>
        <label className="block mb-2 text-sm text-gray-400">
          Name
        </label>

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="
          w-full
          p-4

          rounded-2xl

          bg-white/[0.03]
          border
          border-white/10

          outline-none

          focus:border-violet-500
        "
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-400">
          Email
        </label>

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="
          w-full
          p-4

          rounded-2xl

          bg-white/[0.03]
          border
          border-white/10

          outline-none

          focus:border-violet-500
        "
        />
      </div>

      <div>
        <label className="block mb-2 text-sm text-gray-400">
          Password
        </label>

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          className="
          w-full
          p-4

          rounded-2xl

          bg-white/[0.03]
          border
          border-white/10

          outline-none

          focus:border-violet-500
        "
        />
      </div>

      <button
        disabled={loading}
        className="
        w-full

        py-4

        rounded-2xl

        bg-gradient-to-r
        from-violet-500
        to-purple-500

        font-semibold

        hover:scale-[1.01]
        transition
      "
      >
        {loading
          ? "Creating Account..."
          : "Register"}
      </button>
    </form>
  );
}