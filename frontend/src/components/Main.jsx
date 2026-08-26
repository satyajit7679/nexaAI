import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Code2,
  FileText,
  Image as ImageIcon,
  Globe,
  Sparkles,
  Zap,
  ShieldCheck,
  History,
  Search,
  UploadCloud,
  Smartphone,
  Wand2,
  ArrowRight,
  ArrowDown,
  Star,
  X,
  Menu,
  CircleUserRound,
  Bot,
  Send,
  Play,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Shared data                                                               */
/* -------------------------------------------------------------------------- */

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "Documentation", href: "#docs" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

const FEATURES = [
  {
    icon: MessageCircle,
    title: "AI Chat",
    description: "Ask questions and receive intelligent responses instantly.",
  },
  {
    icon: Code2,
    title: "Coding Assistant",
    description:
      "Generate, debug, optimise, and explain code in multiple programming languages.",
  },
  {
    icon: FileText,
    title: "PDF Chat",
    description: "Upload PDF files and ask questions about their contents.",
  },
  {
    icon: ImageIcon,
    title: "Vision AI",
    description: "Upload images for analysis, OCR, and visual understanding.",
  },
  {
    icon: Globe,
    title: "Web Search",
    description:
      "Search the latest information from the internet in real time.",
  },
  {
    icon: Sparkles,
    title: "Content Generation",
    description:
      "Generate blogs, emails, documentation, reports, and creative writing.",
  },
];

const STEPS = [
  {
    number: "01",
    title: "Create Account",
    description: "Create your free account using Google authentication.",
  },
  {
    number: "02",
    title: "Ask Anything",
    description: "Type your question or upload files.",
  },
  {
    number: "03",
    title: "Receive AI Answers",
    description: "Get intelligent responses instantly.",
  },
];

const WHY_CHOOSE = [
  { icon: Zap, label: "Lightning Fast" },
  { icon: Bot, label: "Modern AI Models" },
  { icon: ShieldCheck, label: "Secure Authentication" },
  { icon: History, label: "Conversation History" },
  { icon: Search, label: "Smart Search" },
  { icon: UploadCloud, label: "File Upload Support" },
  { icon: Smartphone, label: "Responsive Design" },
  { icon: Wand2, label: "Beautiful UI" },
];

const TESTIMONIALS = [
  {
    name: "Ariana Cole",
    role: "Software Engineer",
    review:
      "nexaAI has become part of my daily workflow. Debugging sessions that used to take an hour now take minutes.",
    avatar: "AC",
  },
  {
    name: "Marcus Devine",
    role: "Graduate Researcher",
    review:
      "Uploading papers and asking direct questions about them has completely changed how I review literature.",
    avatar: "MD",
  },
  {
    name: "Priya Nair",
    role: "Content Strategist",
    review:
      "From outlines to final drafts, nexaAI keeps my writing consistent and saves me hours every week.",
    avatar: "PN",
  },
];

/* -------------------------------------------------------------------------- */
/*  Motion helpers                                                            */
/* -------------------------------------------------------------------------- */

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
};

const Reveal = ({ children, className = "", custom = 0, as: Tag = "div" }) => (
  <motion.div
    className={className}
    custom={custom}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.2 }}
    variants={fadeUp}
  >
    {children}
  </motion.div>
);

/* -------------------------------------------------------------------------- */
/*  Navbar                                                                    */
/* -------------------------------------------------------------------------- */

function Navbar({ onAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0B0F19]/70 backdrop-blur-xl border-b border-[#1F2937]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-8 h-16">
        {/* Logo */}
        <a href="#top" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)]">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-white font-semibold text-lg tracking-tight">
            nexaAI
          </span>
        </a>

        {/* Center links */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-[#94A3B8] hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <button
            onClick={() => onAuth("login")}
            className="px-4 py-2 text-sm rounded-lg border border-[#1F2937] text-white hover:border-[#7C3AED] hover:bg-white/5 transition-all duration-200"
          >
            Login
          </button>
          <button
            onClick={() => onAuth("getstarted")}
            className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-medium shadow-[0_0_20px_rgba(124,58,237,0.35)] hover:shadow-[0_0_30px_rgba(124,58,237,0.6)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
          >
            Get Started
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden overflow-hidden bg-[#0B0F19]/95 backdrop-blur-xl border-b border-[#1F2937]"
          >
            <div className="flex flex-col px-6 py-4 gap-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[#94A3B8] hover:text-white text-sm transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-2">
                <button
                  onClick={() => onAuth("login")}
                  className="px-4 py-2 text-sm rounded-lg border border-[#1F2937] text-white"
                >
                  Login
                </button>
                <button
                  onClick={() => onAuth("getstarted")}
                  className="px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-medium"
                >
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/*  Hero                                                                      */
/* -------------------------------------------------------------------------- */

function Hero({ onAuth }) {
  return (
    <section
      id="top"
      className="relative overflow-hidden pt-40 pb-24 lg:pt-48 lg:pb-32 px-6 lg:px-8"
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-[-10%] left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-[#7C3AED]/20 blur-[140px]" />

      <div className="relative max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        {/* Left copy */}
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-[#C4B5FD] bg-[#7C3AED]/10 border border-[#7C3AED]/30 px-3 py-1 rounded-full mb-6">
              <Sparkles className="h-3.5 w-3.5" />
              Now powered by next-gen models
            </span>
          </Reveal>

          <Reveal custom={1}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.1]">
              Your Intelligent{" "}
              <span className="bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] bg-clip-text text-transparent">
                AI Assistant
              </span>
            </h1>
          </Reveal>

          <Reveal custom={2}>
            <p className="mt-6 text-base sm:text-lg text-[#94A3B8] max-w-xl leading-relaxed">
              Code smarter, learn faster, analyse documents, search the web,
              generate content, and boost your productivity with one AI
              assistant.
            </p>
          </Reveal>

          <Reveal custom={3}>
            <div className="mt-9 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => onAuth("getstarted")}
                className="group px-6 py-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-medium shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2"
              >
                Get Started
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="px-6 py-3 rounded-lg border border-[#1F2937] text-white font-medium hover:bg-white/5 hover:border-[#374151] transition-all duration-200 flex items-center justify-center gap-2">
                <Play className="h-4 w-4" />
                Watch Demo
              </button>
            </div>
          </Reveal>

          <Reveal custom={4}>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {["Fast", "Secure", "AI Powered", "Free to Start"].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-2 text-sm text-[#94A3B8]"
                >
                  <span className="h-5 w-5 rounded-full bg-[#7C3AED]/15 text-[#8B5CF6] flex items-center justify-center text-xs">
                    ✓
                  </span>
                  {t}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Right: dashboard preview */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative rounded-2xl border border-[#1F2937] bg-[#161B22]/80 backdrop-blur-xl shadow-[0_20px_80px_rgba(0,0,0,0.5)] overflow-hidden"
          >
            <div className="flex h-[420px]">
              {/* Sidebar */}
              <div className="hidden sm:flex w-40 flex-col border-r border-[#1F2937] bg-[#111827]/70 p-3 gap-2">
                <div className="text-[11px] uppercase tracking-wider text-[#64748B] px-2 pt-1 pb-2">
                  Recent Chats
                </div>
                {[
                  "Landing page copy",
                  "Fix React bug",
                  "Summarize PDF",
                  "Trip itinerary",
                ].map((chat, i) => (
                  <div
                    key={chat}
                    className={`text-xs px-2 py-2 rounded-md truncate ${
                      i === 0
                        ? "bg-[#7C3AED]/15 text-white"
                        : "text-[#94A3B8] hover:bg-white/5"
                    }`}
                  >
                    {chat}
                  </div>
                ))}
              </div>

              {/* Chat area */}
              <div className="flex-1 flex flex-col p-4">
                <div className="flex items-center gap-2 pb-3 border-b border-[#1F2937]">
                  <div className="h-6 w-6 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6]" />
                  <span className="text-xs text-white font-medium">nexaAI</span>
                  <span className="ml-auto text-[10px] text-[#64748B]">
                    online
                  </span>
                </div>

                <div className="flex-1 py-4 space-y-3 overflow-hidden">
                  <div className="ml-auto max-w-[75%] bg-[#7C3AED]/20 text-white text-xs px-3 py-2 rounded-xl rounded-tr-sm">
                    Summarize this quarterly report for me
                  </div>
                  <div className="max-w-[85%] bg-[#111827] border border-[#1F2937] text-[#CBD5E1] text-xs px-3 py-2 rounded-xl rounded-tl-sm leading-relaxed">
                    Here's a quick summary: revenue grew 18% QoQ driven by the
                    new enterprise tier, churn dropped to 2.1%, and support
                    tickets fell after the onboarding redesign.
                  </div>
                </div>

                {/* suggestion chips */}
                <div className="flex flex-wrap gap-2 pb-3">
                  {["Explain this code", "Search the web", "Analyse image"].map(
                    (chip) => (
                      <span
                        key={chip}
                        className="text-[10px] px-2.5 py-1 rounded-full border border-[#1F2937] text-[#94A3B8]"
                      >
                        {chip}
                      </span>
                    ),
                  )}
                </div>

                {/* input */}
                <div className="flex items-center gap-2 bg-[#111827] border border-[#1F2937] rounded-lg px-3 py-2">
                  <span className="text-xs text-[#64748B] flex-1">
                    Ask nexaAI anything...
                  </span>
                  <div className="h-7 w-7 rounded-md bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center">
                    <Send className="h-3.5 w-3.5 text-white" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Features                                                                  */
/* -------------------------------------------------------------------------- */

function Features() {
  return (
    <section id="features" className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Everything You Need
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            One assistant, built for every kind of work.
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f, i) => {
            const Icon = f.icon;
            return (
              <Reveal key={f.title} custom={i}>
                <motion.div
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="h-full rounded-xl border border-[#1F2937] bg-[#161B22] p-6 hover:border-[#7C3AED]/50 hover:shadow-[0_0_30px_rgba(124,58,237,0.15)] transition-all duration-300"
                >
                  <div className="h-11 w-11 rounded-lg bg-gradient-to-br from-[#7C3AED]/20 to-[#8B5CF6]/10 border border-[#7C3AED]/30 flex items-center justify-center mb-4">
                    <Icon className="h-5 w-5 text-[#A78BFA]" />
                  </div>
                  <h3 className="text-white font-semibold text-lg mb-2">
                    {f.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {f.description}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  How it works                                                              */
/* -------------------------------------------------------------------------- */

function HowItWorks() {
  return (
    <section className="py-24 px-6 lg:px-8 bg-[#111827]/40 border-y border-[#1F2937]">
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-[#94A3B8]">
            Three steps to your first answer.
          </p>
        </Reveal>

        <div className="flex flex-col lg:flex-row items-stretch gap-6">
          {STEPS.map((step, i) => (
            <div
              key={step.number}
              className="flex-1 flex lg:flex-col items-center"
            >
              <Reveal custom={i} className="flex-1 w-full">
                <div className="h-full rounded-xl border border-[#1F2937] bg-[#161B22] p-6 text-center">
                  <span className="text-sm font-semibold text-[#8B5CF6]">
                    {step.number}
                  </span>
                  <h3 className="text-white font-semibold text-lg mt-2 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </Reveal>
              {i < STEPS.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="hidden lg:flex justify-center py-3 text-[#7C3AED]"
                >
                  <ArrowDown className="h-5 w-5 rotate-[-90deg] lg:rotate-0" />
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Why choose nexaAI                                                        */
/* -------------------------------------------------------------------------- */

function WhyChoose() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Why Choose nexaAI?
          </h2>
        </Reveal>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5">
          {WHY_CHOOSE.map((item, i) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.label} custom={i}>
                <div className="rounded-xl border border-[#1F2937] bg-[#161B22] p-5 text-center hover:border-[#7C3AED]/40 transition-colors duration-300">
                  <Icon className="h-6 w-6 text-[#A78BFA] mx-auto mb-3" />
                  <p className="text-white text-sm font-medium">{item.label}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  About                                                                     */
/* -------------------------------------------------------------------------- */

function About() {
  return (
    <section
      id="about"
      className="py-24 px-6 lg:px-8 bg-[#111827]/40 border-y border-[#1F2937]"
    >
      <Reveal className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-6">
          About nexaAI
        </h2>
        <p className="text-[#94A3B8] leading-relaxed">
          nexaAI is an AI-powered productivity assistant designed for students,
          developers, researchers, content creators, and professionals.
        </p>
        <p className="text-[#94A3B8] leading-relaxed mt-4">
          Whether you're writing code, learning new concepts, summarising
          documents, analysing images, or generating creative content, nexaAI
          helps you accomplish tasks faster and smarter through a modern AI
          experience.
        </p>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Testimonials                                                              */
/* -------------------------------------------------------------------------- */

function Testimonials() {
  return (
    <section className="py-24 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Loved by people who ship
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <Reveal key={t.name} custom={i}>
              <div className="h-full rounded-xl border border-[#1F2937] bg-[#161B22]/70 backdrop-blur-md p-6">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      className="h-4 w-4 fill-[#8B5CF6] text-[#8B5CF6]"
                    />
                  ))}
                </div>
                <p className="text-[#CBD5E1] text-sm leading-relaxed mb-6">
                  "{t.review}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-full bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-semibold">
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">{t.name}</p>
                    <p className="text-[#94A3B8] text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Pricing                                                                   */
/* -------------------------------------------------------------------------- */

function Pricing({ onAuth }) {
  return (
    <section
      id="pricing"
      className="py-24 px-6 lg:px-8 bg-[#111827]/40 border-y border-[#1F2937]"
    >
      <div className="max-w-5xl mx-auto">
        <Reveal className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            Simple, Transparent Pricing
          </h2>
        </Reveal>

        <div className="grid sm:grid-cols-2 gap-6 items-stretch">
          {/* Free */}
          <Reveal>
            <div className="h-full rounded-2xl border border-[#1F2937] bg-[#161B22] p-8 flex flex-col">
              <h3 className="text-white text-xl font-semibold">Free</h3>
              <p className="text-[#94A3B8] text-sm mt-1">
                Get started at no cost
              </p>
              <ul className="mt-6 space-y-3 flex-1">
                {["AI Chat", "Coding", "PDF", "Vision", "Limited Requests"].map(
                  (item) => (
                    <li
                      key={item}
                      className="flex items-center gap-2 text-sm text-[#CBD5E1]"
                    >
                      <span className="text-[#8B5CF6]">✓</span>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              <button
                onClick={() => onAuth("getstarted")}
                className="mt-8 w-full py-3 rounded-lg border border-[#1F2937] text-white font-medium hover:bg-white/5 hover:border-[#374151] transition-all duration-200"
              >
                Start Free
              </button>
            </div>
          </Reveal>

          {/* Pro */}
          <Reveal custom={1}>
            <div className="relative h-full rounded-2xl border-2 border-[#7C3AED] bg-gradient-to-b from-[#7C3AED]/10 to-[#161B22] p-8 flex flex-col shadow-[0_0_40px_rgba(124,58,237,0.25)]">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-medium bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white px-3 py-1 rounded-full">
                Most Popular
              </span>
              <h3 className="text-white text-xl font-semibold">Pro</h3>
              <p className="text-[#94A3B8] text-sm mt-1">For power users</p>
              <ul className="mt-6 space-y-3 flex-1">
                {[
                  "Unlimited AI",
                  "Priority Access",
                  "Advanced Models",
                  "Cloud History",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm text-[#CBD5E1]"
                  >
                    <span className="text-[#8B5CF6]">✓</span>
                    {item}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => onAuth("getstarted")}
                className="mt-8 w-full py-3 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-medium shadow-[0_0_25px_rgba(124,58,237,0.4)] hover:shadow-[0_0_35px_rgba(124,58,237,0.65)] hover:scale-[1.02] transition-all duration-200"
              >
                Upgrade Now
              </button>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Final CTA                                                                 */
/* -------------------------------------------------------------------------- */

function FinalCTA({ onAuth }) {
  return (
    <section className="relative py-28 px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#7C3AED]/20 via-[#0B0F19] to-[#8B5CF6]/10" />
      <Reveal className="relative max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          Ready to Experience the Future of AI?
        </h2>
        <p className="mt-4 text-[#94A3B8]">
          Join thousands of users using nexaAI every day.
        </p>
        <button
          onClick={() => onAuth("login")}
          className="mt-8 px-8 py-4 rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#8B5CF6] text-white font-semibold text-base shadow-[0_0_35px_rgba(124,58,237,0.5)] hover:shadow-[0_0_50px_rgba(124,58,237,0.75)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-200"
        >
          Login with Google
        </button>
      </Reveal>
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*  Footer                                                                    */
/* -------------------------------------------------------------------------- */

function Footer() {
  return (
    <footer className="border-t border-[#1F2937] py-14 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-white font-semibold">nexaAI</span>
          </div>
          <p className="text-[#94A3B8] text-sm">
            Your intelligent AI assistant for work, learning, and creativity.
          </p>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            <li>
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Features
              </a>
            </li>
            <li>
              <a href="#pricing" className="hover:text-white transition-colors">
                Pricing
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-white transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-white transition-colors">
                Contact
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Legal</h4>
          <ul className="space-y-2 text-sm text-[#94A3B8]">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Connect</h4>
          <a
            href="#"
            className="inline-flex items-center gap-2 text-sm text-[#94A3B8] hover:text-white transition-colors"
          >
            <CircleUserRound className="h-4 w-4" /> GitHub
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-10 pt-6 border-t border-[#1F2937] text-center">
        <p className="text-xs text-[#64748B]">
          © 2026 nexaAI. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/*  Login Modal                                                               */
/* -------------------------------------------------------------------------- */

function LoginModal({ open, onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Replace this timeout with your real Google OAuth call.
    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 900);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-sm rounded-2xl border border-[#1F2937] bg-[#161B22] p-8 shadow-[0_20px_80px_rgba(0,0,0,0.6)]"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-[#64748B] hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-[#7C3AED] to-[#8B5CF6] flex items-center justify-center mb-5 shadow-[0_0_25px_rgba(124,58,237,0.5)]">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-white text-xl font-semibold">
                Welcome to nexaAI
              </h3>
              <p className="text-[#94A3B8] text-sm mt-2">
                Sign in to continue to your assistant.
              </p>

              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                className="mt-7 w-full flex items-center justify-center gap-3 py-3 rounded-lg bg-white text-[#111827] font-medium hover:bg-gray-100 active:scale-[0.98] transition-all duration-200 disabled:opacity-70"
              >
                {loading ? (
                  <span className="h-4 w-4 rounded-full border-2 border-[#7C3AED] border-t-transparent animate-spin" />
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M23.49 12.27c0-.79-.07-1.54-.2-2.27H12v4.3h6.47c-.28 1.5-1.13 2.77-2.4 3.62v3h3.88c2.27-2.09 3.54-5.17 3.54-8.65z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 24c3.24 0 5.95-1.07 7.93-2.9l-3.88-3c-1.08.72-2.45 1.15-4.05 1.15-3.11 0-5.75-2.1-6.69-4.93H1.3v3.1C3.26 21.3 7.3 24 12 24z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.31 14.32c-.24-.72-.38-1.49-.38-2.32s.14-1.6.38-2.32v-3.1H1.3A11.96 11.96 0 000 12c0 1.93.46 3.76 1.3 5.42l4.01-3.1z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.44-3.44C17.94 1.19 15.24 0 12 0 7.3 0 3.26 2.7 1.3 6.58l4.01 3.1c.94-2.83 3.58-4.93 6.69-4.93z"
                    />
                  </svg>
                )}
                {loading ? "Signing in..." : "Continue with Google"}
              </button>

              <p className="text-[#64748B] text-xs mt-5 leading-relaxed">
                By continuing, you agree to nexaAI's Terms of Service and
                Privacy Policy. We never share your data.
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* -------------------------------------------------------------------------- */
/*  Landing Page (default export)                                            */
/* -------------------------------------------------------------------------- */

export default function LandingPage() {
  const [authOpen, setAuthOpen] = useState(false);
  const navigate = useNavigate();

  const handleAuth = () => setAuthOpen(true);

  const handleAuthSuccess = () => {
    setAuthOpen(false);
    navigate("/chat");
  };

  return (
    <div className="min-h-screen bg-[#0B0F19] font-sans antialiased">
      <Navbar onAuth={handleAuth} />
      <main>
        <Hero onAuth={handleAuth} />
        <Features />
        <HowItWorks />
        <WhyChoose />
        <About />
        <Testimonials />
        <Pricing onAuth={handleAuth} />
        <FinalCTA onAuth={handleAuth} />
      </main>
      <Footer />
      <LoginModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={handleAuthSuccess}
      />
    </div>
  );
}
