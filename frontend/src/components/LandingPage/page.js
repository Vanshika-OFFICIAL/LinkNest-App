      "use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/logos/logo.png";
import AboutImg from "@/assets/images/about.png";
import HeroRightImg from "@/assets/images/hero-right.png";
export default function LandingPage() {
  const features = [
    { icon: "📁", title: "Smart Collections", desc: "Organize resources into structured collections for better productivity." },
    { icon: "⭐", title: "Favorites", desc: "Quickly access your most important and frequently used resources." },
    { icon: "📦", title: "Archive System", desc: "Store old resources safely without cluttering your active workspace." },
    { icon: "🔍", title: "Powerful Search", desc: "Find links instantly using titles, tags, descriptions, or collections." },
    { icon: "🏷️", title: "Tags & Categories", desc: "Classify resources with tags for faster filtering and organization." },
    { icon: "📊", title: "Analytics Dashboard", desc: "Track collections, favorites, archived links, and overall activity." },
    { icon: "🔐", title: "Secure Access", desc: "JWT-based authentication keeps your resources private and protected." },
    { icon: "📱", title: "Responsive Experience", desc: "Access your knowledge hub seamlessly across desktop, tablet, and mobile." },
  ];
  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
  <div
    className="
    absolute
    top-[-200px]
    right-[-100px]

    h-[600px]
    w-[600px]

    rounded-full

    bg-violet-500/20

    blur-[180px]
  "
  />

  <div
    className="
    absolute
    bottom-[-200px]
    left-[-100px]

    h-[500px]
    w-[500px]

    rounded-full

    bg-fuchsia-500/10

    blur-[180px]
  "
  />
</div>
      {/* NAVBAR */}

      <nav
  className="
    sticky top-0 z-50
    border-b border-white/10
    bg-[#050816]/90 backdrop-blur-xl
    px-6 py-4
    flex items-center justify-between
    hidden md:flex
  "
>
  <div className="flex items-center gap-3">
    <div
      className="
        h-12 w-12
        rounded-2xl
        bg-gradient-to-br from-violet-500
        flex items-center justify-center
        shadow-[0_0_25px_rgba(168,85,247,0.45)]
      "
    >
      <Image
        src={Logo}
        alt="LinkNest Logo"
        className="object-contain"
        width={28}
        height={28}
        priority
      />
    </div>

    <div>
      <h1 className="text-2xl font-bold">LinkNest</h1>
      <p className="text-xs text-violet-400">KNOWLEDGE HUB</p>
    </div>
  </div>

  <div className="flex items-center gap-8 text-gray-300">
    <Link href="/">Home</Link>
    <Link href="#features">Features</Link>
    <Link href="#about">About</Link>
  </div>

  <div className="flex gap-3">
    <Link
      href="/login"
      className="
        px-5 py-2
        rounded-xl
        border border-white/10
        hover:border-violet-500/30
      "
    >
      Login
    </Link>

    <Link
      href="/register"
      className="
        px-5 py-2
        rounded-xl
        bg-gradient-to-r from-violet-500 to-purple-500
        shadow-[0_0_20px_rgba(168,85,247,0.35)]
      "
    >
      Get Started
    </Link>
  </div>
</nav>

      {/* HERO */}

      <section
        className="
        px-6

        py-10

        max-w-7xl
        mx-auto

        grid
        lg:grid-cols-2

        gap-12

        items-center
      "
      >
        {/* LEFT */}

        <div>
          <p
            className="
            uppercase
            tracking-[0.3em]

            text-violet-400

            mb-4
          "
          >
            Personal Knowledge Hub
          </p>

          <h1
            className="
            text-5xl
            md:text-7xl

            font-bold

            leading-tight
          "
          >
            Save.
            <br />
            Organize.
            <br />
            Access Anywhere.
          </h1>

          <p
            className="
            text-gray-400

            text-lg

            mt-4

            max-w-xl
          "
          >
            Store tutorials, docs, courses,
            articles and resources in one
            beautiful place.
          </p>

          <div className="flex gap-4 mt-10">
            <Link
              href="/register"
              className="
              px-8 py-4

              rounded-2xl

              bg-gradient-to-r
              from-violet-500
              to-purple-500

              font-semibold

              shadow-[0_0_25px_rgba(168,85,247,0.35)]
            "
            >
              Get Started
            </Link>

            <Link
              href="/login"
              className="
              px-8 py-4

              rounded-2xl

              border
              border-white/10
            "
            >
              Login
            </Link>
          </div>
        </div>

        {/* RIGHT */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.01 }}
  className="flex items-center justify-center"
>
  <Image
    src={HeroRightImg}
    alt="LinkNest dashboard workspace"
    className="rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.35)]"
    width={600}
    height={400}
    priority
  />
</motion.div>

      </section>

      {/* FEATURES */}

      <section id="features" className="max-w-7xl mx-auto px-6 py-20">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl md:text-5xl font-bold text-center mb-14 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
      >
        Everything You Need
      </motion.h2>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">
        {features.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: i * 0.1 }}
            whileHover={{ y: -8 }}
            className="rounded-3xl bg-white/[0.03] border border-white/10 p-8 shadow-sm hover:shadow-lg transition-all"
          >
            <div className="text-5xl mb-5">{item.icon}</div>
            <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
{/* ABOUT SECTION */}
<section
  id="about"
  className="max-w-7xl mx-auto px-6 py-24"
>
  <div className="grid lg:grid-cols-2 gap-16 items-center">
    
    {/* LEFT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.25}}
    >
      <p className="uppercase tracking-widest text-violet-400 mb-4">
        Why LinkNest
      </p>

      <h2 className="text-5xl font-bold mb-6 bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
        Stop Losing Valuable Resources
      </h2>

      <p className="text-gray-400 text-lg leading-relaxed">
        Browser bookmarks become cluttered and difficult to manage.
        LinkNest helps developers, students, and professionals
        organize resources into collections, mark favorites,
        archive old content, and find anything instantly.
      </p>

      {/* Animated Checklist */}
      <div className="mt-8 space-y-4 text-violet-300">
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          ✅ Organize resources efficiently
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
          ✅ Access important links faster
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.6 }}>
          ✅ Powerful search experience
        </motion.div>
        <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} transition={{ delay: 0.8 }}>
          ✅ Built for productivity
        </motion.div>
      </div>
    </motion.div>

    {/* RIGHT CONTENT - Animated Card */}
     <div className="flex items-center justify-center">
          <Image
            src={AboutImg}
            alt="LinkNest dashboard showing organized workspace"
            className="rounded-3xl shadow-[0_0_40px_rgba(168,85,247,0.35)] hover:scale-105 transition-transform"
            width={600}
            height={400}
            priority
          />
        </div>
  </div>
</section>
    
      {/* CTA */}

      <section
        className="
        py-24

        text-center

        px-6
      "
      >
        <h2 className="text-5xl font-bold">
          Start Building Your
          <br />
          Knowledge Vault
        </h2>

        <p className="text-gray-400 mt-6">
          Save everything that matters.
        </p>

        <Link
          href="/register"
          className="
          inline-block

          mt-10

          px-10 py-4

          rounded-2xl

          bg-gradient-to-r
          from-violet-500
          to-purple-500

          font-semibold
        "
        >
          Create Free Account
        </Link>
      </section>

      {/* FOOTER */}

    <footer
  className="
    border-t border-white/10
    py-10
    text-center
    text-gray-400
    text-sm
  "
>
  <p className="mb-2">
    © 2026 <span className="font-semibold text-white">LinkNest</span>
  </p>
  <p className="mb-1">
    Turn scattered links into your <span className="text-violet-400">personal knowledge vault</span>
  </p>
  <p>
    Built for <span className="text-violet-400">productivity</span>.
  </p>
</footer>

    </div>
  );
}