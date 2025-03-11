import { useState } from 'react';
import logo from "../../assets/logo_vertical.svg";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


interface SecurityQA {
    securityQuestion: string | '';
    securityAnswer: string | '';
  }


export default function ForgotPasswordForm() {
  
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        securityAnswer: ''
    });
    const [errors, setErrors] = useState({
                                                email: '',
                                                answer: '',
                                            });
    const navigate = useNavigate();

    const [data, setData] = useState<SecurityQA>({ securityQuestion: '', securityAnswer: '' });
    const [step, setStep] = useState(1);
    
    const [showForm, setShowForm] = useState(true);



    
    // const handleResetPassword = async () => {
    //     try {
    //         const response = await axios.post('http://localhost:8080/resetPassword', { email: formData.email });
    //         if (response.status === 200) {
    //           setErrors(prevErrors => ({ ...prevErrors, name: 'A name is required' })'Password reset email sent');
    //         }
    //     } catch (error) {
    //         console.error('Error sending password reset email:', error);
    //         setErrors("Failed to send password reset email");
    //     }
    // };


    const verifyEmail = async (email: string) => {
            setErrors(prevErrors => ({ ...prevErrors, email: '' }))
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
                // Make a POST request to update email
                const response = await axios.post(
                'http://localhost:8080/verifyEmail', 
                { email: formData.email },  
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

      const verifyAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.securityAnswer !== data.securityAnswer) 
        {
          console.log("WRong")
        }

        else {
          console.log("Right")
          setStep(3);
        }
        
      };

      const handleClick = async (e: React.FormEvent) => {
        e.preventDefault();
        // Checks if current password entered is correct
        const verifiedEmail = await verifyEmail(formData.email);
        if (verifiedEmail)
        {
          setStep(2);
          await fetchSecurityQA();
          
          // setShowForm(!showForm);
        }

        if (!verifiedEmail)
        {
          setErrors(prevErrors => ({ ...prevErrors, email: 'Incorrect Email!' }))
        }
      };


      const fetchSecurityQA = async () => {
        try {
          const response = await axios.get('http://localhost:8080/getSecurityQA', {
            params: {
              email: formData.email
            }
          });
          console.log('Fetched security questions:', response.data);
          if (response.status === 200) {
            setData(response.data);
          } else {
            // console.error('Error fetching simulation data:', result.message);
          }
        } catch (error) {
          console.error('Error fetching simulation data:', error);
        }
      };
    
    // const handleSubmit = async (e: React.FormEvent) => {
    //     e.preventDefault();
    //     if (formData.password !== formData.confirmPassword) {
    //       setError('Passwords do not match');
    //       return;
    //     }
      
    //     try {
    //       const registerResponse = await axios.post('http://localhost:8080/register', formData);
    //       if (registerResponse.status === 201) {
    //         // Registration succeeded. Now attempt auto-login.
    //         try {
    //           const loginResponse = await axios.post('http://localhost:8080/login', {
    //             email: formData.email,
    //             password: formData.password
    //           });
    //           if (loginResponse.status === 200) {
    //             // Store token and navigate to dashboard
    //             localStorage.setItem('token', loginResponse.data.token);
    //             navigate('/devices');
    //           }
    //         } catch (loginError) {
    //           setError('Auto-login failed. Please try logging in manually.');
    //           console.error('Login error:', loginError);
    //         }
    //       }
    //     } catch (registerError) {
    //       setError('Registration failed - please check your details');
    //       console.error('Registration error:', registerError);
    //     }
    //   };


      console.log("Email:" + formData.email);
      console.log("Answer:" + formData.securityAnswer);

    return (
        <div className="password__center">
          <div className="password__container" id="register__container__override">
              <div className="password__logo__container">
                  <img src={logo} alt="Moogle Logo" />
                  <h2 className="password__heading">Forgot Password</h2>
              </div>
              {step === 1 && (
                <div className="" >
                <form className="password__form__container" onSubmit={handleClick}>
                      <input 
                          type="text" 
                          placeholder="Please Enter Your Email" 
                          className="password__input"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          required
                      />
                      {errors && <p className="error__message">{errors.email}</p>}
                      <input type="submit" value="Submit Email" className="password__submit__button" />
                </form>
                {errors && <p className="error__message">{errors.email}</p>}
              </div>
              )}
              
              
              {/* <button onClick={handleClick} className="password__button">Show Form</button> */}
              {/* <button onClick={fetchSecurityQA} className="password__button">Get QA</button> */}

              {step === 2 && (
                <div className="" >
                  <h2 className="password__heading">Security Question: {data.securityQuestion}</h2>
                    <form className="password__form__container" onSubmit={verifyAnswer}>
                        <input 
                            type="text" 
                            placeholder="Enter Answer" 
                            className="password__input"
                            value={formData.securityAnswer}
                            onChange={(e) => setFormData({...formData, securityAnswer: e.target.value})}
                            required
                        />
                        <input type="submit" value="Submit Answer" className="password__submit__button" />
                        <div className="password__submit__grouping">
                            
                            {/* {errors && <p className="error__message">{errors.email}</p>} */}
                            <p>Already have an account? <a href="/login" className="register__link">Login here</a></p>
                        </div>
                    </form>
                </div>
              )}
              
              
              {step === 3 && (
                <div className="" style={{ display: showForm ? 'none' : 'block' }}>
                <h2 className="password__heading">Security Question: {data.securityQuestion}</h2>
                  <form className="password__form__container" onSubmit={verifyAnswer}>
                      <input 
                          type="text" 
                          placeholder="Enter Answer" 
                          className="password__input"
                          value={formData.securityAnswer}
                          onChange={(e) => setFormData({...formData, securityAnswer: e.target.value})}
                          required
                      />
                      <input type="submit" value="Submit Answer" className="password__submit__button" />
                      <div className="password__submit__grouping">
                          
                          {/* {errors && <p className="error__message">{errors.email}</p>} */}
                          <p>Already have an account? <a href="/login" className="register__link">Login here</a></p>
                      </div>
                  </form>
              </div>
              )}
              
          </div>
        </div>


    )
  
}