import { useState } from 'react';
import Roomba from '../../../assets/outlet.svg';
import LightSwitch from '../../../assets/roomba.svg';
import Outlet from '../../../assets/light_switch.svg';
import ToggleSwitch from './ToggleSwitch';

interface EnergyProductionBlockProps {
  name: string;
  type: string;
  status: string;
  onToggleStatus: () => void;
}

const energySourceImages: { [key: string]: string } = {
  'Roomba': Roomba,
  'Light Switch': LightSwitch,
  'Outlet': Outlet
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