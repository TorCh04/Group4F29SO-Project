import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_vertical.svg';
import useSimulationData from './hooks/useSimulationData';

export default function Sidebar() {
  const navigate = useNavigate();
  const { humidity, temperature } = useSimulationData();

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

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
      <div className="sidebar__simulation-data">
      <p>🌡️ {temperature !== null ? temperature : 'Loading...'}°C</p>
        <p>💧 {humidity !== null ? humidity : 'Loading...'}%</p>
      </div>
      <button onClick={logout}>Logout</button>
    </div>
  );
}