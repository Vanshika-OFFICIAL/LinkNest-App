"use client";

import { FolderPlus, Link2, Sparkles } from "lucide-react";
import DialogShell from "./DialogShell";

export default function WelcomeModal({ open, onStart, onSkip }) {
  return (
    <DialogShell open={open} onClose={onSkip} titleId="welcome-linknest-title" closeLabel="Skip onboarding">
      <div className="text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300"><Sparkles size={27} /></div>
        <h2 id="welcome-linknest-title" className="mt-5 text-2xl font-bold">🎉 Welcome to LinkNest</h2>
        <p className="mt-2 text-sm leading-6 text-slate-400">Organize your knowledge in two simple steps.</p>
      </div>

      <div className="mt-7 space-y-3">
        <OnboardingStep icon={FolderPlus} title="Create Collections" description="Collections work like folders." />
        <OnboardingStep icon={Link2} title="Save Links" description="Store documentation, YouTube videos, articles, GitHub repositories, notes and resources." />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row-reverse">
        <button type="button" onClick={onStart} className="inline-flex flex-1 items-center justify-center rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-4 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(124,58,237,0.28)] transition hover:brightness-110">Start Getting Started</button>
        <button type="button" onClick={onSkip} className="inline-flex flex-1 items-center justify-center rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.05]">Skip</button>
      </div>
    </DialogShell>
  );
}

function OnboardingStep({ icon: Icon, title, description }) {
  return <div className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 text-left"><div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-500/15 text-violet-300"><Icon size={20} /></div><div><h3 className="text-sm font-semibold">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-400">{description}</p></div></div>;
}
