import { useOutletContext } from 'react-router-dom';

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
    <header>
      <h1>Welcome, {userData?.firstName}!</h1>
      <p>Email: {userData?.email}</p>
      <button onClick={logout}>Logout</button>
    </header>
  );
}