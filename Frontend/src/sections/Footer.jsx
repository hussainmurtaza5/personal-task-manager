import { useLayoutEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const footerColumns = [
  {
    title: 'Product',
    links: ['Features', 'Workspaces', 'Team Chat', 'Pricing', 'Changelog'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Blog', 'Customers', 'Contact'],
  },
  {
    title: 'Resources',
    links: ['Help center', 'Community', 'Guides', 'API docs', 'Status'],
  },
  {
    title: 'Legal',
    links: ['Privacy', 'Terms', 'Security', 'Cookies'],
  },
];

const socials = [
  {
    name: 'X',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M17.53 3H21l-7.19 8.21L22 21h-6.56l-5.14-6.71L4.4 21H1l7.7-8.8L1.5 3h6.72l4.65 6.15L17.53 3Zm-1.15 16h1.8L7.7 4.9H5.77l10.61 14.1Z" />
      </svg>
    ),
  },
  {
    name: 'GitHub',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.1-1.47-1.1-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    name: 'LinkedIn',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M4.98 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.98 0ZM.5 8h4.96V24H.5V8Zm7.5 0h4.75v2.19h.07c.66-1.2 2.28-2.47 4.7-2.47C22.7 7.72 24 10.1 24 14.06V24h-4.96v-8.72c0-2.08-.04-4.76-2.9-4.76-2.9 0-3.35 2.27-3.35 4.6V24H8V8Z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    icon: (
      <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
        <path d="M23.5 6.5a3 3 0 0 0-2.1-2.1C19.5 3.9 12 3.9 12 3.9s-7.5 0-9.4.5A3 3 0 0 0 .5 6.5 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.5 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.2 3.6-6.2 3.6Z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const footerRef = useRef(null);
  const topRef = useRef(null);
  const columnsRef = useRef([]);
  const bottomRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      if (prefersReduced) return;

      gsap.from(topRef.current, {
        y: 28,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 85%' },
      });

      gsap.from(columnsRef.current.filter(Boolean), {
        y: 24,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power3.out',
        scrollTrigger: { trigger: footerRef.current, start: 'top 80%' },
      });

      gsap.from(bottomRef.current, {
        y: 16,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: bottomRef.current, start: 'top 95%' },
      });
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const setColumnRef = (el, i) => {
    if (el) columnsRef.current[i] = el;
  };

  return (
    <footer
      ref={footerRef}
      className="relative w-full overflow-hidden bg-[#0B4534] font-sans text-emerald-50"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-[720px] -translate-x-1/2 rounded-full bg-emerald-400/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-6xl px-6 pt-16 pb-10 sm:px-8">
        {/* Top: brand + newsletter */}
        <div
          ref={topRef}
          className="flex flex-col gap-10 border-b border-emerald-700/40 pb-12 lg:flex-row lg:items-start lg:justify-between"
        >
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500">
                <svg viewBox="0 0 24 24" className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m5 13 4 4L19 7" />
                </svg>
              </span>
              <span className="text-xl font-semibold tracking-tight text-white">stride</span>
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-emerald-100/70">
              The calm workspace where focused teams plan tasks, chat in real time,
              and build momentum together.
            </p>
            <div className="mt-6 flex items-center gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href="#"
                  aria-label={social.name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-emerald-700/50 text-emerald-100/80 transition hover:border-emerald-400 hover:bg-emerald-500/10 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div className="w-full max-w-md">
            <h3 className="text-sm font-semibold text-white">Stay in the loop</h3>
            <p className="mt-2 text-sm text-emerald-100/70">
              Product news, workflow tips, and the occasional Friday digest. No noise.
            </p>
            <form
              className="mt-4 flex flex-col gap-3 sm:flex-row"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="email"
                required
                placeholder="you@company.com"
                className="w-full rounded-lg border border-emerald-700/50 bg-emerald-900/40 px-4 py-3 text-sm text-white outline-none placeholder:text-emerald-200/40 focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/40"
              />
              <button
                type="submit"
                className="whitespace-nowrap rounded-lg bg-[#6EE7B7] px-5 py-3 text-sm font-semibold text-[#064E3B] transition hover:bg-[#34D399]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Middle: link columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {footerColumns.map((column, index) => (
            <div key={column.title} ref={(el) => setColumnRef(el, index)}>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-400">
                {column.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-emerald-100/70 transition hover:text-white"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div
          ref={bottomRef}
          className="flex flex-col items-center justify-between gap-4 border-t border-emerald-700/40 pt-6 text-xs text-emerald-100/60 sm:flex-row"
        >
          <p>© {new Date().getFullYear()} Stride Labs, Inc. All rights reserved.</p>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <span className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              All systems operational
            </span>
            <a href="#" className="transition hover:text-white">Privacy</a>
            <a href="#" className="transition hover:text-white">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
