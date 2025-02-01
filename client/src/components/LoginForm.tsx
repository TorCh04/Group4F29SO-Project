import { Link } from "react-router-dom";
import logo from "../assets/logo_vertical.svg";

export default function LoginForm() {
    return (
        // <!-- LOGIN CONTENT -->
        <div className="login__center">
            <div className="login__container">
                {/* <!-- Logo --> */}
                <div className="login__logo__container">
                    <img src={logo} alt="Moogle Logo" />
                    <h2 className="login__heading">Login</h2>
                </div>
                {/* <!-- Login Form --> */}
                <div className="login__structure">
                    <form className="login__form__container">
                        {/* <!-- Main Inputs --> */}
                        <input type="text" placeholder="Email" className="login__input" />
                        <div className="login__input__grouping">
                            <input type="text" placeholder="Password" className="login__input" />
                            {/* <!-- Extra Links --> */}
                            <div className="login__extra__links">
                                {/* <!-- Remember Me Checkbox --> */}
                                <div className="login__remember__me">
                                    <label className="login__checkbox__label">
                                        <input type="checkbox" className="login__checkbox" />
                                        <span className="login__checkbox__custom"></span>
                                        Remember me
                                    </label>
                                </div>
                                {/* <!-- Forgot Password --> */}
                                <a href="#" className="login__forgot__password">Forgot Password?</a>
                            </div>
                        </div>
                        <div className="login__submit__grouping">
                            {/* <!-- Submit Button --> */}
                            <input type="submit" value="Login" className="login__button" />
                            {/* <!-- Register Link --> */}
                            <p>Don't have an account? <Link to="/register" className="register__link">Register here</Link></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}