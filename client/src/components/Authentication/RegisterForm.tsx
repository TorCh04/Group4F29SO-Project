import { useState } from 'react';
import logo from "../../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const securityQ = [
  'What was the name of your first pet',
  'What is the middle name of your oldest sibling',
  'What was the make and model of your first car',
  'What is the name of the street you grew up on',
  'What was the name of your favorite childhood teacher',
  'What was the first concert you attended',
  'What is the name of your favorite childhood toy',
  'What is the title of the first book you ever read',
  'What was the name of your first best friend',
  'What is the name of the town where your parents met'
];


function handleAxiosError(error: unknown): string {
  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || 'An error occurred';
  }
  return 'An unexpected error occurred';
}





export default function RegisterForm() {
  const [formData, setFormData] = useState({
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      confirmPassword: '',
      securityQuestion: '',
      securityAnswer: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setError('');
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match');
        return;
      }
    
      try {
        const registerResponse = await axios.post(`${API_BASE_URL}/register`, formData);
        if (registerResponse.status === 201) {
          // Registration succeeded. Now attempt auto-login.
          try {
            const loginResponse = await axios.post(`${API_BASE_URL}/login`, {
              email: formData.email,
              password: formData.password
            });
            if (loginResponse.status === 200) {
              // Store token and navigate to dashboard
              localStorage.setItem('token', loginResponse.data.token);
              navigate('/devices');
            }
          } catch (loginError) {
            setError('Auto-login failed. Please try logging in manually.');
            console.error('Login error:', loginError);
          }
        }
      } catch (registerError) {
          setError(handleAxiosError(registerError));
          console.error('Registration error:', registerError);
      }
      
    };


    // Solely for Testing
    console.log("Security Question:",formData.securityQuestion);
    console.log("Security Answer:",formData.securityAnswer);
  // console.log("Updating Name:", firstName);
  // console.log("Updating Email:", email);
  // console.log("Updating Password:", curPassword);
  // console.log("Updating New Password:", newPassword);
  // console.log("Updating Confirm Password:", confirmPassword);
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
            <select aria-label="Select an option" className='login__input' 
            value={formData.securityQuestion} 
            onChange={(e) => setFormData({...formData, securityQuestion: e.target.value})}>
            <option value="" selected disabled>Please choose a security question</option>
            {securityQ.map((question, index) => (
              <option key={index} value={question}>{question}</option>
            ))}
            </select>  
            <input 
              type="text" 
              placeholder="Answer" 
              className="login__input"
              value={formData.securityAnswer}
              onChange={(e) => setFormData({...formData, securityAnswer: e.target.value})}
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