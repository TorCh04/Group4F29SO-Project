import { useState } from 'react';
import SolarPanel from '../../../assets/solar_panel.svg';
import WindTurbine from '../../../assets/wind_turbine.svg';
import ToggleSwitch from './ToggleSwitch';
import Trash from '../../../assets/trash.svg';

interface EnergyProductionBlockProps {
  _id: string; // Add the device ID
  name: string;
  type: string;
  status: string;
  onToggleStatus: () => void;
  onRemove: (id: string) => void; // Add a callback for removal
}

const energySourceImages: { [key: string]: string } = {
  'Solar Panel': SolarPanel,
  'Wind Turbine': WindTurbine,
};

export default function EnergyProductionBlock({
  _id,
  name,
  type,
  status,
  onToggleStatus,
  onRemove,
}: EnergyProductionBlockProps) {
  const [isOn, setIsOn] = useState(status === 'Connected');

  const handleToggle = () => {
    setIsOn(!isOn);
    onToggleStatus();
  };

  const handleRemove = async () => {
    if (window.confirm(`Are you sure you want to remove "${name}"?`)) {
      onRemove(_id); // Call the parent callback to handle removal
    }
  };

  return (
    <div className={`device__block ${isOn ? 'device__block--on' : 'device__block--off'}`}>
      <img src={energySourceImages[type]} alt={type} className="device__block__image" />
      <p className="device__block__text">{name}</p>
      <div className="device__block__settings">
        <ToggleSwitch isOn={isOn} handleToggle={handleToggle} />
        <button className="device__block__remove" onClick={handleRemove}>
          <img src={Trash} alt="Remove" />
        </button>
      </div>
    </div>
  );
}