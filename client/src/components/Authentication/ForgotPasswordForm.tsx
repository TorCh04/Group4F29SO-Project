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


   

    
    const handleResetPassword = async () => {
        try {
            const response = await axios.post('http://localhost:8080/resetPassword', { email: formData.email });
            if (response.status === 200) {
                setError('Password reset email sent');
            }
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setError('Failed to send password reset email');
        }
    };


    const verifyEmail = async (email: string) => {
            // Resets Error and Success Messages
            console.log('Sending update email request...');
            // Checks if email is provided
            if (!formData.email) 
            {
                return;
            }
            // Checks if emails match
            
            try {
                // Get token from local storage
                const token = localStorage.getItem('token');
                // Make a POST request to update email
                const response = await axios.post(
                'http://localhost:8080/verifyEmail', 
                { email: formData.email },  
                { headers: { Authorization: `Bearer ${token}` } } 
            );     
    
            if (response.status === 201) {
                console.log("email verified!");
                return true;
            }

            else {
                console.log('email not verified');
                return false;
            }
          }
          catch (error) {
            console.error('Error updating email:', error);
    
          }
          };

      const handleClick = async () => {
        // Checks if current password entered is correct
        const verifiedEmail = await verifyEmail(formData.email);
        if (verifiedEmail)
        {
          setShowForm(!showForm);
        }
        
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


      console.log("Email:" + formData.email);

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
                          type="text" 
                          placeholder="Please Enter Your Email" 
                          className="password__input"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                      />
                </form>
              </div>
              
              <button onClick={handleClick} className="password__button">Show Form</button>
              <div className="" style={{ display: showForm ? 'block' : 'none' }}>
                
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