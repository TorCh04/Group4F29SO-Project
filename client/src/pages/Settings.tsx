import { useOutletContext } from 'react-router-dom';
import logo from '../assets/logo_vertical.svg';
import UpdateProfileForm from '../components/UpdateProfileForm';
import UpdatePassword from '../components/UpdatePassword';
import  '../pages/styles/Settings.css';


interface DashboardContext {
  userData: {
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  logout: () => void;
}

export default function Settings() {
  const { userData, logout } = useOutletContext<DashboardContext>();

  return (
  <>
    <UpdateProfileForm />
    <UpdatePassword/>
    <header>
      <h1>Welcome, {userData?.firstName}!</h1>
      <p>Email: {userData?.email}</p>
      <button onClick={logout}>Logout</button>
      <img src={logo} alt="Moogle Logo" />
    </header>
    </>
    
  );
}