import { useEffect, useState } from 'react';
import AddDeviceBlock from './AddDeviceBlock';
import DeviceBlock from './DeviceBlock';
import { Device, DevicesSectionProps } from '../../../types/index';

export default function DevicesSection({ onAddDeviceClick, setFetchDevices }: DevicesSectionProps) {
    const [devices, setDevices] = useState<Device[]>([]);

    const fetchDevices = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/getDevices', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setDevices(data.devices);
    };

    useEffect(() => {
        fetchDevices();
        setFetchDevices(fetchDevices);
    }, []);

    const handleToggleStatus = async (deviceId: string) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8080/toggleDeviceStatus/${deviceId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        setDevices(devices.map(device => 
            device._id === deviceId ? { ...device, status: device.status === 'Connected' ? 'Not Connected' : 'Connected' } : device
        ));
    };

    return (
        <>
            <h1 className="devices__heading">Smart Devices</h1>
            <div className="devices__container">
                {devices.map(device => (
                    <DeviceBlock
                        key={device._id}
                        name={device.name}
                        type={device.type}
                        status={device.status}
                        onToggleStatus={() => handleToggleStatus(device._id)}
                    />
                ))}
                <AddDeviceBlock onClick={onAddDeviceClick} />
            </div>
        </>
    );
}