import { Link } from 'react-router-dom';

export default function Sidebar() {
  return (
    <nav className="sidebar">
      <ul>
        <li><Link to="/">Logo Link</Link></li>
        <li><Link to="/devices">Smart Devices</Link></li>
        <li><Link to="/energy">Energy Tracker</Link></li>
        <li><Link to="/leaderboard">Leaderboard</Link></li>
        <li><Link to="/settings">Settings</Link></li>
      </ul>
    </nav>
  );
}