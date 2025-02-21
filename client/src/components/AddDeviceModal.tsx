import React, { useState } from 'react';
import roombaImage from '../assets/roomba.svg';
import lightSwitchImage from '../assets/light_switch.svg';
import outletImage from '../assets/outlet.svg';
import '../App.css';

interface AddDeviceModalProps {
    predefinedDevices: string[];
    onAddDevice: (deviceName: string) => void;
    onClose: () => void;
}

export default function AddDeviceModal({ predefinedDevices, onAddDevice, onClose }: AddDeviceModalProps) {
    const [customDeviceName, setCustomDeviceName] = useState('');

    const handleAddDevice = (deviceName: string) => {
        if (deviceName.trim() !== '') {
            onAddDevice(deviceName);
            setCustomDeviceName('');
            onClose();
        }
    };

    const getImage = (deviceName: string) => {
        switch (deviceName.toLowerCase()) {
            case 'roomba':
                return roombaImage;
            case 'light switch':
                return lightSwitchImage;
            case 'outlet':
                return outletImage;
            default:
                return outletImage;
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button onClick={onClose} className="close-modal-button">X</button>
                <h2>Add Device</h2>
                <div className="device-buttons-container">
                    {predefinedDevices.map((device, index) => (
                        <button
                            key={index}
                            onClick={() => handleAddDevice(device)}
                            className="device-button"
                        >
                            <img src={getImage(device)} alt={device} className="device-button-image" />
                            {device}
                        </button>
                    ))}
                </div>
                <input
                    type="text"
                    value={customDeviceName}
                    onChange={(e) => setCustomDeviceName(e.target.value)}
                    placeholder="Enter custom device name"
                    className="device-input"
                />
                <button onClick={() => handleAddDevice(customDeviceName)} className="confirm-add-device-button">
                    Add Custom Device
                </button>
            </div>
        </div>
    );
}