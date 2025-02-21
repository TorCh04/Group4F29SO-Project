import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDeviceBox from '../components/AddDeviceBox';
import '../App.css';

export default function DevicesPage() {
    const [devices, setDevices] = useState([]);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];

    const handleAddDevice = (deviceName: string) => {
        setDevices([...devices, deviceName]);
    };

    return (
        <>
            <h1 className="device-title">Smart Devices</h1>
            <div className="device-box-container">
                {devices.map((deviceName, index) => (
                    <DeviceBox key={index} initialName={deviceName} />
                ))}
                <AddDeviceBox predefinedDevices={predefinedDevices} onAddDevice={handleAddDevice} />
            </div>
        </>
    );
}