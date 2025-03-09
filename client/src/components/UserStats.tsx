import { EnergyFact } from './EnergyStats';

interface DashboardContext {
  userData: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  } | null;
  logout: () => void;
}

interface UserStatsProps {
  userData: { firstName: string } | null;
}

export default function UserStats(/*{ userData }: UserStatsProps*/) {
  return (
    <div className="userStatsContainer">
      <h1 className="userWelcome">Hi {/*userData?.firstName ||*/ "Guest"}!</h1>
      <h3 className="introducingStats">Your current household statistics:</h3>
      <div className="stats-container">
        <span className="stat"><span className="icon">🌡️</span> 21°C</span>
        <span className="stat"><span className="icon">💧</span> 18%</span>
        <span className="stat"><span className="icon">⭐</span> 12,000</span>
      </div>

      <div className="energy-fact-container">
        <span className="static-text">Energy Facts:</span>
        <EnergyFact />
      </div>
    </div>
  );
}
