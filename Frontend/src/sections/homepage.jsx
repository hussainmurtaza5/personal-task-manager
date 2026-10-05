import { Link } from 'react-router-dom';
import DashboardShowcase from './dashboardshowcase.jsx';
import DesignedForFlow from './DesignedforFlow.jsx';
export default function Homepage() {
  const navLinks = ["Features", "Workspaces", "Team Chat", "Solutions", "Pricing"];

  const logos = [
    { name: "Linear", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M3.5 10.3 13.7 20.5c.6-.1 1.2-.3 1.7-.5L4 9.5c-.2.5-.4 1.1-.5 1.8Zm1.2-3.6 12.6 12.6c.4-.2.8-.5 1.2-.8L5.5 5.5c-.3.4-.6.8-.8 1.2Zm2.5-2.6L20 17c.3-.3.6-.7.9-1.1L8.3 3.2c-.4.3-.8.6-1.1.9ZM10.1 2.6 21.4 13.9c.4-2.6-.2-5.4-2-7.5a9.5 9.5 0 0 0-7.4-3.6c-.6 0-1.3 0-1.9.2Z"/></svg>
    )},
    { name: "loom", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="16" height="16" rx="3"/><circle cx="12" cy="12" r="3"/></svg>
    )},
    { name: "Notion", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="4" y="4" width="16" height="16" rx="2"/><path d="M8 16V9l6 6V8"/></svg>
    )},
    { name: "Figma", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M12 4h3a3 3 0 1 1 0 6h-3V4Zm0 0H9a3 3 0 0 0 0 6h3V4Zm0 6H9a3 3 0 0 0 0 6h3v-6Zm0 0h3a3 3 0 0 1 0 6 3 3 0 0 1-3-3v-3Zm0 6H9a3 3 0 1 0 3 3v-3Z"/></svg>
    )},
    { name: "Vercel", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M12 4 21 19H3L12 4Z"/></svg>
    )},
    { name: "Supabase", icon: (
      <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"><path d="M13 3 5 13h6l-1 8 8-10h-6l1-8Z"/></svg>
    )},
  ];

  const avatars = [
    { initials: "JD", bg: "bg-teal-200", fg: "text-teal-800" },
    { initials: "SK", bg: "bg-violet-200", fg: "text-violet-800" },
    { initials: "MF", bg: "bg-amber-200", fg: "text-amber-800" },
    { initials: "AL", bg: "bg-sky-200", fg: "text-sky-800" },
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 antialiased [font-family:Inter,system-ui,sans-serif]">
      {/* ---------- Navbar ---------- */}
      <header className="border-b border-slate-100">
        <nav className="mx-auto flex h-16 max-w-7xl items-center gap-8 px-6">
          {/* Logo */}
          <Link to="/" className="flex shrink-0 items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600">
              <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="m5 13 4 4L19 7" />
              </svg>
            </span>
            <span className="text-xl font-semibold tracking-tight text-slate-900">stride</span>
          </Link>

          {/* Nav links */}
          <ul className="hidden items-center gap-7 text-[15px] font-medium text-slate-600 md:flex">
            {navLinks.map((link) => (
              <li key={link}>
                <a href="#" className="transition hover:text-slate-900">{link}</a>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-3">
            <Link to="/login" className="hidden text-[15px] font-medium text-slate-600 transition hover:text-slate-900 sm:block">
              Log in
            </Link>
            <Link to="/register" className="rounded-lg bg-emerald-600 px-4 py-2 text-[15px] font-semibold text-white shadow-sm transition hover:bg-emerald-700">
              + Get Started Free
            </Link>
            <Link to="/login" aria-label="Account" className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white transition hover:bg-emerald-700">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.8">
                <circle cx="12" cy="8.5" r="3.2" />
                <path d="M5.5 19.5a6.5 6.5 0 0 1 13 0" strokeLinecap="round" />
              </svg>
            </Link>
          </div>
        </nav>
      </header>

      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden">
        {/* soft green glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[880px] -translate-x-1/2 -translate-y-1/3 rounded-full bg-emerald-100/70 blur-[120px]"
        />

        <div className="relative mx-auto max-w-4xl px-6 pt-14 pb-20 text-center">
          {/* Announcement pill */}
          <a
            href="#"
            className="group inline-flex items-center gap-3 rounded-full border border-slate-200 bg-white/80 py-1.5 pl-2 pr-2.5 text-[13px] font-semibold tracking-wide shadow-sm backdrop-blur transition hover:border-slate-300"
          >
            <span className="flex items-center gap-1.5 rounded-full px-2 py-0.5 text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              STRIDE 2.0 IS LIVE
            </span>
            <span className="font-medium text-slate-400">Workspaces, Tasks &amp; Chat unified</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-white">
              <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>

          {/* Headline */}
          <h1 className="mt-7 text-balance text-[42px] font-bold leading-[1.08] tracking-tight text-slate-900 sm:text-[56px]">
            Where focused teams{" "}
            <span className="underline decoration-emerald-400 decoration-[6px] underline-offset-[10px]">
              stride forward
            </span>{" "}
            together.
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mt-6 max-w-2xl text-pretty text-[17px] leading-relaxed text-slate-500 sm:text-lg">
            Join shared workspaces, organize daily tasks with habit-forming momentum, and chat
            with your team in real time — all inside one serene, distraction-free environment.
          </p>

          {/* CTAs */}
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/register" className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl bg-emerald-700 px-6 py-3.5 text-[15px] font-semibold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 sm:w-auto">
              <span className="text-base">🚀</span>
              Start for free — No card needed
            </Link>
            <button className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-[15px] font-semibold text-slate-900 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:w-auto">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="1.7">
                <circle cx="12" cy="12" r="9" />
                <path d="m10 8.5 6 3.5-6 3.5v-7Z" fill="currentColor" stroke="none" />
              </svg>
              Watch 2-min interactive tour
            </button>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <div className="flex -space-x-2.5">
              {avatars.map((a) => (
                <span
                  key={a.initials}
                  className={`flex h-8 w-8 items-center justify-center rounded-full ring-2 ring-white text-[11px] font-bold ${a.bg} ${a.fg}`}
                >
                  {a.initials}
                </span>
              ))}
            </div>
            <p className="text-[14px] text-slate-500">
              Joined by 25,000+ builders, designers &amp; remote teams
            </p>
          </div>

          {/* Trusted by */}
          <div className="mt-16">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
              Trusted by forward-moving teams at
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 text-slate-400">
              {logos.map((logo) => (
                <div
                  key={logo.name}
                  className="flex items-center gap-2 text-slate-500/90 transition hover:text-slate-700"
                >
                  {logo.icon}
                  <span className="text-[17px] font-medium tracking-tight">{logo.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <DashboardShowcase />
      <DesignedForFlow />
    </div>
  );
}