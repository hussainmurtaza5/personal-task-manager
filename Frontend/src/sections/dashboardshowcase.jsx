import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function DashboardShowcase() {
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const progressRef = useRef(null);
  const greetingRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Greeting fade + slight upward slide
      gsap.from(greetingRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
      });

      // Stagger the metric cards
      gsap.from(cardsRef.current, {
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.12,
        ease: "power3.out",
        delay: 0.15,
      });

      // Animate the progress bar fill
      gsap.fromTo(
        progressRef.current,
        { width: "0%" },
        {
          width: "100%",
          duration: 1.2,
          ease: "power2.out",
          delay: 0.6,
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const addToCardsRef = (el, index) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div
      ref={containerRef}
      className="mx-auto w-full max-w-[1180px] overflow-hidden rounded-2xl border border-slate-200/70 bg-[#F8F7FC] font-sans text-slate-800 shadow-[0_35px_80px_-25px_rgba(15,23,42,0.45),0_12px_30px_-12px_rgba(15,23,42,0.2)] ring-1 ring-slate-900/5"
    >
      {/* Browser-style window chrome (screenshot frame) */}
      <div className="flex items-center gap-1.5 px-4 py-2 bg-white/60 border-b border-slate-200/60">
        <span className="h-3 w-3 rounded-full bg-rose-400" />
        <span className="h-3 w-3 rounded-full bg-amber-400" />
        <span className="h-3 w-3 rounded-full bg-emerald-400" />
        <div className="ml-auto flex h-7 min-w-0 max-w-[60%] flex-1 items-center gap-1.5 rounded-md bg-slate-100 px-2.5 text-[11px] text-slate-500">
          <span className="shrink-0 text-slate-400">🔒</span>
          <span className="min-w-0 flex-1 truncate" title="app.stride.so/workspaces/personal/overview">
            app.stride.so/workspaces/personal/overview
          </span>
        </div>
        <span className="ml-2 h-2.5 w-2.5 shrink-0 rounded-full bg-slate-400" />
      </div>

      {/* Top navigation bar (simplified) */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-200/60 bg-white/70 backdrop-blur-sm">
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="font-medium text-slate-700">Personal</span>
          <span>/</span>
          <span className="text-slate-800">Overview</span>
        </div>
        <div className="flex items-center gap-3">
          <button className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg bg-slate-100 text-slate-700">
            <span className="text-xs">📊</span> Overview
          </button>
          <button className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-slate-600 hover:bg-slate-100">
            Team Chat
          </button>
          <button className="cursor-pointer flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg text-slate-600 hover:bg-slate-100">
            Kanban
          </button>
          <div className="w-8 h-8 rounded-full bg-teal-500 flex items-center justify-center text-white text-sm font-medium">
            A
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden lg:flex w-64 min-h-[760px] shrink-0 bg-white border-r border-slate-200/70 p-4 flex-col">
          <div className="flex items-center gap-3 mb-6 px-2 py-2 rounded-xl bg-slate-50">
            <div className="w-9 h-9 rounded-lg bg-violet-500 flex items-center justify-center text-white font-semibold">
              P
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">Personal</p>
              <p className="text-xs text-slate-500">Your personal space</p>
            </div>
          </div>

          <nav className="space-y-1 mb-8">
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-emerald-50 text-emerald-700 font-medium text-sm"
            >
              <span className="text-base">⊞</span> Overview
              <span className="ml-auto w-2 h-2 rounded-full bg-emerald-500" />
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-sm"
            >
              <span className="text-base">✓</span> My tasks
              <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                3
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-sm"
            >
              <span className="text-base">📁</span> Projects
              <span className="ml-auto text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                4
              </span>
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 hover:bg-slate-50 text-sm"
            >
              <span className="text-base">📅</span> Calendar
            </a>
          </nav>

          <div className="mb-4">
            <div className="flex items-center justify-between px-3 mb-2">
              <span className="text-xs font-semibold text-slate-400 tracking-wider">
                PROJECTS
              </span>
              <button className="text-slate-400 hover:text-slate-600 text-lg leading-none">
                +
              </button>
            </div>
            <div className="space-y-1">
              <a
                href="#"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
              >
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Website redesign
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
              >
                <span className="w-2 h-2 rounded-full bg-violet-500" />
                Freelance client app
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-50"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Personal health tracker
              </a>
            </div>
          </div>

          <div className="mt-auto space-y-1 pt-4 border-t border-slate-100">
            <button className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              <span className="text-emerald-500">+</span> Create workspace
            </button>
            <button className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-sm text-slate-600 hover:bg-slate-50 rounded-lg">
              <span>👤</span> Invite teammate
            </button>
          </div>
        </aside>

        {/* Main content */}
        <main className="min-w-0 w-full flex-1 p-5 sm:p-8">
          {/* Greeting */}
          <div ref={greetingRef} className="mb-8">
            <p className="text-xs font-medium text-slate-400 tracking-widest mb-1">
              WEDNESDAY, AUGUST 19, 2026
            </p>
            <h1 className="text-3xl font-semibold text-slate-900 flex items-center gap-2">
              Good morning, Albert
              <span className="text-2xl">✨</span>
            </h1>
            <p className="text-slate-500 mt-1">
              Here is what is happening across your work and teams today.
            </p>
          </div>

          {/* Metric cards + Weekly progress */}
          <div className="grid grid-cols-1 gap-4 mb-10 sm:grid-cols-2 xl:grid-cols-4">
            {/* Due today */}
            <div
              ref={(el) => {
                addToCardsRef(el, 0);
              }}
              className="bg-white rounded-2xl p-5 shadow-md shadow-slate-200/70 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span className="text-orange-400">⏰</span>
                Due today
              </div>
              <p className="text-4xl font-semibold text-slate-900">0</p>
              <p className="text-sm text-slate-400 mt-1">Tasks to finish</p>
            </div>

            {/* Completed */}
            <div
              ref={(el) => {
                addToCardsRef(el, 1);
              }}
              className="bg-white rounded-2xl p-5 shadow-md shadow-slate-200/70 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span className="text-emerald-500">✓</span>
                Completed
              </div>
              <p className="text-4xl font-semibold text-slate-900">14</p>
              <p className="text-sm text-slate-400 mt-1">Tasks this week</p>
            </div>

            {/* Active projects */}
            <div
              ref={(el) => {
                addToCardsRef(el, 2);
              }}
              className="bg-white rounded-2xl p-5 shadow-md shadow-slate-200/70 border border-slate-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <span className="text-blue-500">📁</span>
                Active projects
              </div>
              <p className="text-4xl font-semibold text-slate-900">4</p>
              <p className="text-sm text-slate-400 mt-1">Across your workspace</p>
            </div>

            {/* Weekly Progress */}
            <div
              ref={(el) => {
                addToCardsRef(el, 3);
              }}
              className="bg-emerald-700 rounded-2xl p-5 text-white shadow-md shadow-emerald-900/30 relative overflow-hidden hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium opacity-90">
                  WEEKLY PROGRESS
                </span>
                <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                  On track
                </span>
              </div>
              <p className="text-4xl font-semibold mb-3">100%</p>
              <div className="h-2 bg-white/20 rounded-full overflow-hidden mb-3">
                <div
                  ref={progressRef}
                  className="h-full bg-white rounded-full"
                  style={{ width: "0%" }}
                />
              </div>
              <p className="text-sm opacity-90 leading-snug">
                Great work! Building strong momentum.
              </p>
            </div>
          </div>

          {/* Personal tasks section (bonus – matches the screenshot) */}
          <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-lg font-semibold text-slate-900">
                  Personal tasks
                </h2>
                <p className="text-sm text-slate-500">
                  Stay focused on what moves the needle most.
                </p>
              </div>
              <div className="flex gap-1 text-sm">
                <button className="cursor-pointer px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 font-medium">
                  All tasks 3
                </button>
                <button className="cursor-pointer px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50">
                  Today
                </button>
                <button className="cursor-pointer px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50">
                  Upcoming
                </button>
                <button className="cursor-pointer px-3 py-1.5 rounded-lg text-slate-500 hover:bg-slate-50">
                  Completed
                </button>
              </div>
            </div>

            {/* Add task input */}
            <div className="flex items-center gap-3 mb-5 p-3 rounded-xl border border-dashed border-slate-200 bg-slate-50/50">
              <span className="text-slate-400 text-lg">+</span>
              <input
                type="text"
                placeholder="Add a personal task… (Press Enter to save)"
                className="flex-1 bg-transparent outline-none text-sm text-slate-700 placeholder:text-slate-400"
              />
              <span className="text-xs text-slate-400 px-2 py-1 rounded bg-white border">
                Low
              </span>
              <span className="text-xs text-slate-400 px-2 py-1 rounded bg-white border">
                Pending
              </span>
            </div>

            {/* Task list */}
            <ul className="space-y-3">
              <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center text-emerald-500 text-xs">
                  ✓
                </div>
                <span className="flex-1 text-sm text-slate-700 line-through opacity-70">
                  Draft announcement notes for Stride 2.0 release
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700">
                  Marketing
                </span>
                <span className="text-xs text-slate-400">Today</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                <span className="flex-1 text-sm text-slate-700">
                  Review customer onboarding feedback sprint
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-orange-50 text-orange-600 font-medium">
                  High Priority
                </span>
                <span className="text-xs text-slate-400">Due 4:00 PM</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300" />
                <span className="flex-1 text-sm text-slate-700">
                  Schedule weekly async standup sync in #engineering
                </span>
                <span className="text-xs px-2.5 py-1 rounded-full bg-blue-50 text-blue-600">
                  Team Chat
                </span>
                <span className="text-xs text-slate-400">Tomorrow</span>
              </li>
            </ul>
          </div>
        </main>
      </div>
    </div>
  );
}