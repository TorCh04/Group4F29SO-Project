import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/Header';

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
    const fetchDashboardData = async () => {
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

    fetchDashboardData();
}, [navigate]);

if (error) return <div>{error}</div>;

// Logout function
const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
};

  return (
    <>
      <Header />
      <h1>Welcome, {userData?.firstName}!</h1>
      <p>Email: {userData?.email}</p>
      <button onClick={handleLogout}>Logout</button>
    </>
  );
}