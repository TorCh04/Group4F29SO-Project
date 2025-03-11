import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../assets/logo_vertical.svg';
import useSimulationData from './hooks/useSimulationData';

export default function Sidebar() {
  const navigate = useNavigate();
  const { humidity, temperature } = useSimulationData();
  const [isMenuOpen, setMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  function logout() {
    localStorage.removeItem('token');
    navigate('/');
  }

  function toggleMenu() {
    setMenuOpen(!isMenuOpen);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target as Node)) {
        closeMenu();
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div>
      {!isMenuOpen && (
        <button className="menu-button" onClick={toggleMenu}>
          ☰
        </button>
      )}
      {isMenuOpen && <div className="overlay" onClick={closeMenu}></div>}
      <div ref={sidebarRef} className={`sidebar__container ${isMenuOpen ? 'open' : ''}`} onClick={(e) => e.stopPropagation()}>
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
        <button className="sidebar__logout" onClick={logout}>Logout</button>
      </div>
    </div>
  );
}