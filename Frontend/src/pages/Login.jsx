import { useState } from 'react';
import { useLocation } from 'react-router-dom';
// import authService, { loginUser } from '../services/authService';
import * as authService from '../services/authService';
import '../styles/Login.css';

function Login() {
    const location = useLocation();
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(location.pathname !== '/register');
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [registerPassword, setRegisterPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await authService.login(usernameOrEmail, password);
            console.log('Login successful:', response);
            // Redirect to dashboard or home page
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
            console.error('Login error:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (registerPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);

        try {
            await authService.register(username, email, registerPassword);
            const response = await authService.login(username, registerPassword);
            console.log('Registration successful:', response);
            window.location.href = '/dashboard';
        } catch (err) {
            setError(err.message);
            console.error('Registration error:', err);
        } finally {
            setLoading(false);
        }
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setError('');
        setUsernameOrEmail('');
        setPassword('');
        setUsername('');
        setEmail('');
        setRegisterPassword('');
        setConfirmPassword('');
    };

    return (

        <div className="login-container">
            <div className="login-card">
                <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>

                {error && <div className="error-message">{error}</div>}

                {isLogin ? (
                    <form onSubmit={handleLogin}>
                        <div className="form-group">
                            <label htmlFor="usernameOrEmail">Email or Username</label>
                            <input
                                id="usernameOrEmail"
                                type="text"
                                value={usernameOrEmail}
                                onChange={(e) => setUsernameOrEmail(e.target.value)}
                                placeholder="Enter your email or username"
                                required
                                disabled={loading}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                required
                                disabled={loading}
                            />
                        </div>

                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                ) : (
                    <form onSubmit={handleRegister}>
                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Choose a username"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerEmail">Email</label>
                            <input
                                id="registerEmail"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="registerPassword">Password</label>
                            <input
                                id="registerPassword"
                                type="password"
                                value={registerPassword}
                                onChange={(e) => setRegisterPassword(e.target.value)}
                                placeholder="Create a password"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">Confirm Password</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Confirm your password"
                                required
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Sign Up
                        </button>
                    </form>
                )}
                    

                <p className="toggle-mode">
                    {isLogin ? "Don't have an account? " : 'Already have an account? '}
                    <button type="button" onClick={toggleMode} className="toggle-btn">
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </p>
            </div>
        </div>
    );
}

export default Login;