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
    onEnergySourceAdded: () => void;
}

export default function DeviceManager({ formType, onClose, onDeviceAdded, onEnergySourceAdded }: DeviceManagerProps) {
    const renderForm = () => {
        switch (formType) {
            case 'device':
                return <DeviceForm onClose={onClose} onDeviceAdded={onDeviceAdded} />;
            case 'schedule':
                return <ScheduleForm onClose={onClose} />;
            case 'energyProduction':
                return <EnergyProductionForm onClose={onClose} onEnergySourceAdded={onEnergySourceAdded} />;
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
    const [name, setName] = useState('');
    const [device, setDevice] = useState('');
    const [instructions, setInstructions] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/addSchedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name,
                    device,
                    instructions
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Schedule added successfully:', data);
                onClose();
            } else {
                console.error('Error adding schedule:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding schedule:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="manager__heading">
                <h2 className="devices__heading">Add Schedule</h2>
                <button onClick={onClose} className="manager__close">
                    <img src={Plus} className="manager__close__image" />
                </button>
            </div>
            <input
                type="text"
                name="name"
                className="manager__name__input"
                placeholder="Schedule Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>
                Device:
                <input type="text" name="device" value={device} onChange={(e) => setDevice(e.target.value)} />
            </label>
            <label>
                Instructions:
                <select
                    name="instructions"
                    className="manager__instructions__select"
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                >
                    <option value="">Select an instruction</option>
                    <option value="Turn On">Turn On</option>
                    <option value="Turn Off">Turn Off</option>
                    <option value="Increase Temperature">Increase Temperature</option>
                    <option value="Decrease Temperature">Decrease Temperature</option>
                    <option value="Start Cleaning">Start Cleaning</option>
                    <option value="Stop Cleaning">Stop Cleaning</option>
                </select>
            </label>
            <button type="submit" className="manager__submit__button">Add Schedule</button>
        </form>
    );
}


interface EnergyProductionFormProps {
    onClose: () => void;
    onEnergySourceAdded: () => void;
}

function EnergyProductionForm({ onClose, onEnergySourceAdded }: EnergyProductionFormProps) {
    const [energySourceTypeIndex, setEnergySourceTypeIndex] = useState(0);
    const [status, setStatus] = useState('Not Connected');
    const [energySourceName, setEnergySourceName] = useState('');

    const energySourceTypes = [
        { name: 'Roomba', image: Outlet },
        { name: 'Light Switch', image: Roomba },
        { name: 'Outlet', image: LightSwitch }
    ];

    const handlePrevious = () => {
        setEnergySourceTypeIndex((prevIndex) => (prevIndex === 0 ? energySourceTypes.length - 1 : prevIndex - 1));
    };

    const handleNext = () => {
        setEnergySourceTypeIndex((prevIndex) => (prevIndex === energySourceTypes.length - 1 ? 0 : prevIndex + 1));
    };

    const handleSync = () => {
        setStatus('Connected');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const token = localStorage.getItem('token');

        try {
            const response = await fetch('http://localhost:8080/addEnergySource', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    name: energySourceName,
                    type: energySourceTypes[energySourceTypeIndex].name,
                    status
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Energy Source added successfully:', data);
                onEnergySourceAdded(); // Call the callback to update the devices list
                onClose();
            } else {
                console.error('Error adding energy source:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding energy source:', error);
        }
    };

    return (
        <>
            <div className="manager__heading">
                <h2 className="devices__heading">Add Enery Source</h2>
                <button onClick={onClose} className="manager__close">
                    <img src={Plus} className="manager__close__image" />
                </button>
            </div>
            <form className="manager__form" onSubmit={handleSubmit}>
                <img src={energySourceTypes[energySourceTypeIndex].image} className="manager__image" alt={energySourceTypes[energySourceTypeIndex].name} />
                <div className="manager__type__selector">
                    <button type="button" className="manager__direction__button" onClick={handlePrevious}>
                        <img src={Arrow} className="manager__arrow" alt="Arrow" />
                    </button>
                    <p className="device__block__text manager__type__text">{energySourceTypes[energySourceTypeIndex].name}</p>
                    <button type="button" className="manager__direction__button" onClick={handleNext}>
                        <img src={Arrow} className="manager__arrow manager__arrow__right" alt="Arrow" />
                    </button>
                </div>
                <input
                    type="text"
                    name="device"
                    className="manager__name__input"
                    placeholder="Device Name"
                    value={energySourceName}
                    onChange={(e) => setEnergySourceName(e.target.value)}
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