import React, { useState } from 'react';
import '../App.css';

interface AddDeviceModalProps {
    predefinedDevices: string[];
    onAddDevice: (deviceName: string) => void;
    onClose: () => void;
}

export default function AddDeviceModal({ predefinedDevices, onAddDevice, onClose }: AddDeviceModalProps) {
    const [newDeviceName, setNewDeviceName] = useState('');
    const [customDeviceName, setCustomDeviceName] = useState('');
    const [isCustom, setIsCustom] = useState(false);

    const handleAddDevice = () => {
        const deviceName = isCustom ? customDeviceName : newDeviceName;
        if (deviceName.trim() !== '') {
            onAddDevice(deviceName);
            setNewDeviceName('');
            setCustomDeviceName('');
            setIsCustom(false);
            onClose();
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
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-modal-button">X</button>
                <h2>Add Device</h2>
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
            </div>
        </div>
    );
}