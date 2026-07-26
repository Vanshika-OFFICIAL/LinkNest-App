"use client";

import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import LoginForm from "@/components/auth/LoginForm";

export default function LoginPage() {
  return (
    <AuthLayout
      title="Welcome Back 👋"
      subtitle="Login to LinkNest"
    >
      <LoginForm />

      {/* Forgot Password */}
      <div className="mt-3 text-center">
        <Link
          href="/forgot-password"
          className="
            text-sm
            text-violet-400
            transition-colors
            hover:text-violet-300
          "
        >
          Forgot Password?
        </Link>
      </div>

      {/* Divider */}
      <div className="my-4 border-t border-white/10" />

      {/* Register */}
      <p
        className="
          text-center
          text-sm
          text-gray-400
          leading-6
        "
      >
        New here?{" "}
        <Link
          href="/register"
          className="
            font-medium
            text-violet-400
            hover:text-violet-300
          "
        >
          Create your free account →
        </Link>
      </p>
    </AuthLayout>
  );
}