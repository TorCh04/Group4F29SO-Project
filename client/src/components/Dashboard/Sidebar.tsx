import { Link } from 'react-router-dom';
import logo from '../assets/logo_vertical.svg';

export default function Sidebar() {
  return (
    <div className="sidebar__container">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
        <div className="sidebar__links">
          <Link to="/devices" className="sidebar__item">Smart Devices</Link>
          <Link to="/energy" className="sidebar__item">Energy Tracker</Link>
          <Link to="/leaderboard" className="sidebar__item">Leaderboard</Link>
          <Link to="/settings" className="sidebar__settings">Settings</Link>
        </div>
    </div>

  );
}