import { useState } from 'react';
import logo from "../../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';





export default function ForgotPasswordForm() {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const [showForm, setShowForm] = useState(true);


    const handleClick = () => {
      setShowForm(!showForm);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match');
          return;
        }
      
        try {
          const registerResponse = await axios.post('http://localhost:8080/register', formData);
          if (registerResponse.status === 201) {
            // Registration succeeded. Now attempt auto-login.
            try {
              const loginResponse = await axios.post('http://localhost:8080/login', {
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
          setError('Registration failed - please check your details');
          console.error('Registration error:', registerError);
        }
      };

    return (
        <div className="password__center">
          <div className="password__container" id="register__container__override">
              <div className="password__logo__container">
                  <img src={logo} alt="Moogle Logo" />
                  <h2 className="password__heading">Forgot Password</h2>
              </div>
              <div>
                <form className="password__form__container" onSubmit={handleSubmit}>
                      <input 
                          type="password" 
                          placeholder="Password" 
                          className="password__input"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                      />
                </form>
              </div>
              
              <div className="" style={{ display: showForm ? 'block' : 'none' }}>
                <button onClick={handleClick} className="password__button">Show Form</button>
                  <form className="password__form__container" onSubmit={handleSubmit}>
                      <input 
                          type="password" 
                          placeholder="Password" 
                          className="password__input"
                          value={formData.password}
                          onChange={(e) => setFormData({...formData, password: e.target.value})}
                          required
                      />
                      <input 
                          type="password" 
                          placeholder="Confirm Password" 
                          className="password__input"
                          value={formData.confirmPassword}
                          onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                          required
                      />
                      <div className="password__submit__grouping">
                          <input type="submit" value="Register" className="password__submit__button" />
                          {error && <p className="error__message">{error}</p>}
                          <p>Already have an account? <a href="/login" className="register__link">Login here</a></p>
                      </div>
                  </form>
              </div>
          </div>
        </div>


    )
}