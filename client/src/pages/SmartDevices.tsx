import { useState } from 'react';
import AddDeviceBlock from '../components/Dashboard/SmartDevices/AddDeviceBlock';
import AddScheduleBlock from '../components/Dashboard/SmartDevices/AddScheduleBlock';
import AddEnergyProductionBlock from '../components/Dashboard/SmartDevices/AddEnergyProductionBlock';
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

    const handleAddEnergyProductionClick = () => {
        setFormType('energyProduction');
        setDeviceManagerVisible(true);
    };

    const handleCloseDeviceManager = () => {
        setDeviceManagerVisible(false);
    };

    return (
        <>
        {/* Smart Devices */}
        <h1>Smart Devices</h1>
          <AddDeviceBlock onClick={handleAddDeviceClick} />

        {/* Schedules */}
        <h1>Schedules</h1>
          <AddScheduleBlock onClick={handleAddScheduleClick} />

        {/* Energy Production */}
        <h1>Energy Production</h1>
          <AddEnergyProductionBlock onClick={handleAddEnergyProductionClick} />
          
          {isDeviceManagerVisible && (
              <DeviceManager formType={formType} onClose={handleCloseDeviceManager} />
          )}
        </>
    );
}