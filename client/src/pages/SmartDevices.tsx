import { useState } from 'react';
import DevicesSection from '../components/Dashboard/SmartDevices/DevicesSection';
import SchedulesSection from '../components/Dashboard/SmartDevices/SchedulesSection';
import EnergyProductionSection from '../components/Dashboard/SmartDevices/EnergyProductionSection';
import DeviceManager from '../components/Dashboard/SmartDevices/DeviceManager';
import './styles/SmartDevices.css';

export default function SmartDevices() {
    const [isDeviceManagerVisible, setDeviceManagerVisible] = useState(false);
    const [formType, setFormType] = useState<'device' | 'schedule' | 'energyProduction'>('device');

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

    return (
        <>
            {/* Smart Devices */}
            <DevicesSection onAddDeviceClick={handleAddDeviceClick} />

            {/* Schedules */}
            <SchedulesSection onAddSchedulesClick={handleAddScheduleClick} />

            {/* Energy Source */}
            <EnergyProductionSection onAddEnergySourceClick={handleAddEnergySourceClick} />
            
            {isDeviceManagerVisible && (
                <DeviceManager formType={formType} onClose={handleCloseDeviceManager} />
            )}
        </>
    );
}