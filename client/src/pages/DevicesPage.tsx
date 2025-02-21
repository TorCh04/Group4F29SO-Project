import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDeviceBox from '../components/AddDeviceBox';
import AddDeviceModal from '../components/AddDeviceModal';
import '../App.css';

export default function DevicesPage() {
    const [devices, setDevices] = useState<{ name: string, image: string }[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];

    const handleAddDevice = (deviceName: string, deviceImage: string) => {
        setDevices([...devices, { name: deviceName, image: deviceImage }]);
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="devices-page">
            <div className="device-section">
                <h1 className="device-title">Smart Devices</h1>
                <div className="device-box-container">
                    {devices.map((device, index) => (
                        <DeviceBox key={index} initialName={device.name} initialImage={device.image} />
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
            {/* Add more subsections here */}
        </div>
    );
}