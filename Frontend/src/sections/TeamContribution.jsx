

const TeamContribution = () => {
  return (
    <div className="min-h-screen bg-[#F8F9FA] p-8 md:p-12 font-sans text-slate-800 flex items-center justify-center">
      <div className="max-w-1100px w-full flex flex-col gap-12">
        
        {/* ================= TOP SECTION (LIGHT) ================= */}
        <div className="flex flex-col md:flex-row gap-10 md:gap-16">
          
          {/* --- Left Column: Chat/Task Card --- */}
          <div className="w-full md:w-1/2 bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.03)] border border-slate-100 p-6 flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2 font-semibold text-slate-800">
                <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                #launch-sprint
              </div>
              <div className="text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                8 participants
              </div>
            </div>

            {/* Chat Message 1 */}
            <div className="flex gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-emerald-500 shrink-0 flex items-center justify-center text-white text-xs font-bold">
                M
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-800">Marcus Vance</span>
                  <span className="text-slate-400">10:42 AM</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-lg rounded-tl-none text-sm text-slate-600 leading-relaxed border border-slate-100">
                  I pushed the initial benchmark metrics for the real-time websocket sync. Looks like latency is down 42%!
                </div>
              </div>
            </div>

            {/* Chat Message 2 (Task) */}
            <div className="flex gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-emerald-400 shrink-0 flex items-center justify-center text-white text-xs font-bold">
                S
              </div>
              <div className="flex flex-col gap-1 w-full">
                <div className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-slate-800">Sarah Lin</span>
                  <span className="text-slate-400">10:44 AM</span>
                </div>
                
                <div className="border border-emerald-100 bg-white rounded-lg p-4 text-sm mt-1 shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-500 tracking-wider">
                      <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      TASK CREATED FROM CHAT
                    </div>
                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-2 py-0.5 rounded-full">
                      In Review
                    </span>
                  </div>
                  
                  <div className="font-medium text-slate-800 mb-4 leading-tight">
                    Verify web socket reconnect behavior on mobile network switch
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <span>Assigned to <span className="text-slate-800 font-medium">Marcus</span></span>
                    <span>Due <span className="text-slate-800 font-medium">6:00 PM</span></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                <svg className="w-4 h-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Zero context switching between chat and tasks
              </div>
              <div className="bg-emerald-50 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full">
                Instant Sync
              </div>
            </div>
          </div>

          {/* --- Right Column: Text Content --- */}
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="text-xs font-bold text-emerald-600 tracking-wider mb-3 uppercase">
              Unbroken Focus
            </div>
            <h2 className="text-3xl font-bold text-slate-800 leading-tight mb-4">
              Stop losing hours in the Slack-to-Jira void.
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              When discussions happen separate from execution, commitments get lost. Stride turns every conversation into a searchable, trackable workspace object.
            </p>

            <ul className="flex flex-col gap-6">
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">One-Click Task Conversion</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Hover over any teammate message and instantly convert it to a scheduled task with assignee and milestone tags.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">Granular Notification Quiet Zones</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Block out 90-minute deep work sessions where non-urgent direct messages wait until your sprint is finished.</p>
                </div>
              </li>
              <li className="flex gap-3">
                <svg className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-slate-800 mb-1">Rich Media & Code Snippets</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">Drop Figma mockups, Github pull requests, or code blocks right into discussion threads without distortion.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* ================= BOTTOM SECTION (DARK GREEN) ================= */}
        <div className="w-full bg-[#113C30] rounded-3xl p-8 md:p-10 flex flex-col md:flex-row gap-10 md:gap-16">
          
          {/* --- Left Column: Text & Stats --- */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-bold text-emerald-400 tracking-wider mb-3 uppercase">
                Habit Architecture
              </div>
              <h2 className="text-3xl font-bold text-white leading-tight mb-4">
                Designed to build team momentum, not burnout.
              </h2>
              <p className="text-emerald-100/70 text-sm leading-relaxed mb-8">
                Gamified productivity tools overwhelm users with fake urgency. Stride focuses on calm, compounding output through automated sprint velocity, healthy daily caps, and milestone celebrations.
              </p>
            </div>
            
            <div className="flex items-center gap-8 mt-4">
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-1">94.8%</span>
                <span className="text-xs text-emerald-200/80">Weekly task completion rate</span>
              </div>
              <div className="w-px h-12 bg-emerald-700/50"></div>
              <div className="flex flex-col">
                <span className="text-4xl font-bold text-white mb-1">3.2x</span>
                <span className="text-xs text-emerald-200/80">Faster sprint resolution</span>
              </div>
            </div>
          </div>

          {/* --- Right Column: Features Grid --- */}
          <div className="w-full md:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Card 1 */}
            <div className="bg-[#1A4A3C] p-5 rounded-xl border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <h4 className="text-sm font-semibold text-white">Streak System</h4>
              </div>
              <p className="text-xs text-emerald-100/60 leading-relaxed">Positive reinforcement that rewards consistent project check-ins.</p>
            </div>

            {/* Card 2 */}
            <div className="bg-[#1A4A3C] p-5 rounded-xl border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <h4 className="text-sm font-semibold text-white">Friday Digests</h4>
              </div>
              <p className="text-xs text-emerald-100/60 leading-relaxed">Automated async summaries delivered right to your team's inbox.</p>
            </div>

            {/* Card 3 */}
            <div className="bg-[#1A4A3C] p-5 rounded-xl border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <h4 className="text-sm font-semibold text-white">Calm Notifications</h4>
              </div>
              <p className="text-xs text-emerald-100/60 leading-relaxed">No badge counts that spike adrenaline; only intentional updates.</p>
            </div>

            {/* Card 4 */}
            <div className="bg-[#1A4A3C] p-5 rounded-xl border border-emerald-800/30">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="text-sm font-semibold text-white">Focus Sessions</h4>
              </div>
              <p className="text-xs text-emerald-100/60 leading-relaxed">Integrated Pomodoro and timeboxing directly tied to task progress.</p>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TeamContribution;