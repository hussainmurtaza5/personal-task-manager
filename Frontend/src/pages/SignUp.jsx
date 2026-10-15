import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as authService from '../services/authService';
import '../styles/auth.css';

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!terms) {
            setError('Please agree to the Terms of Service and Privacy Policy');
            return;
        }

        setLoading(true);

        try {
            await authService.register(username, email, password);
            await authService.login(username, password);
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

                <h1 id="auth-heading">Create your account</h1>
                <p className="subtitle">Join Stride and organize your tasks in one calm workspace</p>

                {error && (
                    <div className="auth-error" role="alert">
                        {error}
                    </div>
                )}

                <form onSubmit={handleRegister} className="auth-form">
                    <div className="auth-field">
                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            type="text"
                            autoComplete="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Choose a username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>
                        <input
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="you@company.com"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Create a password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="confirmPassword">Confirm password</label>
                        <input
                            id="confirmPassword"
                            type="password"
                            autoComplete="new-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="Confirm your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="auth-terms">
                        <input
                            id="terms"
                            type="checkbox"
                            checked={terms}
                            onChange={(e) => setTerms(e.target.checked)}
                            required
                            disabled={loading}
                        />
                        <label htmlFor="terms" className="cursor-pointer select-none">
                            I agree to the{' '}
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" target="_blank" rel="noopener noreferrer">
                                Privacy Policy
                            </a>
                        </label>
                    </div>

                    <button type="submit" className="auth-btn" disabled={loading}>
                        {loading ? (
                            <>
                                <span className="spinner spinner-inverse" aria-hidden="true" />
                                Creating account…
                            </>
                        ) : (
                            'Create account'
                        )}
                    </button>
                </form>

                <p className="auth-footer">
                    Already have an account?{' '}
                    <Link to="/login">Sign in</Link>
                </p>
            </div>
        </div>
    );
}

export default SignUp;
