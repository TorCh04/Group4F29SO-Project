import { useState, useRef } from 'react';
import DevicesSection from '../components/Dashboard/SmartDevices/DevicesSection';
import SchedulesSection from '../components/Dashboard/SmartDevices/SchedulesSection';
import EnergyProductionSection from '../components/Dashboard/SmartDevices/EnergyProductionSection';
import DeviceManager from '../components/Dashboard/SmartDevices/DeviceManager';
import UserStats from '../components/UserStats';
import './styles/SmartDevices.css';

export default function SmartDevices() {
    const [isDeviceManagerVisible, setDeviceManagerVisible] = useState(false);
    const [formType, setFormType] = useState<'device' | 'schedule' | 'energyProduction'>('device');
    const fetchDevicesRef = useRef<() => void>(() => {});

    const handleAddDeviceClick = () => {
        setFormType('device');
        setDeviceManagerVisible(true);
    };

    const handleAddScheduleClick = () => {
        setFormType('schedule');
        setDeviceManagerVisible(true);
    };

    const handleAddEnergySourceClick = () => {
        setFormType('energyProduction');
        setDeviceManagerVisible(true);
    };

    const handleCloseDeviceManager = () => {
        setDeviceManagerVisible(false);
    };

    const handleDeviceAdded = () => {
        fetchDevicesRef.current();
    };

    const setFetchDevices = (fetchDevices: () => void) => {
        fetchDevicesRef.current = fetchDevices;
    };

    return (
        <div className="devices__dashboard__main__container">
            <UserStats />
            <div className="devices__dashboard__left__container">
                {/* Smart Devices */}
                <DevicesSection onAddDeviceClick={handleAddDeviceClick} setFetchDevices={setFetchDevices} />

                {/* Schedules */}
                <SchedulesSection onAddSchedulesClick={handleAddScheduleClick} />

                {/* Energy Source */}
                <EnergyProductionSection onAddEnergySourceClick={handleAddEnergySourceClick} />
            </div>
            <div className="devices__dashboard__right__container">
                {isDeviceManagerVisible && (
                    <DeviceManager formType={formType} onClose={handleCloseDeviceManager} onDeviceAdded={handleDeviceAdded} />
                )}
            </div>
        </div>
    );
}