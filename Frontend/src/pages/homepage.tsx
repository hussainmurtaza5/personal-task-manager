import { useState } from 'react';
import '../styles/Homepage.css';

function Homepage() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="landing-page">
            {/* ── Navigation ─────────────────────────────── */}
            <nav className="landing-nav">
                <div className="nav-inner">
                    <a href="#" className="nav-brand">
                        <span className="brand-mark">✓</span>
                        <span>stride</span>
                    </a>
                    <button
                        className={`nav-toggle ${menuOpen ? 'open' : ''}`}
                        onClick={() => setMenuOpen((open) => !open)}
                        aria-label="Toggle navigation"
                        aria-expanded={menuOpen}
                    >
                        <span />
                        <span />
                        <span />
                    </button>
                    <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
                        <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
                        <a href="#how-it-works" onClick={() => setMenuOpen(false)}>How it works</a>
                        <a href="#pricing" onClick={() => setMenuOpen(false)}>Pricing</a>
                        <a href="#testimonials" onClick={() => setMenuOpen(false)}>Testimonials</a>
                        <div className="nav-actions">
                            <a href="/login" className="nav-login">Log in</a>
                            <a href="/register" className="btn btn-primary btn-sm">Get started</a>
                        </div>
                    </div>
                </div>
            </nav>

            {/* ── Hero ───────────────────────────────────── */}
            <header className="hero-section">
                <div className="hero-inner">
                    <div className="hero-content">
                        <span className="badge">✦ New · Workspace mode is here</span>
                        <h1 className="hero-title">
                            Organize your tasks,<br />
                            <span className="gradient-text">own your day.</span>
                        </h1>
                        <p className="hero-subtitle">
                            stride is the personal task manager that keeps your work,
                            projects, and team in one calm, focused place.
                        </p>
                        <div className="hero-actions">
                            <a href="/register" className="btn btn-primary">Start for free</a>
                            <a href="#how-it-works" className="btn btn-outline">See how it works</a>
                        </div>
                        <p className="hero-trust">No credit card required · Free forever plan</p>
                    </div>
                    <div className="hero-visual">
                        <div className="app-window">
                            <div className="window-bar">
                                <span className="dot red" />
                                <span className="dot yellow" />
                                <span className="dot green" />
                                <em>stride — My tasks</em>
                            </div>
                            <div className="window-body">
                                <div className="window-sidebar">
                                    <div className="w-brand"><span className="brand-mark">✓</span><span>stride</span></div>
                                    <div className="w-nav-item active"><span>▦</span>Overview</div>
                                    <div className="w-nav-item"><span>✓</span>My tasks <b>4</b></div>
                                    <div className="w-nav-item"><span>▤</span>Projects</div>
                                    <div className="w-nav-item"><span>◷</span>Calendar</div>
                                </div>
                                <div className="window-main">
                                    <div className="w-heading">
                                        <div>
                                            <p className="w-eyebrow">Personal workspace</p>
                                            <h3>My tasks</h3>
                                        </div>
                                        <div className="w-cta">+ New task</div>
                                    </div>
                                    <div className="w-stats">
                                        <div className="w-stat"><small>Due today</small><strong>3</strong></div>
                                        <div className="w-stat"><small>Completed</small><strong>12</strong></div>
                                        <div className="w-stat progress"><small>Progress</small><strong>68%</strong></div>
                                    </div>
                                    <div className="w-task-list">
                                        <div className="w-task done"><span className="w-check">✓</span><p><strong>Reply to client email</strong><small>Due today</small></p><span className="w-tag low">Low</span></div>
                                        <div className="w-task"><span className="w-check" /><p><strong>Design landing page</strong><small>Due today</small></p><span className="w-tag high">High</span></div>
                                        <div className="w-task"><span className="w-check" /><p><strong>Weekly team sync</strong><small>Tomorrow</small></p><span className="w-tag med">Medium</span></div>
                                        <div className="w-task"><span className="w-check" /><p><strong>Update project roadmap</strong><small>Fri, Aug 22</small></p><span className="w-tag low">Low</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="floating-card floating-card-1">
                            <span className="fc-icon">✓</span>
                            <div><strong>Task completed</strong><small>Design landing page</small></div>
                        </div>
                        <div className="floating-card floating-card-2">
                            <span className="fc-icon">▲</span>
                            <div><strong>68% weekly progress</strong><small>You're on a roll!</small></div>
                        </div>
                    </div>
                </div>
                <div className="hero-blob" aria-hidden="true" />
            </header>

            {/* ── Trusted by / stats ─────────────────────── */}
            <section className="stats-band">
                <div className="stats-inner">
                    <div className="stat"><strong>10k+</strong><span>Active users</span></div>
                    <div className="stat"><strong>120k</strong><span>Tasks completed</span></div>
                    <div className="stat"><strong>98%</strong><span>Satisfaction rate</span></div>
                    <div className="stat"><strong>4.9★</strong><span>Average rating</span></div>
                </div>
            </section>

            {/* ── Features ───────────────────────────────── */}
            <section className="features-section" id="features">
                <div className="section-inner">
                    <p className="section-eyebrow">Features</p>
                    <h2 className="section-title">Everything you need to stay in flow</h2>
                    <p className="section-subtitle">Powerful tools, thoughtfully designed so you can focus on the work that matters.</p>
                    <div className="features-grid">
                        <article className="feature-card">
                            <span className="feature-icon">☑</span>
                            <h3>Smart task lists</h3>
                            <p>Organize tasks by priority, due date, or project. Filter by Today, Upcoming, and Completed in one click.</p>
                        </article>
                        <article className="feature-card">
                            <span className="feature-icon">▦</span>
                            <h3>Workspaces</h3>
                            <p>Create shared spaces for teams and projects. Invite members and keep everyone aligned.</p>
                        </article>
                        <article className="feature-card">
                            <span className="feature-icon">◷</span>
                            <h3>Deadline tracking</h3>
                            <p>Never miss a due date. See what's due today, what's coming up, and where your focus is needed.</p>
                        </article>
                        <article className="feature-card">
                            <span className="feature-icon">◔</span>
                            <h3>Progress insights</h3>
                            <p>Track weekly completion, build healthy habits, and celebrate momentum with clear stats.</p>
                        </article>
                        <article className="feature-card">
                            <span className="feature-icon">⌕</span>
                            <h3>Instant search</h3>
                            <p>Find any task across all your workspaces instantly. Search by title, project, or due date.</p>
                        </article>
                        <article className="feature-card">
                            <span className="feature-icon">♻</span>
                            <h3>Works everywhere</h3>
                            <p>Access your tasks from anywhere. Fast, lightweight, and sync-ready for all your devices.</p>
                        </article>
                    </div>
                </div>
            </section>

            {/* ── How it works ───────────────────────────── */}
            <section className="how-section" id="how-it-works">
                <div className="section-inner">
                    <p className="section-eyebrow">How it works</p>
                    <h2 className="section-title">Up and running in three steps</h2>
                    <p className="section-subtitle">Start personal. Add workspaces as your work grows.</p>
                    <div className="steps-grid">
                        <div className="step">
                            <span className="step-number">1</span>
                            <h3>Create your account</h3>
                            <p>Sign up with your email in seconds. No credit card required.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">2</span>
                            <h3>Add your tasks</h3>
                            <p>Capture tasks, set priorities, and choose due dates. It's that simple.</p>
                        </div>
                        <div className="step">
                            <span className="step-number">3</span>
                            <h3>Share & collaborate</h3>
                            <p>Create workspaces, invite teammates, and get things done together.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Testimonials ───────────────────────────── */}
            <section className="testimonials-section" id="testimonials">
                <div className="section-inner">
                    <p className="section-eyebrow">Testimonials</p>
                    <h2 className="section-title">Loved by focused people</h2>
                    <div className="testimonials-grid">
                        <figure className="testimonial-card">
                            <blockquote>"stride replaced my messy sticky notes for good. I finally know exactly what needs to happen today."</blockquote>
                            <figcaption><span className="avatar avatar-1">SR</span><div><strong>Sara R.</strong><small>Freelance designer</small></div></figcaption>
                        </figure>
                        <figure className="testimonial-card">
                            <blockquote>"The workspace feature keeps our team aligned. Collaborating has never felt this effortless."</blockquote>
                            <figcaption><span className="avatar avatar-2">MA</span><div><strong>Mike A.</strong><small>Product manager</small></div></figcaption>
                        </figure>
                        <figure className="testimonial-card">
                            <blockquote>"I love the weekly progress view — it honestly keeps me motivated to chip away at my goals."</blockquote>
                            <figcaption><span className="avatar avatar-3">JK</span><div><strong>Jenna K.</strong><small>Full-stack developer</small></div></figcaption>
                        </figure>
                    </div>
                </div>
            </section>

            {/* ── CTA ────────────────────────────────────── */}
            <section className="cta-section" id="pricing">
                <div className="cta-card">
                    <h2>Start moving forward, today.</h2>
                    <p>Join thousands of people who use stride to keep their work — and their day — under control.</p>
                    <div className="cta-actions">
                        <a href="/register" className="btn btn-white">Get started — it's free</a>
                        <a href="/login" className="btn btn-ghost">Log in</a>
                    </div>
                    <small>Free forever plan · No credit card required</small>
                </div>
            </section>

            {/* ── Footer ─────────────────────────────────── */}
            <footer className="landing-footer">
                <div className="footer-inner">
                    <div className="footer-brand">
                        <a href="#" className="nav-brand">
                            <span className="brand-mark">✓</span>
                            <span>stride</span>
                        </a>
                        <p>A personal task manager built for focus.</p>
                    </div>
                    <div className="footer-links">
                        <div className="footer-col">
                            <h4>Product</h4>
                            <a href="#features">Features</a>
                            <a href="#pricing">Pricing</a>
                            <a href="#how-it-works">How it works</a>
                        </div>
                        <div className="footer-col">
                            <h4>Resources</h4>
                            <a href="#">Blog</a>
                            <a href="#">Help center</a>
                            <a href="#">Changelog</a>
                        </div>
                        <div className="footer-col">
                            <h4>Company</h4>
                            <a href="#">About</a>
                            <a href="#">Careers</a>
                            <a href="#">Contact</a>
                        </div>
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>© {new Date().getFullYear()} stride. All rights reserved.</span>
                    <span className="footer-legal">
                        <a href="#">Privacy</a>
                        <a href="#">Terms</a>
                    </span>
                </div>
            </footer>
        </div>
    );
}

export default Homepage;