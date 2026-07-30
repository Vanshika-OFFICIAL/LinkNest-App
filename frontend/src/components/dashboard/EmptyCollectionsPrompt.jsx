"use client";

import Link from "next/link";
import { FolderPlus, Lightbulb, Rocket, Search } from "lucide-react";
import EmptyState from "@/components/onboarding/EmptyState";

export default function EmptyCollectionsPrompt() {
  return (
    <EmptyState
      icon={FolderPlus}
      title="No Collections Yet"
      description="Collections help you organize your links into folders like React, DSA, AI, or Interview Prep."
    >

      <div className="mx-auto mt-7 flex max-w-lg flex-wrap justify-center gap-x-6 gap-y-3 text-sm text-slate-400">
        <span className="inline-flex items-center gap-2"><FolderPlus size={17} className="text-violet-400" /> Organize better</span>
        <span className="inline-flex items-center gap-2"><Search size={17} className="text-violet-400" /> Find faster</span>
        <span className="inline-flex items-center gap-2"><Rocket size={17} className="text-violet-400" /> Stay productive</span>
      </div>

      <p className="mt-8 text-sm text-slate-300">Create your first collection to start saving links.</p>

      <div className="mt-5 flex flex-col items-center">
        <Link
          href="/dashboard/collections"
          className="inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.3)] transition hover:brightness-110"
        >
          <FolderPlus size={18} />
          Create Your First Collection
        </Link>
        <p className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-500">
          <Lightbulb size={16} /> Tip: Think of collections as folders for your learning journey.
        </p>
      </div>
    </EmptyState>
  );
}
