
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const TestimonialCard = ({ initials, name, role, quote, avatarBg }) => (
  <div className="testimonial-card bg-white rounded-2xl p-6 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col h-full">
    {/* Stars */}
    <div className="flex gap-1 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg key={i} className="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>

    {/* Quote */}
    <p className="text-slate-600 text-sm leading-relaxed mb-8 flex-grow">
      "{quote}"
    </p>

    {/* Author */}
    <div className="flex items-center gap-3 mt-auto">
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs ${avatarBg}`}>
        {initials}
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-bold text-slate-800">{name}</span>
        <span className="text-xs text-slate-500">{role}</span>
      </div>
    </div>
  </div>
);

const TestimonialSection = () => {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      // Testimonials heading + cards
      gsap.from('.testimonial-heading', {
        y: 24,
        opacity: 0,
        duration: 0.7,
        stagger: 0.12,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonial-heading', start: 'top 85%' },
      });
      gsap.from('.testimonial-card', {
        y: 36,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.testimonial-card', start: 'top 82%' },
      });

      // Pricing banner
      gsap.from('.pricing-banner', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.pricing-banner', start: 'top 85%' },
      });

      // Bottom CTA panel
      gsap.from('.cta-panel', {
        y: 40,
        opacity: 0,
        scale: 0.98,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: '.cta-panel', start: 'top 88%' },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const testimonials = [
    {
      initials: 'KL',
      name: 'Kareem Lindqvist',
      role: 'VP of Engineering at HyperScale',
      quote: 'We retired both Slack and Asana within two weeks of testing Stride. Having tasks natively rooted inside the channels where we chat cut our meeting load in half.',
      avatarBg: 'bg-[#A7F3D0] text-[#064E3B]'
    },
    {
      initials: 'AP',
      name: 'Arla Patel',
      role: 'Founding Designer at Studio Forma',
      quote: 'The visual calmness of Stride is impossible to overstate. The soft sage tones and progress rings make completing client sprints genuinely satisfying rather than exhausting.',
      avatarBg: 'bg-[#6EE7B7] text-[#064E3B]'
    },
    {
      initials: 'TS',
      name: 'Tobias Schmidt',
      role: 'Independent Fullstack Architect',
      quote: 'The multi-tenant workspace model is perfection for solo consultants. I have my personal tasks and three separate client portals in one smooth, fast desktop canvas.',
      avatarBg: 'bg-[#D1FAE5] text-[#064E3B]'
    }
  ];

  return (
    <div id="testimonials" ref={sectionRef} className="min-h-screen bg-[#F8F9FA] py-16 px-6 md:px-12 font-sans flex flex-col items-center">
      <div className="max-w-[1100px] w-full flex flex-col gap-16">

        {/* ================= SECTION 1: TESTIMONIALS ================= */}
        <div className="flex flex-col items-center">
          <div className="testimonial-heading text-[10px] font-bold text-emerald-600 tracking-[0.15em] uppercase mb-3 text-center">
            Voices from the Field
          </div>
          <h2 className="testimonial-heading text-3xl md:text-[32px] font-bold text-slate-800 text-center mb-12">
            Loved by people who care about craft.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
            {testimonials.map((t, idx) => (
              <TestimonialCard key={idx} {...t} />
            ))}
          </div>
        </div>

        {/* ================= SECTION 2: MIDDLE BANNER ================= */}
        <div id="pricing" className="pricing-banner bg-white rounded-2xl p-8 shadow-[0_2px_15px_rgb(0,0,0,0.03)] border border-slate-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          
          <div className="flex flex-col gap-3 max-w-2xl">
            <div className="inline-flex self-start bg-[#E6F4EA] text-[#137333] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Simple & Transparent
            </div>
            <h3 className="text-2xl font-bold text-slate-800">
              Start free. Upgrade as your team expands.
            </h3>
            <p className="text-sm text-slate-500">
              Unlimited personal workspaces and up to 5 collaborators on the Starter plan. Zero credit card required to begin.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto mt-4 lg:mt-0">
            <a href="#" className="text-sm font-medium text-slate-700 hover:text-slate-900 flex items-center gap-1 transition-colors">
              Explore full pricing & plans
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <button className="bg-[#0B4534] hover:bg-[#073326] text-white text-sm font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap w-full sm:w-auto">
              Get Started Free
            </button>
          </div>
        </div>

        {/* ================= SECTION 3: BOTTOM CTA ================= */}
        <div className="cta-panel w-full bg-[#0B4534] rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center text-center relative overflow-hidden">
          
          <div className="text-[10px] font-bold text-emerald-400 tracking-[0.15em] uppercase mb-4">
            Instant Setup
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight max-w-2xl">
            Ready to hit your team's natural stride?
          </h2>
          
          <p className="text-[#A7F3D0] text-sm md:text-base leading-relaxed max-w-2xl mb-8">
            Join over 25,000 creators, startups, and remote squads who organize projects with calm clarity and zero friction.
          </p>

          <form className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md justify-center mb-8">
            <input 
              type="email" 
              placeholder="Enter your work email..." 
              className="w-full px-4 py-3 rounded-lg text-slate-800 text-sm outline-none focus:ring-2 focus:ring-emerald-400 placeholder:text-slate-400"
            />
            <button 
              type="submit" 
              className="w-full sm:w-auto bg-[#6EE7B7] hover:bg-[#34D399] text-[#064E3B] text-sm font-semibold px-6 py-3 rounded-lg transition-colors whitespace-nowrap"
            >
              Create Free Workspace
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-[#A7F3D0] font-medium">
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Free 14-day trial for teams
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              Cancel anytime
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default TestimonialSection;