"use client";

import Link from "next/link";

import AuthLayout from "@/components/auth/AuthLayout";
import RegisterForm from "@/components/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <AuthLayout
      title="Create Account ✨"
      subtitle="Join LinkNest today"
    >
      <RegisterForm />

      <div className="my-5 border-t border-white/10" />

      <p
        className="
          text-center
          text-sm
          text-gray-400
          leading-6
        "
      >
        Already have an account?{" "}
        <Link
          href="/login"
          className="
            font-medium
            text-violet-400
            transition-colors
            hover:text-violet-300
          "
        >
          Login →
        </Link>
      </p>
    </AuthLayout>
  );
}