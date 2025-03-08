import React, { useState } from 'react';
import AddDeviceBlock from '../components/Dashboard/SmartDevices/AddDeviceBlock';
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
          <AddDeviceBlock onClick={handleAddScheduleClick} />


        {/* Energy Production */}
          <button onClick={handleAddScheduleClick}>Add Schedule</button>
          <button onClick={handleAddEnergyProductionClick}>Add Energy Production</button>
          {isDeviceManagerVisible && (
              <DeviceManager formType={formType} onClose={handleCloseDeviceManager} />
          )}
        </>
    );
}