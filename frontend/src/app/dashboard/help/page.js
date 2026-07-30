"use client";

import { useRouter } from "next/navigation";
import { Archive, FolderPlus, Heart, HelpCircle, Link2, RotateCcw, Search } from "lucide-react";
import HelpCard from "@/components/onboarding/HelpCard";
import ActionCard from "@/components/onboarding/ActionCard";

const faqs = [
  ["What is LinkNest?", "LinkNest is your private place to save, organize, and quickly rediscover useful online resources."],
  ["What are Collections?", "Collections work like folders. Create one for a topic, then save related links inside it."],
  ["How do I save Links?", "Choose Add Link, enter a title and URL, then choose the collection where it belongs."],
  ["Favorites", "Use the heart on a resource to keep important links available in the Favorites view."],
  ["Archive", "Archive links you do not need right now. You can restore them later from Archived."],
  ["Search", "Use the navbar search to find saved links quickly by title, URL, description, or collection."],
];

export default function HelpPage() {
  const router = useRouter();

  return (
    <div className="mx-auto max-w-6xl space-y-6">
      <section className="rounded-3xl border border-white/10 bg-gradient-to-r from-white/[0.04] via-violet-500/[0.05] to-white/[0.02] p-5 md:p-7">
        <div className="flex items-center gap-3"><span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/15 text-violet-300"><HelpCircle size={25} /></span><div><p className="text-sm uppercase tracking-[0.18em] text-violet-400">Help Center</p><h1 className="mt-1 text-3xl font-bold">How can we help?</h1></div></div>
        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-400">Everything you need to organize resources, build collections, and make LinkNest work for you.</p>
      </section>

      <div className="grid gap-4 md:grid-cols-3">
        <ActionCard icon={FolderPlus} title="Create a collection" description="Start with a topic or project and use it as a folder for related resources." action={<button type="button" onClick={() => router.push("/dashboard/collections")} className="text-sm font-semibold text-violet-300 hover:text-violet-200">Open collections →</button>} />
        <ActionCard icon={Link2} title="Save a link" description="Add documentation, videos, articles, repositories, and any useful online resource." action={<button type="button" onClick={() => router.push("/dashboard/add-link")} className="text-sm font-semibold text-violet-300 hover:text-violet-200">Add a link →</button>} />
        <ActionCard icon={Search} title="Find it later" description="Use the navbar search and Favorites to reach the resources you need faster." />
      </div>

      <section>
        <h2 className="text-xl font-bold">FAQ</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {faqs.map(([title, answer]) => <HelpCard key={title} title={title}>{answer}</HelpCard>)}
        </div>
      </section>

      <section className="rounded-3xl border border-violet-500/20 bg-violet-500/[0.05] p-6 md:flex md:items-center md:justify-between">
        <div><h2 className="text-lg font-semibold">Restart Getting Started</h2><p className="mt-2 text-sm text-slate-400">See the onboarding guide again whenever you need a refresher.</p></div>
        <button type="button" onClick={() => router.push("/dashboard?onboarding=restart")} className="mt-4 inline-flex items-center gap-2 rounded-xl border border-violet-400/30 bg-violet-500/15 px-4 py-3 text-sm font-semibold text-violet-200 transition hover:bg-violet-500/25 md:mt-0"><RotateCcw size={17} /> Restart Getting Started</button>
      </section>
    </div>
  );
}
