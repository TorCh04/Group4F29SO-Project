import { useState, useRef } from 'react';
import DevicesSection from '../components/Dashboard/SmartDevices/DevicesSection';
import SchedulesSection from '../components/Dashboard/SmartDevices/SchedulesSection';
import EnergyProductionSection from '../components/Dashboard/SmartDevices/EnergyProductionSection';
import DeviceManager from '../components/Dashboard/SmartDevices/DeviceManager';
import UserStats from '../components/UserStats';
import './styles/SmartDevices.css';

// Extend the Window interface to include fetchSchedulesRef
declare global {
  interface Window {
    fetchSchedulesRef: React.MutableRefObject<() => void>;
  }
}

export default function SmartDevices() {
  const [isDeviceManagerVisible, setDeviceManagerVisible] = useState(false);
  const [formType, setFormType] = useState<'device' | 'schedule' | 'energyProduction'>('device');
  const fetchDevicesRef = useRef<() => void>(() => {});
  const fetchEnergySourcesRef = useRef<() => void>(() => {});
  const fetchSchedulesRef = useRef<() => void>(() => {});

  // Assign fetchSchedulesRef to the window object with proper typing
  window.fetchSchedulesRef = fetchSchedulesRef;

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

  const handleEnergySourceAdded = () => {
    fetchEnergySourcesRef.current();
  };

  const setFetchEnergySources = (fetchEnergySources: () => void) => {
    fetchEnergySourcesRef.current = fetchEnergySources;
  };

  const setFetchSchedules = (fetchSchedules: () => void) => {
    fetchSchedulesRef.current = fetchSchedules;
  };

  return (
    <div className="devices__dashboard__main__container">
      <UserStats />
      <div className="devices__dashboard__left__container">
        {/* Smart Devices */}
        <DevicesSection onAddDeviceClick={handleAddDeviceClick} setFetchDevices={setFetchDevices} />

        {/* Schedules */}
        <SchedulesSection onAddScheduleClick={handleAddScheduleClick} setFetchSchedules={setFetchSchedules} />

        {/* Energy Source */}
        <EnergyProductionSection onAddEnergySourceClick={handleAddEnergySourceClick} setFetchEnergySources={setFetchEnergySources} />
      </div>
      <div className="devices__dashboard__right__container">
        {isDeviceManagerVisible && (
          <>
            <DeviceManager formType={formType} onClose={handleCloseDeviceManager} onDeviceAdded={handleDeviceAdded} onEnergySourceAdded={handleEnergySourceAdded} />
          </>
        )}
      </div>
    </div>
  );
}