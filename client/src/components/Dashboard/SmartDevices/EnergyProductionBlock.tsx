import { useState } from 'react';
import SolarPanel from '../../../assets/solar_panel.svg';
import WindTurbine from '../../../assets/wind_turbine.svg';
import ToggleSwitch from './ToggleSwitch';

interface EnergyProductionBlockProps {
  name: string;
  type: string;
  status: string;
  onToggleStatus: () => void;
}

const energySourceImages: { [key: string]: string } = {
  'Solar Panel': SolarPanel,
  'Wind Turbine': WindTurbine
};

export default function EnergyProductionBlock({ name, type, status, onToggleStatus }: EnergyProductionBlockProps) {
  const [isOn, setIsOn] = useState(status === 'Connected');

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggleStatus();
  };

  return (
    <div className={`device__block ${isOn ? 'device__block--on' : 'device__block--off'}`}>
      <img src={energySourceImages[type]} alt={type} className="device__block__image" />
      <p className="device__block__text">{name}</p>
      <ToggleSwitch isOn={isOn} handleToggle={handleToggle} />
    </div>
  );
}