import { Link } from "react-router-dom";
import hero__image from "../../assets/Hero.png";

export default function Hero() {
    return (
        <div className="hero__center">
            <div className="hero__container">
                <div className="hero__content">
                    <h1 className="title hero__title">Smart Control Panels, Tailored to Your Business</h1>
                    <p className="subtitle hero__subtitle">Monitor energy usage, automate workflows, and optimize device management—all in a centralized, customizable platform built for the modern business</p>
                    <div className="hero__button__container">
                        <Link to="/register" className="button hero__button">Register Now</Link>
                        <Link to="/login" className="button hero__button hero__button__alt">Login</Link>

                    </div>
                </div>
                <div className="hero__image">
                    <img src={hero__image} alt="Dashboard Preview" />
                </div>
            </div>
        </div>
    )
}
    