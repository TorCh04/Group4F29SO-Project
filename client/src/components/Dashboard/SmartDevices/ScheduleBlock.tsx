import { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import { Instruction, Device } from '../../../types';

interface ScheduleBlockProps {
  name: string;
  status: string;
  device: Device;
  instructions: Instruction[];
  onToggleStatus: () => void;
}

export default function ScheduleBlock({ name, status, device, instructions, onToggleStatus }: ScheduleBlockProps) {
  const [isActive, setIsActive] = useState(status === 'Active');

  const handleToggle = () => {
    setIsActive(!isActive);
    onToggleStatus();
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
      
      <ToggleSwitch isOn={isActive} handleToggle={handleToggle} />
    </div>
  );
}