import React, { useState } from 'react';
import roombaImage from '../assets/roomba.svg';
import lightSwitchImage from '../assets/light_switch.svg';
import outletImage from '../assets/outlet.svg';
import '../App.css';

interface DeviceBoxProps {
    initialName: string;
}

export default function DeviceBox({ initialName }: DeviceBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState(initialName); // State for text under the image
    const [image, setImage] = useState(getImage(initialName)); // State for image

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
    };

    function getImage(deviceName: string) {
        switch (deviceName.toLowerCase()) {
            case 'roomba':
                return roombaImage;
            case 'light switch':
                return lightSwitchImage;
            case 'outlet':
                return outletImage;
            default:
                return roombaImage;
        }
    }

    return (
        <div className={`device-box ${isSliderOn ? 'device-box-on' : 'device-box-off'}`}>
            {/* Image */}
            <img
                src={image}
                alt={text}
            />

            {/* Text Under the Image */}
            <p>
                {text}
            </p>

            {/* Slider Switch in Bottom-Left Corner */}
            <div className="slider-container">
                <label className="slider-label">
                    <input
                        type="checkbox"
                        checked={isSliderOn}
                        onChange={toggleSlider}
                        className="slider-input"
                    />
                    <span className="slider-span"></span>
                </label>
            </div>

            {/* Settings Link in Bottom-Right Corner */}
            <div className="settings-container">
                <a href="/settings" className="settings-link">Settings</a>
            </div>
        </div>
    );
}