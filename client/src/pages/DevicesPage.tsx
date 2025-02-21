import React, { useState } from 'react';
import DeviceBox from '../components/DeviceBox';
import AddDeviceBox from '../components/AddDeviceBox';
import AddDeviceModal from '../components/AddDeviceModal';
import AddScheduleBox from '../components/AddScheduleBox';
import ScheduleBox from '../components/ScheduleBox';
import '../App.css';
import axios from 'axios';

export default function DevicesPage() {
    const [devices, setDevices] = useState<{ name: string, image: string }[]>([]);
    const [schedules, setSchedules] = useState<{ room: string, device: string, action: string, time: string }[]>([]);
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];
    const rooms = ['Living Room', 'Bedroom', 'Kitchen'];

    const handleAddDevice = async (deviceName: string, deviceImage: string) => {
        try {
            const response = await axios.post('http://localhost:8080/devices', { name: deviceName, image: deviceImage });
            setDevices([...devices, response.data.device]);
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    const handleAddSchedule = (room: string, device: string, action: string, time: string) => {
        setSchedules([...schedules, { room, device, action, time }]);
    };

    const handleOpenDeviceModal = () => {
        setIsDeviceModalOpen(true);
    };

    const handleCloseDeviceModal = () => {
        setIsDeviceModalOpen(false);
    };

    const handleOpenScheduleModal = () => {
        setIsScheduleModalOpen(true);
    };

    const handleCloseScheduleModal = () => {
        setIsScheduleModalOpen(false);
    };

    return (
        <div className="devices-page">
            <div className="device-section">
                <h1 className="device-title">Smart Devices</h1>
                <div className="device-box-container">
                    {devices.map((device, index) => (
                        <DeviceBox key={index} initialName={device.name} initialImage={device.image} />
                    ))}
                    <AddDeviceBox onAddDevice={handleOpenDeviceModal} />
                    {isDeviceModalOpen && (
                        <AddDeviceModal
                            predefinedDevices={predefinedDevices}
                            onAddDevice={handleAddDevice}
                            onClose={handleCloseDeviceModal}
                        />
                    )}
                </div>
            </div>
            <div className="device-section">
                <h1 className="device-title">Smart Schedules</h1>
                <div className="device-box-container">
                    {schedules.map((schedule, index) => (
                        <ScheduleBox key={index} initialTitle={`${schedule.room} - ${schedule.device} - ${schedule.action} at ${schedule.time}`} />
                    ))}
                    <AddScheduleBox rooms={rooms} devices={devices} onAddSchedule={handleAddSchedule} />
                </div>
            </div>
        </div>
    );
}