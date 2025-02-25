import React, { useState } from 'react';
import plusIcon from '../assets/plus.svg';
import '../App.css';

interface AddDeviceBoxProps {
    predefinedDevices: string[];
    onAddDevice: () => void;
}

export default function AddDeviceBox({ onAddDevice }: AddDeviceBoxProps) {
    return (
        <div className="device-box add-device-box">
            <button onClick={onAddDevice} className="add-device-button">
                <img src={plusIcon} alt="Add Device" className="plus-icon" />
                <span className="add-device-text">Add Device</span>
            </button>
        </div>
    );
}