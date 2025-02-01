import { Link } from "react-router-dom";
import logo from "../assets/logo_horizontal.svg";

export default function Header() {
    return (
        <header className="homepage__navbar">
            <div className="homepage__navbar__container">
                <Link to="/">
                    <img src={logo} className="logo" alt="Moogle Logo" />
                </Link>
            </div>
        </header>
    );
}