"use client";

import { useState } from "react";
import { forgotPassword } from "@/services/authService";

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await forgotPassword({
        email,
      });

      alert(
        res.data.message ||
          "Password reset link sent successfully."
      );

      setEmail("");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error?.message ||
          "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <div>
        <label className="block mb-2 text-sm text-gray-400">
          Email Address
        </label>

        <input
          type="email"
          required
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          placeholder="Enter your registered email"
          className="
            w-full
            rounded-2xl
            border
            border-white/10
            bg-white/[0.03]
            p-4
            outline-none
            transition
            focus:border-violet-500
          "
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="
          w-full
          rounded-2xl
          bg-gradient-to-r
          from-violet-500
          to-purple-500
          py-4
          font-semibold
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading
          ? "Sending Link..."
          : "Send Reset Link"}
      </button>
    </form>
  );
}