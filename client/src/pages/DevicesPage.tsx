import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDeviceBox from '../components/AddDeviceBox';
import '../App.css';

export default function DevicesPage() {
    const [devices, setDevices] = useState<string[]>([]);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];

    const handleAddDevice = (deviceName: string) => {
        setDevices([...devices, deviceName]);
    };

    return (
        <div>
            {devices.map((deviceName, index) => (
                <DeviceBox key={index} initialName={deviceName} />
            ))}
            <AddDeviceBox predefinedDevices={predefinedDevices} onAddDevice={handleAddDevice} />
        </div>
    );
}