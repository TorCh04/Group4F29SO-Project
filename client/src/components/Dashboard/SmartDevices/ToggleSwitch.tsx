import React from 'react';

interface ToggleSwitchProps {
  isOn: boolean;
  handleToggle: () => void;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ isOn, handleToggle }) => {
  return (
    <div className={`toggle__switch ${isOn ? 'toggle__switch--on' : 'toggle__switch--off'}`} onClick={handleToggle}>
      <div className="toggle__switch__slider"></div>
    </div>
  );
};

export default ToggleSwitch;