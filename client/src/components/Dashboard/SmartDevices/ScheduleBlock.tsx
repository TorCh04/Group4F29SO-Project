import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { Instruction, Device } from '../../../types';
import Trash from '../../../assets/trash.svg';

interface ScheduleBlockProps {
  name: string;
  status: string;
  device: Device;
  instructions: Instruction[];
  onToggleStatus: () => void;
  onRemove: () => void; // Add a callback for removal
}

export default function ScheduleBlock({ name, status, device, instructions, onToggleStatus, onRemove }: ScheduleBlockProps) {
  const [isActive, setIsActive] = useState(status === 'Active');

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggleStatus();
  };

  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete the schedule "${name}"?`)) {
      onRemove(); // Call the parent callback to handle removal
    }
  };

  return (
    <div className={`device__block ${isActive ? 'schedule__block--on' : 'schedule__block--off'}`}>
      <p className="device__block__text">{name}</p>

      <div className="schedule__table">
        <p className="schedule__table__header">{device.name}</p>

        {instructions.length > 0 && (
          <div className="instructions__list">
            {instructions.map((instruction, index) => (
              <p key={index} className="instructions__list__item">
                {instruction.action} at {instruction.hour}:{instruction.minute.toString().padStart(2, '0')}
              </p>
            ))}
          </div>
        )}
      </div>

      <div className="device__block__settings">
        <ToggleSwitch isOn={isActive} handleToggle={handleToggle} />
        <button className="device__block__remove" onClick={handleRemove}>
          <img src={Trash} alt="Remove" />
        </button>
      </div>
    </div>
  );
}