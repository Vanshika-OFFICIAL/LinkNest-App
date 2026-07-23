"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser({
        email: formData.email,
        password: formData.password,
      });

      if (!res?.data?.token) {
        throw new Error("Token not received");
      }

      // Save token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Save user
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      console.log(
        "TOKEN SAVED:",
        localStorage.getItem("token")
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      console.error("LOGIN ERROR:", error);

      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Login failed"
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
          Email
        </label>

        <input
          type="email"
          name="email"
          required
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter your email"
          className="
            w-full
            p-4
            rounded-2xl
            bg-white/[0.03]
            border
            border-white/10
            outline-none
            focus:border-violet-500
            transition
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
          required
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter your password"
          className="
            w-full
            p-4
            rounded-2xl
            bg-white/[0.03]
            border
            border-white/10
            outline-none
            focus:border-violet-500
            transition
          "
        />
      </div>

      <button
        type="submit"
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
          transition-all
          disabled:opacity-50
          disabled:cursor-not-allowed
        "
      >
        {loading
          ? "Signing In..."
          : "Login"}
      </button>
    </form>
  );
}