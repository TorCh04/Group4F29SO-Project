import { EnergyFact } from './EnergyStats';
import useSimulationData from './Dashboard/hooks/useSimulationData';

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
  // Use the hook inside the component
  const { humidity, temperature } = useSimulationData();

  return (
    <div className="userStatsContainer">
      <h1 className="userWelcome">Hi {/*userData?.firstName ||*/ "Guest"}!</h1>
      <h3 className="introducingStats">Your current household statistics:</h3>
      <div className="stats-container">
        <span className="stat">
          <span className="icon">🌡️</span>{temperature !== null ? temperature : 'Loading...'}°C
        </span>
        <span className="stat">
          <span className="icon">💧</span>{humidity !== null ? humidity : 'Loading...'}%
        </span>
        <span className="stat">
          <span className="icon"> ⭐</span>12,000
        </span>
      </div>

      <div className="energy-fact-container">
        <span className="static-text">Energy Facts:</span>
        <EnergyFact />
      </div>
    </div>
  );
}
