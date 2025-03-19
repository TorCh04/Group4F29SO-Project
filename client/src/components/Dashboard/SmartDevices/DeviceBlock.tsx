import { useState } from 'react';
import Roomba from '../../../assets/roomba.svg';
import LightSwitch from '../../../assets/light_switch.svg';
import Outlet from '../../../assets/outlet.svg';
import ToggleSwitch from './ToggleSwitch';
import Trash from '../../../assets/trash.svg';

interface DeviceBlockProps {
  _id: string; // Add the device ID
  name: string;
  type: string;
  status: string;
  onToggleStatus: () => void;
  onRemove: (id: string) => void; // Add a callback for removal
}

const deviceImages: { [key: string]: string } = {
  'Roomba': Roomba,
  'Light Switch': LightSwitch,
  'Outlet': Outlet,
};

export default function DeviceBlock({ _id, name, type, status, onToggleStatus, onRemove }: DeviceBlockProps) {
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
      <img src={deviceImages[type]} alt={type} className="device__block__image" />
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