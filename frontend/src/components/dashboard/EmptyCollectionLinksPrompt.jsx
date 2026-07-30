"use client";

import { BookOpen, Code2, FolderOpen, Github, Lightbulb, Link2, Plus, Youtube } from "lucide-react";

const resourceTypes = [
  { label: "Documentation", icon: BookOpen, color: "text-violet-300" },
  { label: "Articles", icon: Code2, color: "text-emerald-300" },
  { label: "Videos", icon: Youtube, color: "text-red-300" },
  { label: "GitHub Repos", icon: Github, color: "text-slate-200" },
  { label: "And more", icon: Link2, color: "text-violet-300" },
];

export default function EmptyCollectionLinksPrompt({ onAddLink }) {
  return (
    <section className="rounded-3xl border border-violet-500/30 bg-gradient-to-b from-violet-500/[0.045] to-white/[0.015] px-5 py-12 text-center shadow-[0_0_38px_rgba(124,58,237,0.09)] md:px-10 md:py-16">
      <div className="relative mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-violet-500/25 bg-violet-500/[0.07]">
        <FolderOpen size={55} className="text-violet-400" fill="currentColor" fillOpacity={0.18} />
        <span className="absolute -bottom-1 -right-1 flex h-12 w-12 items-center justify-center rounded-full bg-[#25213f] text-violet-200"><Link2 size={24} /></span>
      </div>

      <h2 className="mt-7 text-2xl font-bold md:text-3xl">No links yet in this collection</h2>
      <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400 md:text-base">This collection is empty. Start adding links, articles, videos or docs to keep everything organized.</p>

      <div className="mx-auto mt-7 flex max-w-2xl flex-wrap justify-center gap-2.5">
        {resourceTypes.map(({ label, icon: Icon, color }) => (
          <span key={label} className="inline-flex items-center gap-2 rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-2 text-xs text-slate-300"><Icon size={15} className={color} /> {label}</span>
        ))}
      </div>

      <button type="button" onClick={onAddLink} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-linear-to-r from-violet-500 to-purple-600 px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_rgba(124,58,237,0.32)] transition hover:brightness-110"><Plus size={18} /> Add Your First Link</button>
      <p className="mt-7 inline-flex items-center gap-2 text-xs text-slate-500"><Lightbulb size={16} className="text-violet-400" /> Tip: You can add any useful resource and access it anytime.</p>
    </section>
  );
}
