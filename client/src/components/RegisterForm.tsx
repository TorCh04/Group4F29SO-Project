import { useState } from 'react';
import logo from "../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegisterForm() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/register', formData);
            if (response.status === 201) {
                navigate('/login');
            }
        } catch (err) {
            setError('Registration failed - please check your details');
            console.error('Registration error:', err);
        }
    };

    return (
        <div className="login__center">
            <div className="login__container" id="register__container__override">
                <div className="login__logo__container">
                    <img src={logo} alt="Moogle Logo" />
                    <h2 className="login__heading">Register</h2>
                </div>
                <div className="login__structure">
                    <form className="login__form__container" id="register__form__override" onSubmit={handleSubmit}>
                        <input 
                            type="email" 
                            placeholder="Email" 
                            className="login__input"
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder="First" 
                            className="login__input"
                            value={formData.firstName}
                            onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder="Last" 
                            className="login__input"
                            value={formData.lastName}
                            onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            className="login__input"
                            value={formData.password}
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
                            required
                        />
                        <input 
                            type="password" 
                            placeholder="Confirm Password" 
                            className="login__input"
                            value={formData.confirmPassword}
                            onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                            required
                        />
                        <div className="login__submit__grouping">
                            <input type="submit" value="Register" className="login__button" />
                            {error && <p className="error__message">{error}</p>}
                            <p>Already have an account? <a href="/login" className="register__link">Login here</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}