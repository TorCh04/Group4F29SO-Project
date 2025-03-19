import { useState } from 'react';
import logo from "../../assets/logo_vertical.svg";
import axios from 'axios';
// import { useNavigate } from 'react-router-dom';


interface SecurityQA {
    securityQuestion: string | '';
    securityAnswer: string | '';
  }


export default function ForgotPasswordForm() {
  
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        securityAnswer: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [success, setSuccess] = useState('');
    const [errors, setErrors] = useState({
                                                email: '',
                                                answer: '',
                                                password: '',
                                            });
    // const navigate = useNavigate();

    const [data, setData] = useState<SecurityQA>({ securityQuestion: '', securityAnswer: '' });
    const [step, setStep] = useState(1);



    const verifyEmail = async () => {
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
          { email: formData.email }
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

      

    const handleClick = async (e: React.FormEvent) => {
      e.preventDefault();
      // Checks if current password entered is correct
      const verifiedEmail = await verifyEmail();
      if (verifiedEmail)
      {
        setStep(2);
        await fetchSecurityQA();
        
        // setShowForm(!showForm);
      }

      if (!verifiedEmail)
      {
        setErrors(prevErrors => ({ ...prevErrors, email: 'Email not recognised!' }))
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
      

    const verifyAnswer = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.securityAnswer !== data.securityAnswer) 
        {
          setErrors(prevErrors => ({ ...prevErrors, answer: 'Answer is incorrect' }))
        }

        else {
          console.log("Right")
          setStep(3);
        }
        
      };
    

      const updatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        // Reset success message
        setErrors(prevErrors => ({ ...prevErrors, password: '' }));
        // Checks if new password and confirm password match
        if (formData.newPassword !== formData.confirmPassword) {
            console.log("Passwords do not match");
            setErrors(prevErrors => ({ ...prevErrors, password: 'Passwords do not match' }));
            return;
            } 

        // Checks if either newPassword or confirmPassword is the same as current password
        // if (curPassword === newPassword || curPassword == confirmPassword) {
        //     setErrors(prevErrors => ({ ...prevErrors, samePassword: 'New password cannot be the same as current password' }));
        //     return;
        // }

        // Checks if either newPassword or confirmPassword is empty
        // if (curPassword && (newPassword == '' || confirmPassword == '')) 
        //     {
        //         setErrors(prevErrors => ({ ...prevErrors, newPassword: 'No new password entered' }));
        //         return;
        //     } 

        console.log('Sending update password request...');

        try {
            // Get token from local storage
            // Make a POST request to update the password
            const response = await axios.post(
            'http://localhost:8080/resetPassword', 
            { password: formData.confirmPassword, email: formData.email },
        );     
        console.log('Response reached');
        console.log(response.data);
        setSuccess("Password updated successfully!");
        } catch (error) {
            // If there's an error, log it
            console.error("Error updating password:", error);
        } 
    };


      console.log("Email:" + formData.email);
      console.log("Answer:" + formData.securityAnswer);
      console.log("Newp :" + formData.newPassword);
      console.log("Conp:" + formData.confirmPassword);
      

    return (
        <div className="password__center">
          <div className="password__container" id="register__container__override">
              <div className="password__logo__container">
                  <img src={logo} alt="Moogle Logo" />
              </div>
              <h2 className="login__heading">Password Reset</h2>
              {step === 1 && (
                
                <div className="password__container" >
                
                <h3 className="password__subheading">Please Enter your account Email</h3>
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
              </div>
              )}
              
              
              {/* <button onClick={handleClick} className="password__button">Show Form</button> */}
              {/* <button onClick={fetchSecurityQA} className="password__button">Get QA</button> */}

              {step === 2 && (
                <div className="" >
                  <h3 className="password__subheading">{data.securityQuestion}</h3>
                    <form className="password__form__container" onSubmit={verifyAnswer}>
                        <input 
                            type="text" 
                            placeholder="Enter Answer" 
                            className="password__input"
                            value={formData.securityAnswer}
                            onChange={(e) => setFormData({...formData, securityAnswer: e.target.value})}
                            required
                        />
                        {errors && <p className="error__message">{errors.answer}</p>}
                        <input type="submit" value="Submit Answer" className="password__submit__button" />
                    </form>
                </div>
              )}
              
              
              {step === 3 && (
                <div className="">
                <h2 className="password__subheading">Reset Your Password</h2>
                  <form className="password__form__container" onSubmit={updatePassword}>
                  <input
                            type="password"
                            placeholder="New Password"
                            className="password__input"
                            value={formData.newPassword}
                            onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
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
                        {errors && <p className="error__message">{errors.password}</p>}
                        {success && <p className="success__message">{success}</p>}
                        <input type="submit" value="Submit" className="password__submit__button" />
                      <div className="password__submit__grouping">
                          {/* {errors && <p className="error__message">{errors.email}</p>} */}
                          <p>Back to Login <a href="/login" className="register__link">Login here</a></p>
                      </div>
                  </form>
              </div>
              )}
              
          </div>
        </div>


    )
  
}