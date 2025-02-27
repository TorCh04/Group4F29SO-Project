import React, { useState } from 'react';
import roombaImage from '../../assets/roomba.svg';
import lightSwitchImage from '../../assets/light_switch.svg';
import outletImage from '../../assets/outlet.svg';

interface CustomDeviceModalProps {
    onAddDevice: (deviceName: string, deviceImage: string) => void;
    onClose: () => void;
}

export default function CustomDeviceModal({ onAddDevice, onClose }: CustomDeviceModalProps) {
    const [deviceName, setDeviceName] = useState('');
    const [selectedImage, setSelectedImage] = useState(roombaImage);
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddDevice = () => {
        if (deviceName.trim() === '') {
            setErrorMessage('Please enter a device name.');
            return;
        }
        onAddDevice(deviceName, selectedImage);
        setDeviceName('');
        setErrorMessage('');
        onClose();
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
                    <h2>Add Custom Device</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <input
                    type="text"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                    placeholder="Enter device name"
                    className="device-input"
                />
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="device-buttons-container">
                    <button
                        onClick={() => setSelectedImage(roombaImage)}
                        className={`device-button ${selectedImage === roombaImage ? 'selected' : ''}`}
                    >
                        <img src={roombaImage} alt="Roomba" className="device-button-image" />
                        Roomba
                    </button>
                    <button
                        onClick={() => setSelectedImage(lightSwitchImage)}
                        className={`device-button ${selectedImage === lightSwitchImage ? 'selected' : ''}`}
                    >
                        <img src={lightSwitchImage} alt="Light Switch" className="device-button-image" />
                        Light Switch
                    </button>
                    <button
                        onClick={() => setSelectedImage(outletImage)}
                        className={`device-button ${selectedImage === outletImage ? 'selected' : ''}`}
                    >
                        <img src={outletImage} alt="Outlet" className="device-button-image" />
                        Outlet
                    </button>
                    <button onClick={handleAddDevice} className="confirm-add-device-button">
                        Add Device
                    </button>
                </div>
            </div>
        </div>
    );
}