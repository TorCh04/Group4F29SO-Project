import { EnergyFact } from './EnergyStats';
import useSimulationData from './Dashboard/hooks/useSimulationData';
import { useOutletContext } from 'react-router-dom';

interface ProfileContext {
  userData: {
      id: string;
      email: string;
      firstName: string;
      lastName: string;
      password: string;
  } | null;
}

export default function UserStats(/*{ userData }: UserStatsProps*/) {
  // Use the hook inside the component
  const { humidity, temperature } = useSimulationData();
  const {userData } = useOutletContext<ProfileContext>();

  return (
    <div className="userStatsContainer">
      <h1 className="userWelcome">Hi {userData?.firstName}!</h1>
      <h3 className="introducingStats">Your current household statistics:</h3>
      <div className="stats-container">
        <span className="stat">
          <span className="icon">🌡️</span>{temperature !== null ? temperature : 'Loading...'}°C
        </span>
        <span className="stat">
          <span className="icon">💧</span>{humidity !== null ? humidity : 'Loading...'}%
        </span>
        <span className="stat">
          <span className="icon"> ⭐</span>1,200
        </span>
      </div>

      <div className="energy-fact-container">
        <span className="static-text">Energy Facts:</span>
        <EnergyFact />
      </div>
    </div>
  );
}
