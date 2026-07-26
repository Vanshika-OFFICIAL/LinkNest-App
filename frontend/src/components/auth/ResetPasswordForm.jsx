"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import { resetPassword } from "@/services/authService";

export default function ResetPasswordForm({
  token,
}) {
  const router = useRouter();

  const [loading, setLoading] =
    useState(false);

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [formData, setFormData] =
    useState({
      password: "",
      confirmPassword: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.password !==
      formData.confirmPassword
    ) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res =
        await resetPassword(token, {
          password: formData.password,
        });

      alert(
        res.data.message ||
          "Password reset successfully."
      );

      router.push("/login");
    } catch (error) {
      alert(
        error?.response?.data?.message ||
          error.message
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
      {/* Password */}

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          New Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            name="password"
            required
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter new password"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              py-3.5
              pl-12
              pr-12
              outline-none
              transition
              focus:border-violet-500
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-400"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      {/* Confirm Password */}

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Confirm Password
        </label>

        <div className="relative">
          <Lock
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            name="confirmPassword"
            required
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              py-3.5
              pl-12
              pr-12
              outline-none
              transition
              focus:border-violet-500
            "
          />

          <button
            type="button"
            onClick={() =>
              setShowConfirmPassword(
                !showConfirmPassword
              )
            }
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-violet-400"
          >
            {showConfirmPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Use at least 8 characters for a
        stronger password.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-2xl
          bg-gradient-to-r
          from-violet-500
          to-purple-500
          py-3.5
          font-semibold
          transition-all
          duration-300
          hover:scale-[1.02]
          active:scale-[0.98]
          disabled:cursor-not-allowed
          disabled:opacity-50
        "
      >
        {loading ? (
          <>
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            Resetting...
          </>
        ) : (
          "Reset Password"
        )}
      </button>
    </form>
  );
}