import React, { useState } from 'react';
import plusIcon from '../assets/plus.svg';
import '../App.css';

interface AddScheduleBoxProps {
    onAddSchedule: () => void;
}

interface AddScheduleModalProps {
    rooms: string[];
    devices: { name: string, image: string }[];
    onAddSchedule: (room: string, device: string, action: string, time: string) => void;
    onClose: () => void;
}

export function AddScheduleBox({ onAddSchedule }: AddScheduleBoxProps) {
    return (
        <div className="device-box add-device-box">
            <button onClick={onAddSchedule} className="add-device-button">
                <img src={plusIcon} alt="Add Schedule" className="plus-icon" />
                <span className="add-device-text">Add Schedule</span>
            </button>
        </div>
    );
}

export default function AddScheduleModal({ rooms, devices, onAddSchedule, onClose }: AddScheduleModalProps) {
    const [selectedRoom, setSelectedRoom] = useState('');
    const [selectedDevice, setSelectedDevice] = useState('');
    const [selectedAction, setSelectedAction] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleAddSchedule = () => {
        if (!selectedRoom || !selectedDevice || !selectedAction || !selectedTime) {
            setErrorMessage('Please fill in all fields.');
            return;
        }
        onAddSchedule(selectedRoom, selectedDevice, selectedAction, selectedTime);
        setSelectedRoom('');
        setSelectedDevice('');
        setSelectedAction('');
        setSelectedTime('');
        setErrorMessage('');
        onClose();
    };

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Add Schedule</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <div className="modal-body">
                    <select value={selectedRoom} onChange={(e) => setSelectedRoom(e.target.value)} className="device-select">
                        <option value="">Select a room</option>
                        {rooms.map((room, index) => (
                            <option key={index} value={room}>{room}</option>
                        ))}
                    </select>
                    <select value={selectedDevice} onChange={(e) => setSelectedDevice(e.target.value)} className="device-select">
                        <option value="">Select a device</option>
                        {devices.map((device, index) => (
                            <option key={index} value={device.name}>{device.name}</option>
                        ))}
                    </select>
                    <select value={selectedAction} onChange={(e) => setSelectedAction(e.target.value)} className="device-select">
                        <option value="">Select an action</option>
                        <option value="Turn On">Turn On</option>
                        <option value="Turn Off">Turn Off</option>
                    </select>
                    <input
                        type="time"
                        value={selectedTime}
                        onChange={(e) => setSelectedTime(e.target.value)}
                        className="device-input"
                    />
                    {errorMessage && <p className="error-message">{errorMessage}</p>}
                    <button onClick={handleAddSchedule} className="confirm-add-device-button">
                        Add Schedule
                    </button>
                </div>
            </div>
        </div>
    );
}