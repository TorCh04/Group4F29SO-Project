import React, { useState } from 'react';
import plusIcon from '../../assets/plus.svg';
import AddScheduleModal from './AddScheduleModal';

interface AddScheduleBoxProps {
    rooms: string[];
    devices: { name: string, image: string }[];
    onAddSchedule: (room: string, device: string, action: string, time: string) => void;
}

export default function AddScheduleBox({ rooms, devices, onAddSchedule }: AddScheduleBoxProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="device-box add-device-box">
            <button onClick={() => setIsModalOpen(true)} className="add-device-button">
                <img src={plusIcon} alt="Add Schedule" className="plus-icon" />
                <span className="add-device-text">Add Schedule</span>
            </button>
            {isModalOpen && (
                <AddScheduleModal
                    rooms={rooms}
                    devices={devices}
                    onAddSchedule={onAddSchedule}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}