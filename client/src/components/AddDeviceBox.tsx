import React, { useState } from 'react';
import plusIcon from '../assets/plus.svg';
import '../App.css';

interface AddDeviceBoxProps {
    predefinedDevices: string[];
    onAddDevice: (deviceName: string) => void;
}

export default function AddDeviceBox({ predefinedDevices, onAddDevice }: AddDeviceBoxProps) {
    const [newDeviceName, setNewDeviceName] = useState('');
    const [customDeviceName, setCustomDeviceName] = useState('');
    const [isCustom, setIsCustom] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleAddDevice = () => {
        const deviceName = isCustom ? customDeviceName : newDeviceName;
        if (deviceName.trim() !== '') {
            onAddDevice(deviceName);
            setNewDeviceName('');
            setCustomDeviceName('');
            setIsCustom(false);
            setShowDropdown(false);
        }
    };

    const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        if (value === 'Other') {
            setIsCustom(true);
            setNewDeviceName('');
        } else {
            setIsCustom(false);
            setNewDeviceName(value);
        }
    };

    return (
        <div className="device-box add-device-box">
            <button onClick={() => setShowDropdown(!showDropdown)} className="add-device-button">
                <img src={plusIcon} alt="Add Device" className="plus-icon" />
                <span className="add-device-text">Add Device</span>
            </button>
            {showDropdown && (
                <>
                    <select
                        value={newDeviceName}
                        onChange={handleDeviceChange}
                        className="device-select"
                    >
                        <option value="">Select a device</option>
                        {predefinedDevices.map((device, index) => (
                            <option key={index} value={device}>{device}</option>
                        ))}
                        <option value="Other">Other</option>
                    </select>
                    {isCustom && (
                        <input
                            type="text"
                            value={customDeviceName}
                            onChange={(e) => setCustomDeviceName(e.target.value)}
                            placeholder="Enter device name"
                            className="device-input"
                        />
                    )}
                    <button onClick={handleAddDevice} className="confirm-add-device-button">Add Device</button>
                </>
            )}
        </div>
    );
}