import { useState } from 'react';
import Roomba from '../../../assets/roomba.svg';
import LightSwitch from '../../../assets/light_switch.svg';
import Outlet from '../../../assets/outlet.svg';
import ToggleSwitch from './ToggleSwitch';

interface DeviceBlockProps {
  name: string;
  type: string;
  status: string;
  onToggleStatus: () => void;
}

const deviceImages: { [key: string]: string } = {
  'Roomba': Roomba,
  'Light Switch': LightSwitch,
  'Outlet': Outlet
};

export default function DeviceBlock({ name, type, status, onToggleStatus }: DeviceBlockProps) {
  const [isOn, setIsOn] = useState(status === 'Connected');

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggleStatus();
  };

  return (
    <div className={`device__block ${isOn ? 'device__block--on' : 'device__block--off'}`}>
      <img src={deviceImages[type]} alt={type} className="device__block__image" />
      <p className="device__block__text">{name}</p>
      <ToggleSwitch isOn={isOn} handleToggle={handleToggle} />
    </div>
  );
}