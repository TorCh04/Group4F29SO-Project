import React, { useState } from 'react';
import roombaImage from '../assets/roomba.svg';
import lightSwitchImage from '../assets/light_switch.svg';
import outletImage from '../assets/outlet.svg';
import plusIcon from '../assets/plus.svg';
import CustomDeviceModal from './CustomDeviceModal';

interface AddDeviceModalProps {
    predefinedDevices: string[];
    onAddDevice: (deviceName: string, deviceImage?: string) => void;
    onClose: () => void;
}

export default function AddDeviceModal({ predefinedDevices, onAddDevice, onClose }: AddDeviceModalProps) {
    const [isCustomModalOpen, setIsCustomModalOpen] = useState(false);

    const handleAddDevice = (deviceName: string, deviceImage?: string) => {
        onAddDevice(deviceName, deviceImage);
        setIsCustomModalOpen(false);
        onClose();
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

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Device</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <div className="device-buttons-container">
                    {predefinedDevices.map((device, index) => (
                        <button
                            key={index}
                            onClick={() => handleAddDevice(device, getImage(device))}
                            className="device-button"
                        >
                            <img src={getImage(device)} alt={device} className="device-button-image" />
                            {device}
                        </button>
                    ))}
                    <button
                        onClick={() => setIsCustomModalOpen(true)}
                        className="device-button"
                    >
                        <img src={plusIcon} alt="Add Custom Device" className="device-button-image" />
                        Add Custom Device
                    </button>
                </div>
                {isCustomModalOpen && (
                    <CustomDeviceModal
                        onAddDevice={handleAddDevice}
                        onClose={() => setIsCustomModalOpen(false)}
                    />
                )}
            </div>
        </div>
    );
}