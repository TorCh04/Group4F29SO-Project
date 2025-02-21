import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDeviceBox from '../components/AddDeviceBox';
import AddDeviceModal from '../components/AddDeviceModal';
import '../App.css';

export default function DevicesPage() {
    const [devices, setDevices] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];

    const handleAddDevice = (deviceName: string) => {
        setDevices([...devices, deviceName]);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="devices-page">
            <h1 className="page-title">Smart Devices</h1>
            <div className="device-box-container">
                {devices.map((deviceName, index) => (
                    <DeviceBox key={index} initialName={deviceName} />
                ))}
                <AddDeviceBox onAddDevice={handleOpenModal} />
                {isModalOpen && (
                    <AddDeviceModal
                        predefinedDevices={predefinedDevices}
                        onAddDevice={handleAddDevice}
                        onClose={handleCloseModal}
                    />
                )}
            </div>
        </div>
    );
}