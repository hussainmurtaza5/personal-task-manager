import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Simple inline SVG icons so you don't need any icon libs
const BuildingIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <rect x="4" y="3" width="16" height="18" rx="2" className="fill-emerald-600/10" />
    <path d="M8 7h2M8 11h2M14 7h2M14 11h2M6 21V5a2 2 0 0 1 2-2h8" className="stroke-emerald-700" strokeWidth="1.6" />
    <path d="M4 21h16" className="stroke-emerald-700" strokeWidth="1.6" />
  </svg>
);

const TrendUpIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M3 17l6-6 4 4 7-7" className="stroke-emerald-700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M15 8h6v6" className="stroke-emerald-700" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const ChatIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" {...props}>
    <path d="M21 12a7 7 0 0 1-7 7H8l-5 4V12a7 7 0 0 1 7-7h4a7 7 0 0 1 7 7Z" className="fill-emerald-600/10" />
    <path d="M7.5 11h9M7.5 14h6" className="stroke-emerald-700" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

export default function DesignedForFlow() {
  const sectionRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);

  const cardRefs = useRef([]);
  const barsRef = useRef([]);
  const chatRef = useRef(null);

  // utility to register refs in arrays
  const setCardRef = (el, i) => {
    if (el) cardRefs.current[i] = el;
  };
  const setBarRef = (el, i) => {
    if (el) barsRef.current[i] = el;
  };

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Intro (label, title, paragraph)
      gsap.from([labelRef.current, titleRef.current, descRef.current], {
        y: 20,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      // Cards stagger in
      gsap.from(cardRefs.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.18,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      });

      // Streak bars grow
      gsap.from(barsRef.current, {
        transformOrigin: 'bottom center',
        scaleY: 0,
        duration: 0.8,
        ease: 'power2.out',
        stagger: 0.08,
        scrollTrigger: {
          trigger: cardRefs.current[1],
          start: 'top 75%',
        },
      });

      // Chat conversion chip slide in
      if (chatRef.current) {
        gsap.from(chatRef.current, {
          x: 24,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: cardRefs.current[2],
            start: 'top 80%',
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative w-full bg-gradient-to-b from-slate-50/70 to-white py-16 sm:py-20"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <p
            ref={labelRef}
            className="text-[11px] sm:text-xs font-semibold tracking-[0.18em] uppercase text-emerald-600"
          >
            Designed for Flow
          </p>
          <h2
            ref={titleRef}
            className="mt-3 text-2xl sm:text-3xl md:text-4xl font-semibold text-slate-900"
          >
            Everything your team needs to stay aligned, without the noise.
          </h2>
          <p
            ref={descRef}
            className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed"
          >
            Most team tools force you into fragmented apps. Stride binds your
            project spaces, daily action lists, and real‑time talk into one cohesive loop.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {/* Card 1 */}
          <div
            id="workspaces"
            ref={(el) => setCardRef(el, 0)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <BuildingIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Collaborative Workspaces
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Create modular project portals for engineering, marketing, or client
              engagements. Set granular role permissions and toggle between client and
              internal spaces with a click.
            </p>

            {/* Visual Accent: Workspace hierarchy */}
            <div className="mt-5 rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-[11px] font-medium">
                <span className="inline-flex items-center gap-2 text-slate-800">
                  <span className="inline-block w-2 h-2 rounded-sm bg-emerald-600" />
                  Stride Global Workspace
                </span>
                <span className="text-emerald-700">18 Active</span>
              </div>

              <div className="mt-2 flex flex-col gap-2 pl-4">
                <div className="flex items-center justify-between text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-700">
                  <span>#design-system</span>
                  <span className="text-[11px] bg-slate-100 rounded px-1.5 py-0.5">5 online</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-white border border-slate-200 rounded px-2 py-1 text-slate-700">
                  <span>#growth-experiment</span>
                  <span className="text-[11px] bg-slate-100 rounded px-1.5 py-0.5">3 online</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2 */}
          <div
            ref={(el) => setCardRef(el, 1)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <TrendUpIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Momentum–Driven Tracking
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Productivity isn’t just checking boxes—it’s compounding velocity. Stride
              visualizes daily and weekly completion curves to reward continuous daily progress.
            </p>

            {/* Visual Accent: Mini Streak Chart */}
            <div className="mt-5 rounded-lg bg-slate-50 p-3">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-700 mb-2">
                <span>Daily Streak Velocity</span>
                <span className="text-emerald-700 font-semibold">12‑Day Streak</span>
              </div>
              <div className="flex items-end gap-1.5 h-16 pt-1">
                {[
                  'h-6 bg-emerald-300',
                  'h-8 bg-emerald-300',
                  'h-10 bg-emerald-400',
                  'h-9 bg-emerald-500',
                  'h-12 bg-emerald-600',
                  'h-14 bg-emerald-700',
                ].map((cls, i) => (
                  <div
                    key={i}
                    ref={(el) => setBarRef(el, i)}
                    className={`w-full max-w-6 rounded-t ${cls}`}
                    style={{ flex: 1 }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div
            ref={(el) => setCardRef(el, 2)}
            className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-6"
          >
            <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <ChatIcon className="w-7 h-7" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-slate-900">
              Threaded Team Chat
            </h3>
            <p className="mt-2 text-sm text-slate-600 leading-relaxed">
              Talk where work happens. Convert any chat message directly into an actionable
              task, conduct threaded discussions, and tag tasks without jumping over to
              Slack or email.
            </p>

            {/* Visual Accent: Chat snippet */}
            <div className="mt-5 rounded-lg bg-slate-50 p-3 space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-emerald-200 text-emerald-900 text-[11px] font-semibold flex items-center justify-center">
                  E
                </div>
                <div className="bg-white border border-slate-200 rounded px-2 py-1.5 text-xs text-slate-800 shadow-sm">
                  <span className="font-semibold text-emerald-700">Elena:</span> Ready to ship Sprint #14?
                </div>
              </div>

              <div
                ref={chatRef}
                className="ml-auto w-max flex items-center gap-1.5 text-[11px] font-semibold text-emerald-700 bg-white border border-emerald-200 rounded px-2 py-1 shadow-sm"
              >
                <svg viewBox="0 0 24 24" className="w-4 h-4 text-emerald-600" fill="none">
                  <path d="M5 13l4 4L19 7" className="stroke-emerald-600" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Converted to task: "Ship v2"
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* subtle top glow */}
      <div className="pointer-events-none absolute inset-x-0 -top-10 h-24 bg-gradient-to-b from-emerald-200/20 to-transparent" />
    </section>
  );
}