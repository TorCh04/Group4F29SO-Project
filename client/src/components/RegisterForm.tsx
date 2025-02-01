import { Link } from "react-router-dom";
import logo from "../assets/logo_vertical.svg";

export default function RegisterForm() {
    return (
        <div className="login__center">
            <div className="login__container" id="register__container__override">
                {/* <!-- Logo --> */}
                <div className="login__logo__container">
                    <img src={logo} alt="Moogle Logo" />
                    <h2 className="login__heading">Register</h2>
                </div>
                {/* <!-- Login Form --> */}
                <div className="login__structure">
                    <form className="login__form__container" id="register__form__override">
                        {/* <!-- Main Inputs --> */}
                        <input type="text" placeholder="Email" className="login__input" />
                        <input type="text" placeholder="First" className="login__input" />
                        <input type="text" placeholder="Last" className="login__input" />
                        <input type="text" placeholder="Address" className="login__input" />
                        <input type="text" placeholder="Postcode" className="login__input" />
                        <input type="text" placeholder="Password" className="login__input" />
                        <input type="text" placeholder="Confirm Password" className="login__input" />
                        <div className="login__submit__grouping">
                            {/* <!-- Submit Button --> */}
                            <input type="submit" value="Register" className="login__button" />
                            {/* <!-- Login Link (SPA Navigation) --> */}
                            <p>Already have an account? <Link to="/login" className="register__link">Login here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}