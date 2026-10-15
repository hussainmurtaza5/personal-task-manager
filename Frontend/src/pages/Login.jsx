import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService';
import '../styles/auth.css';

function Login() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await authService.login(usernameOrEmail, password);
            // Keep the spinner visible until the browser navigates away.
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <div className="auth-page" aria-labelledby="auth-heading">
            <div className="auth-card">
                <div className="auth-brand">
                    <span className="mark" aria-hidden="true">
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <path d="m5 13 4 4L19 7" />
                        </svg>
                    </span>
                    <span className="wordmark">stride</span>
                </div>

                <h1 id="auth-heading">Welcome back</h1>
                <p className="subtitle">Sign in to your Stride workspace</p>

                {error && (
                    <div className="auth-error" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="usernameOrEmail">Email or username</label>
                        <input
                            id="usernameOrEmail"
                            type="text"
                            autoComplete="username"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <div className="field-actions">
                            <label htmlFor="password">Password</label>
                            <a href="#" className="auth-hint">
                                Forgot password?
                            </a>
                        </div>
                        <input
                            id="password"
                            type="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner spinner-inverse" aria-hidden="true" />
                                Signing in…
                            </>
                        ) : (
                            'Sign in'
                        )}
                    </button>
                </form>

                <div className="auth-divider">or continue with</div>

                <div className="auth-social">
                    <button type="button" className="social-btn" disabled={loading}>
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09Z" />
                        </svg>
                        <span>Google</span>
                    </button>
                    <button type="button" className="social-btn" disabled={loading}>
                        <svg
                            viewBox="0 0 24 24"
                            className="h-5 w-5"
                            fill="currentColor"
                            aria-hidden="true"
                        >
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.301 3.495.998.108-.776.417-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.296c0-6.627-5.373-12-12-12Z" />
                        </svg>
                        <span>GitHub</span>
                    </button>
                </div>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <Link to="/register">Create one</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
