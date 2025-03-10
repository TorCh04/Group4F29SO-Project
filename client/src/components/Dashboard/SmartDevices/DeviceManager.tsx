import { useState } from 'react';
import Roomba from '../../../assets/roomba.svg';
import LightSwitch from '../../../assets/light_switch.svg';
import Outlet from '../../../assets/outlet.svg';
import Arrow from '../../../assets/arrow.svg';
import Plus from '../../../assets/plus.svg';

interface DeviceManagerProps {
    formType: 'device' | 'schedule' | 'energyProduction';
    onClose: () => void;
    onDeviceAdded: () => void;
}

export default function DeviceManager({ formType, onClose, onDeviceAdded }: DeviceManagerProps) {
    const renderForm = () => {
        switch (formType) {
            case 'device':
                return <DeviceForm onClose={onClose} onDeviceAdded={onDeviceAdded} />;
            case 'schedule':
                return <ScheduleForm onClose={onClose} />;
            case 'energyProduction':
                return <EnergyProductionForm onClose={onClose} />;
            default:
                return null;
        }
    };

    return (
        <>
            <div className="device__manager__overlay" onClick={onClose}></div>
            <div className="device__manager" style={{ position: 'fixed' }}>
                <div className="manager__form__container">
                    {renderForm()}
                </div>
            </div>
        </>
    );
}

interface DeviceFormProps {
    onClose: () => void;
    onDeviceAdded: () => void;
}

function DeviceForm({ onClose, onDeviceAdded }: DeviceFormProps) {
    const [deviceTypeIndex, setDeviceTypeIndex] = useState(0);
    const [status, setStatus] = useState('Not Connected');
    const [deviceName, setDeviceName] = useState('');

    const deviceTypes = [
        { name: 'Roomba', image: Roomba },
        { name: 'Light Switch', image: LightSwitch },
        { name: 'Outlet', image: Outlet }
    ];

    const handlePrevious = () => {
        setDeviceTypeIndex((prevIndex) => (prevIndex === 0 ? deviceTypes.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setDeviceTypeIndex((prevIndex) => (prevIndex === deviceTypes.length - 1 ? 0 : prevIndex + 1));
    };

    const handleSync = () => {
        setStatus('Connected');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/addDevice', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: deviceName,
                    type: deviceTypes[deviceTypeIndex].name,
                    status
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Device added successfully:', data);
                onDeviceAdded(); // Call the callback to update the devices list
                onClose();
            } else {
                console.error('Error adding device:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding device:', error);
        }
    };

    return (
        <>
            <div className="manager__heading">
                <h2 className="devices__heading">Add Device</h2>
                <button onClick={onClose} className="manager__close">
                    <img src={Plus} className="manager__close__image" />
                </button>
            </div>
            <form className="manager__form" onSubmit={handleSubmit}>
                <img src={deviceTypes[deviceTypeIndex].image} className="manager__image" alt={deviceTypes[deviceTypeIndex].name} />
                <div className="manager__type__selector">
                    <button type="button" className="manager__direction__button" onClick={handlePrevious}>
                        <img src={Arrow} className="manager__arrow" alt="Arrow" />
                    </button>
                    <p className="device__block__text manager__type__text">{deviceTypes[deviceTypeIndex].name}</p>
                    <button type="button" className="manager__direction__button" onClick={handleNext}>
                        <img src={Arrow} className="manager__arrow manager__arrow__right" alt="Arrow" />
                    </button>
                </div>
                <input
                    type="text"
                    name="device"
                    className="manager__name__input"
                    placeholder="Device Name"
                    value={deviceName}
                    onChange={(e) => setDeviceName(e.target.value)}
                />
                <div className="manager__sync__container">
                    <button type="button" className="manager__sync__button" onClick={handleSync}>Sync</button>
                    <p className="manager__sync__text">Status: {status}</p>
                </div>
                <button type="submit" className="manager__submit__button">Add Device</button>
            </form>
        </>
    );
}

function ScheduleForm({ onClose }: { onClose: () => void }) {
    return (
        <form>
            <div className="manager__heading">
                <h2 className="devices__heading">Add Schedule</h2>
                <button onClick={onClose} className="manager__close">
                    <img src={Plus} className="manager__close__image" />
                </button>
            </div>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Device:
                <input type="text" name="device" />
            </label>
            <label>
                Instructions:
                <textarea name="instructions"></textarea>
            </label>
            <button type="submit">Add Schedule</button>
        </form>
    );
}

function EnergyProductionForm({ onClose }: { onClose: () => void }) {
    return (
        <form>
            <div className="manager__heading">
                <h2 className="devices__heading">Add Energy Source</h2>
                <button onClick={onClose} className="manager__close">
                    <img src={Plus} className="manager__close__image" />
                </button>
            </div>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Type:
                <input type="text" name="type" />
            </label>
            <label>
                Capacity:
                <input type="text" name="capacity" />
            </label>
            <button type="submit">Add Energy Source</button>
        </form>
    );
}