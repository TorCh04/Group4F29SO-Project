import React, { useState, useEffect } from 'react';
import DeviceBox from '../components/Devices/DeviceBox';
import AddDeviceBox from '../components/Devices/AddDeviceBox';
import AddDeviceModal from '../components/Devices/AddDeviceModal';
import AddScheduleBox from '../components/Devices/AddScheduleBox';
import ScheduleBox from '../components/Devices/ScheduleBox';
import SettingsModal from '../components/Devices/SettingsModal';
import './styles/Devices.css';
import axios from 'axios';

export default function DevicesPage() {
    const [devices, setDevices] = useState<{ _id: string, name: string, image: string }[]>([]);
    const [schedules, setSchedules] = useState<{ _id: string, room: string, device: string, action: string, time: string }[]>([]);
    const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);
    const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);
    const predefinedDevices = ['Roomba', 'Light Switch', 'Outlet'];
    const rooms = ['Living Room', 'Bedroom', 'Kitchen'];

    useEffect(() => {
        const fetchDevices = async () => {
            try {
                const response = await axios.get('http://localhost:8080/devices');
                setDevices(response.data.devices);
            } catch (error) {
                console.error('Error fetching devices:', error);
            }
        };

        const fetchSchedules = async () => {
            try {
                const response = await axios.get('http://localhost:8080/schedules');
                setSchedules(response.data.schedules);
            } catch (error) {
                console.error('Error fetching schedules:', error);
            }
        };

        fetchDevices();
        fetchSchedules();
    }, []);

    const handleAddDevice = async (deviceName: string, deviceImage: string) => {
        try {
            const response = await axios.post('http://localhost:8080/devices', { name: deviceName, image: deviceImage });
            setDevices([...devices, response.data.device]);
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    const handleAddSchedule = async (room: string, device: string, action: string, time: string) => {
        try {
            const response = await axios.post('http://localhost:8080/schedules', { room, device, action, time });
            setSchedules([...schedules, response.data.schedule]);
        } catch (error) {
            console.error('Error adding schedule:', error);
        }
    };

    const handleOpenDeviceModal = () => {
        setIsDeviceModalOpen(true);
    };

    const handleCloseDeviceModal = () => {
        setIsDeviceModalOpen(false);
    };

    const handleOpenSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

    return (
        <div className="devices-page">
            <div className="device-section">
                <h1 className="device-title">Smart Devices</h1>
                <div className="device-box-container">
                    {devices.map((device, index) => (
                        <DeviceBox key={index} initialName={device.name} initialImage={device.image} onOpenSettings={handleOpenSettingsModal} />
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
            {isSettingsModalOpen && (
                <SettingsModal onClose={handleCloseSettingsModal} />
            )}
        </div>
    );
}