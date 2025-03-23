import { useState } from 'react';
import logo from "../../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, { email, password });
            if (response.status === 200) {
                // Store token in localStorage
                localStorage.setItem('token', response.data.token);
                navigate('/devices');
            }
        } catch (err) {
            setError('Invalid email or password');
            console.error('Login error:', err);
        }
    };  

    return (
        <div className="login__center">
            <div className="login__container">
                <div className="login__logo__container">
                    <img src={logo} alt="Moogle Logo" />
                    <h2 className="login__heading">Login</h2>
                </div>
                <div className="login__structure">
                    <form className="login__form__container" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="login__input"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        <div className="login__input__grouping">
                            <input 
                                type="password" 
                                placeholder="Password" 
                                className="login__input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <div className="login__extra__links">
                                <div className="login__remember__me">
                                    <label className="login__checkbox__label">
                                        <input type="checkbox" className="login__checkbox" />
                                        <span className="login__checkbox__custom"></span>
                                        Remember me
                                    </label>
                                </div>
                                <a href="/forgotPassword" className="login__forgot__password">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="login__submit__grouping">
                            <input type="submit" value="Login" className="login__button" />
                            {error && <p className="error__message">{error}</p>}
                            <p>Don't have an account? <a href="/register" className="register__link">Register here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}