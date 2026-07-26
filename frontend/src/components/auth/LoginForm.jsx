"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LoaderCircle,
} from "lucide-react";

import { loginUser } from "@/services/authService";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]:
        e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await loginUser(
        formData
      );

      if (!res?.data?.token) {
        throw new Error(
          "Token not received"
        );
      }

      localStorage.setItem(
        "token",
        res.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(
          res.data.user
        )
      );

      router.push("/dashboard");
      router.refresh();
    } catch (error) {
      alert(
        error?.response?.data
          ?.message ||
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
      {/* Email */}

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Email
        </label>

        <div className="relative">
          <Mail
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
          />

          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className="
              w-full
              rounded-2xl
              border
              border-white/10
              bg-white/[0.03]
              py-3.5
              pl-12
              pr-4
              outline-none
              transition
              focus:border-violet-500
            "
          />
        </div>
      </div>

      {/* Password */}

      <div>
        <label className="mb-2 block text-sm text-gray-400">
          Password
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
            value={
              formData.password
            }
            onChange={handleChange}
            placeholder="Enter your password"
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
              setShowPassword(
                !showPassword
              )
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
            Signing In...
          </>
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
}