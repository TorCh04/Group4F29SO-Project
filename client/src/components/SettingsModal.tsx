import React, { useState } from 'react';
import axios from 'axios';
import roombaImage from '../assets/roomba.svg';
import lightSwitchImage from '../assets/light_switch.svg';
import outletImage from '../assets/outlet.svg';

interface SettingsModalProps {
    deviceId: string;
    initialName: string;
    initialImage: string;
    onClose: () => void;
    onSave: (newName: string, newImage: string) => void;
}

export default function SettingsModal({ deviceId, initialName, initialImage, onClose, onSave }: SettingsModalProps) {
    const [name, setName] = useState(initialName);
    const [image, setImage] = useState(initialImage);

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const handleSaveClick = async () => {
        try {
            // Make an API call to update the device in the database
            await axios.put(`http://localhost:8080/devices/${deviceId}`, { name, image });
            // Call the onSave callback to update the parent component
            onSave(name, image);
            onClose();
        } catch (error) {
            console.error('Error updating device:', error);
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Settings</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <div className="modal-body">
                    <label>
                        Device Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="device-input"
                        />
                    </label>
                    <div className="device-settings-buttons-container">
                        <button
                            onClick={() => setImage(roombaImage)}
                            className={`device-button-settings ${image === roombaImage ? 'selected' : ''}`}
                        >
                            <img src={roombaImage} alt="Roomba" className="device-button-image" />
                            Roomba
                        </button>
                        <button
                            onClick={() => setImage(lightSwitchImage)}
                            className={`device-button-settings ${image === lightSwitchImage ? 'selected' : ''}`}
                        >
                            <img src={lightSwitchImage} alt="Light Switch" className="device-button-image" />
                            Light Switch
                        </button>
                        <button
                            onClick={() => setImage(outletImage)}
                            className={`device-button-settings ${image === outletImage ? 'selected' : ''}`}
                        >
                            <img src={outletImage} alt="Outlet" className="device-button-image" />
                            Outlet
                        </button>
                    </div>
                    <br></br>
                    <button onClick={handleSaveClick} className="confirm-add-device-button">Save</button>
                </div>
            </div>
        </div>
    );
}