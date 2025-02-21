import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import '../App.css';

export default function DevicesPage() {
    const [devices, setDevices] = useState([]);
    const [newDeviceName, setNewDeviceName] = useState('');

    const handleAddDevice = () => {
        if (newDeviceName.trim() !== '') {
            setDevices([...devices, newDeviceName]);
            setNewDeviceName('');
        }
    };

    return (
        <>
            <h1 className="device-title">Smart Devices</h1>
            <div className="device-box-container">
                <div className="add-device-box">
                    <input
                        type="text"
                        value={newDeviceName}
                        onChange={(e) => setNewDeviceName(e.target.value)}
                        placeholder="Enter device name"
                        className="device-input"
                    />
                    <button onClick={handleAddDevice} className="add-device-button">Add Device</button>
                </div>
                {devices.map((deviceName, index) => (
                    <DeviceBox key={index} initialName={deviceName} />
                ))}
            </div>
        </>
    );
}