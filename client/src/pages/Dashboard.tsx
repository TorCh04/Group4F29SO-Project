import { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar from '../components/Dashboard/Sidebar';
import './styles/Dashboard.css';

interface User {
  email: string;
  firstName: string;
  lastName: string;
}

export default function Dashboard() {
  const [userData, setUserData] = useState<User | null>(null);
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8080/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setUserData(response.data.userData);
      } catch (err) {
        console.error("Failed to fetch dashboard data:", err);
        setError('Failed to fetch dashboard data. Please log in again.');
        localStorage.removeItem('token');
        navigate('/login');
      }
    };

    fetchUserData();
  }, [navigate]);

  if (error) return <div>{error}</div>;

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className="dashboard__structure">
      <Sidebar />
      <div className="dashboard__content">
        {/* Pass userData and logout to nested routes */}
        <Outlet context={{ userData, logout }} />
      </div>
    </div>
  );
}