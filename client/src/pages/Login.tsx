import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import LoginForm from '../components/LoginForm';
import './styles/Login.css';

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/devices');
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <LoginForm />
    </>
  );
}