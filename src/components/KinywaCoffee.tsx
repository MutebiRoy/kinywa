'use client';
import React from "react";
import { motion } from "framer-motion";
import { Coffee, Leaf, Mail, MapPin, Menu, Star, CheckCircle, AlertCircle } from "lucide-react";
import { 
  FaInstagram, 
  FaTiktok, 
  FaYoutube, 
  FaFacebook,
  FaLinkedin,
  FaWhatsapp,
} from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";

// Kinywa Coffee — Mobile‑first landing page (informational version)
// TailwindCSS utility classes used throughout.

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Roasts", href: "#roasts" },
  { label: "Our Story", href: "#story" },
  { label: "Sustainability", href: "#sustainability" },
  { label: "Visit", href: "#visit" },
];

const roasts = [
  {
    name: "Kiambu Dawn",
    notes: "Brown sugar • Citrus • Silky",
    image:
      "https://images.unsplash.com/photo-1455470956270-4cbb357f7052?q=80&w=1200&auto=format&fit=crop",
    tag: "Light Roast",
  },
  {
    name: "Rwenzori Ridge",
    notes: "Dark chocolate • Plum • Bold",
    image:
      "https://images.unsplash.com/photo-1509785307050-d4066910ec1e?q=80&w=1200&auto=format&fit=crop",
    tag: "Medium Roast",
  },
  {
    name: "Kinywa House Blend",
    notes: "Caramel • Hazelnut • Balanced",
    image:
      "https://images.unsplash.com/photo-1461988091159-192b6df7054f?q=80&w=1200&auto=format&fit=crop",
    tag: "Signature",
  },
];

const Testimonial = ({ name, quote }: { name: string; quote: string }) => (
  <div className="rounded-2xl p-4 bg-amber-50/70 border border-amber-100 shadow-sm">
    <div className="flex items-center gap-1 mb-2">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="w-4 h-4" />
      ))}
    </div>
    <p className="text-[15px] leading-6 text-stone-700">“{quote}”</p>
    <p className="mt-3 text-xs font-semibold tracking-wide text-stone-600">— {name}</p>
  </div>
);

export default function KinywaCoffee() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [banner, setBanner] = React.useState(null as null | { type: "success" | "error"; text: string });
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    setBanner(null);
    const trimmed = email.trim();
    const isValid = trimmed.includes("@") && trimmed.includes(".");
    if (!isValid) {
      setBanner({ type: "error", text: "Please enter a valid email address." });
      return;
    }
    try {
      setLoading(true);
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed })
      });
      if (!res.ok) throw new Error("Subscribe failed");
      setEmail("");
      setBanner({ type: "success", text: "Thanks! Please check your inbox for a confirmation." });
    } catch (err) {
      setBanner({ type: "error", text: "Something went wrong. Please try again in a moment." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-stone-50 to-stone-100 text-stone-900"
      id="home"
    >
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/90 border-b border-stone-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="h-14 flex items-center justify-between">
            <a href="#home" className="inline-flex items-center gap-2">
              <Coffee className="w-6 h-6" />
              <span className="font-extrabold tracking-tight text-lg">Kinywa Coffee</span>
            </a>
            <nav className="hidden sm:flex items-center gap-6">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-[15px] text-stone-700 hover:text-stone-950"
                >
                  {n.label}
                </a>
              ))}
            </nav>
            <button
              className="sm:hidden inline-flex items-center justify-center w-9 h-9 rounded-lg border border-stone-300"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle navigation"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
        {open && (
          <div className="sm:hidden border-t border-stone-200 bg-white">
            <div className="px-4 py-3 flex flex-col gap-3">
              {navItems.map((n) => (
                <a
                  key={n.href}
                  href={n.href}
                  className="text-[15px]"
                >
                  {n.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1600&auto=format&fit=crop"
            alt="Pour over coffee"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-amber-100/40 via-transparent to-stone-100/90" />
        </div>
        <div className="max-w-6xl mx-auto px-4 pt-10 pb-12 sm:pt-12 sm:pb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="max-w-xl"
            >
                <span className="inline-flex items-center gap-2 rounded-full bg-amber-100 text-amber-900 px-3 py-1 text-xs font-semibold">
                Hand‑Roasted in Small Batches
                </span>
                <h1 className="mt-4 text-4xl sm:text-5xl font-black tracking-tight leading-[1.1] relative">
                <span className="absolute -inset-x-6 -inset-y-2 -z-10">
                    <img
                    src="https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop"
                    alt="Coffee cherries background"
                    className="w-full h-full object-cover opacity-25 blur-[1px] rounded-xl"
                    />
                </span>
                Bright mornings start with Kinywa.
                </h1>
                <p className="mt-4 text-stone-700 text-base">
                Ethically sourced Ugandan coffees, roasted to highlight origin character. Freshly
                prepared and served in our cafés.
                </p>
            </motion.div>

            <motion.figure
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-6 -mx-4 overflow-hidden bg-white/60 shadow-lg sm:mx-0 sm:rounded-3xl sm:border sm:border-stone-200/80"
            >
              <img
                src="/coffee-pour.gif"
                alt="Coffee being served"
                className="h-[260px] w-full object-cover sm:h-[320px] lg:h-[360px]"
                loading="lazy"
              />
              <figcaption className="px-4 py-3 text-xs text-stone-600 text-center sm:text-left">
                A smooth pour to start the day — captured at our café.
              </figcaption>
            </motion.figure>

            {/* Hero media: looping coffee pour (uses local assets in /public) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 flex flex-col sm:flex-row gap-3"
          >
            <a
              href="#roasts"
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-900 shadow-sm transition hover:bg-amber-300"
            >
              Explore our roasts
            </a>
            <a
              href="#story"
              className="inline-flex items-center justify-center rounded-xl border border-stone-300 px-5 py-3 text-sm font-semibold text-stone-900/90 transition hover:border-stone-400 hover:text-stone-950"
            >
              Learn our story
            </a>
          </motion.div>
        </div>
      </section>

      {/* Roasts */}
      <section id="roasts" className="max-w-6xl mx-auto px-4 pt-8 pb-12 sm:pt-10 sm:pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Signature Roasts</h2>
        <p className="text-stone-600 mt-1 text-sm">Crafted for perfect flavor balance.</p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-6">
          {roasts.map((r) => (
            <motion.article
              key={r.name}
              className="rounded-2xl overflow-hidden bg-white border border-stone-200 shadow-sm hover:shadow-md"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative">
                <img src={r.image} alt={r.name} className="w-full h-52 object-cover" />
                <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wider bg-white/90 backdrop-blur px-2 py-1 rounded-full border border-stone-200">
                  {r.tag}
                </span>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">{r.name}</h3>
                <p className="text-sm text-stone-600 mt-1">{r.notes}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* Story */}
      <section id="story" className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Our story</h2>
            <p className="mt-3 text-stone-700 text-sm leading-7">
              Kinywa means “mouth” — a celebration of conversation, community, and craft. We source from our own coffee farms 
              and also partner with smallholder farmers across Uganda, paying premiums for quality and investing in local water
              and soil programs. Each roast is profiled to honor origin and your preferred brew method.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1400&auto=format&fit=crop"
              alt="Pour over"
              className="h-40 sm:h-56 w-full object-cover rounded-2xl border"
            />
            <img
              src="https://images.unsplash.com/photo-1498804103079-a6351b050096?q=80&w=1400&auto=format&fit=crop"
              alt="Green coffee"
              className="h-40 sm:h-56 w-full object-cover rounded-2xl border"
            />
          </div>
        </div>
      </section>

      {/* Sustainability */}
      <section id="sustainability" className="bg-white border-y border-stone-200 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="rounded-2xl p-5 border bg-amber-50/50">
              <Leaf className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Regenerative Partners</h3>
              <p className="text-sm text-stone-700 mt-1">
                Long‑term relationships with co‑ops prioritizing soil health and fair compensation.
              </p>
            </div>
            <div className="rounded-2xl p-5 border bg-amber-50/50">
              <Coffee className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Quality at Source</h3>
              <p className="text-sm text-stone-700 mt-1">
                Microlots selected for clarity and sweetness; traceable to farm and elevation.
              </p>
            </div>
            <div className="rounded-2xl p-5 border bg-amber-50/50">
              <MapPin className="w-6 h-6" />
              <h3 className="mt-3 font-bold">Local Craftsmanship</h3>
              <p className="text-sm text-stone-700 mt-1">
                Every cup brewed fresh by trained baristas with passion for detail.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">People are talking</h2>
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Testimonial
            name="Amara N."
            quote="Bright, juicy, and consistent. My V60 has never tasted better."
          />
          <Testimonial
            name="Leo R."
            quote="Love the atmosphere and how every cup tells a story."
          />
          <Testimonial name="Hannah S." quote="Kinywa Coffee has become my morning ritual." />
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-stone-900 text-stone-100 py-12 sm:py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Stay in the loop</h2>
              <p className="mt-2 text-stone-300 text-sm">News, new blends, and events — straight to your inbox.</p>
            </div>
            {isMounted ? (
              <form onSubmit={handleSubscribe} className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="px-4 py-3 rounded-xl text-stone-900 placeholder-stone-400"
                  aria-label="Email address"
                  required
                  autoComplete="email"
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-3 rounded-xl bg-amber-400 text-stone-900 text-sm font-semibold disabled:opacity-60"
                >
                  <span className="inline-flex items-center gap-2">
                    <Mail className="w-4 h-4" /> {loading ? "Subscribing…" : "Subscribe"}
                  </span>
                </button>
              </form>
            ) : (
              <div
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3"
                aria-hidden="true"
                role="presentation"
              >
                <span className="px-4 py-3 rounded-xl bg-stone-200/70" />
                <span className="px-4 py-3 rounded-xl bg-stone-300/70" />
              </div>
            )}
            
            {banner && (
              <div
                role="status"
                className={`mt-3 inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
                  banner.type === "success"
                    ? "bg-green-100 text-green-900 border border-green-200"
                    : "bg-red-100 text-red-900 border border-red-200"
                }`}
              >
                {banner.type === "success" ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  <AlertCircle className="w-4 h-4" />
                )}
                <span>{banner.text}</span>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Visit */}
      <section id="visit" className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
        <div className="rounded-2xl border bg-white p-5 grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="sm:col-span-2">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Visit our café</h2>
            <p className="mt-2 text-sm text-stone-700">123 Makerere Hill, Makerere, Kampala, Uganda</p>
            <a
              href="https://maps.google.com"
              className="inline-block mt-4 px-4 py-3 rounded-xl bg-stone-900 text-white text-sm font-semibold"
            >
              Get Directions
            </a>
          </div>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl border p-3">
              <p className="text-xs text-stone-600">Hours</p>
              <p className="text-sm">Mon–Fri: 8a–5p</p>
              <p className="text-sm">Sat–Sun: 9a–4p</p>
            </div>
            <div className="rounded-xl border p-3">
              <p className="text-xs text-stone-600">Contact</p>
              <a href="mailto:hello@kinywacoffee.com" className="text-sm underline">
                hello@kinywa.com
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-300">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2">
                <Coffee className="w-5 h-5" />
                <span className="font-extrabold">Kinywa Coffee</span>
              </div>
              <p className="mt-3 text-sm text-stone-400">
                Crafted for conversation. From origin to your cup, we keep it honest and delicious.
              </p>
              <div className="mt-4 flex items-center gap-3">
                <a aria-label="Instagram" href="#" className="hover:text-white">
                  <FaInstagram className="w-5 h-5" />
                </a>
                <a aria-label="Twitter" href="#" className="hover:text-white">
                  <FaXTwitter className="w-5 h-5" />
                </a>
                <a aria-label="Facebook" href="#" className="hover:text-white">
                  <FaFacebook className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Explore</p>
              <a href="#roasts" className="text-stone-300 hover:text-white text-sm">
                Our Roasts | 
              </a>
              <a href="#story" className="text-stone-300 hover:text-white text-sm">
                Our Story | 
              </a>
              <a href="#sustainability" className="text-stone-300 hover:text-white text-sm">
                Sustainability
              </a>
            </div>
            <div className="space-y-2">
              <p className="text-sm font-semibold text-white">Visit</p>
              <a href="#visit" className="text-stone-300 hover:text-white text-sm">
                Café Location | 
              </a>
              <a href="mailto:hello@kinywa.com" className="text-stone-300 hover:text-white text-sm">
                Contact Us
              </a>
              <a href="#" className="text-stone-300 hover:text-white text-sm">
                +256 744-560954
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-stone-800 text-xs text-stone-500">
            © {new Date().getFullYear()} Kinywa Coffee. All rights reserved.
          </div>
        </div>
      </footer>

      {/* --- Test cases (manual QA) --- */}
      {/* 1) Build should succeed with no syntax errors (verifies unterminated string fix). */}
      {/* 2) Mobile nav: tapping the Menu icon toggles the drawer; tapping a link DOES NOT auto-close it (per spec). */}
      {/* 3) Hero: headline shows subtle photo plate behind it and image-filled text for “Kinywa”. */}
      {/* 4) Newsletter: invalid email shows inline error; valid email triggers POST /api/newsletter and shows success banner. */}
      {/* 5) Accessibility: input has aria-label; banner uses role=status. */}
      {/* 6) Layout: small screens stack; ≥640px grids become multi-column. */}
      {/* 7) Content: No e-commerce UI present. */}
    </div>
  );
}
