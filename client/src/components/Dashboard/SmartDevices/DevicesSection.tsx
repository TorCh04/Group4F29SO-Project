import { useEffect, useState } from 'react';
import AddDeviceBlock from './AddDeviceBlock';
import DeviceBlock from './DeviceBlock';
import { Device, DevicesSectionProps } from '../../../types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Extend the Window interface to include fetchSchedulesRef
declare global {
  interface Window {
    fetchSchedulesRef: React.MutableRefObject<() => void>;
  }
}

export default function DevicesSection({ onAddDeviceClick, setFetchDevices }: DevicesSectionProps) {
  const [devices, setDevices] = useState<Device[]>([]);

  const fetchDevices = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/getDevices`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setDevices(data.devices);
  };

  useEffect(() => {
    fetchDevices();
    setFetchDevices(fetchDevices);
  }, [setFetchDevices]);

  const handleToggleStatus = async (deviceId: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/toggleDeviceStatus/${deviceId}`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    setDevices(
      devices.map((device) =>
        device._id === deviceId
          ? { ...device, status: device.status === 'Connected' ? 'Not Connected' : 'Connected' }
          : device
      )
    );
  };

  const handleRemove = async (deviceId: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/removeDevice`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    });

    setDevices(devices.filter((device) => device._id !== deviceId));

    // Trigger fetchSchedules to update the schedules list
    const fetchSchedules = window.fetchSchedulesRef?.current;
    if (fetchSchedules) {
      fetchSchedules();
    }
  };

  return (
    <>
      <h1 className="devices__heading">Smart Devices</h1>
      <div className="devices__container">
        {devices.map((device) => (
          <DeviceBlock
            key={device._id}
            _id={device._id}
            name={device.name}
            type={device.type}
            status={device.status}
            onToggleStatus={() => handleToggleStatus(device._id)}
            onRemove={handleRemove} // Pass the remove handler
          />
        ))}
        <AddDeviceBlock onClick={onAddDeviceClick} />
      </div>
    </>
  );
}