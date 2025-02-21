import React, { useState } from 'react';
import roombaImage from '../assets/roomba.svg';
import lightSwitchImage from '../assets/light_switch.svg';
import outletImage from '../assets/outlet.svg';
import '../App.css';

export default function DeviceBox() {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState("Roomba"); // State for text under the image
    const [image, setImage] = useState(roombaImage); // State for image

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const deviceName = e.target.value;
        setText(deviceName);

        // Change image based on input value
        switch (deviceName.toLowerCase()) {
            case 'roomba':
                setImage(roombaImage);
                break;
            case 'light switch':
                setImage(lightSwitchImage);
                break;
            case 'outlet':
                setImage(outletImage);
                break;
            default:
                setImage(roombaImage);
                break;
        }
    };

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

            {/* Input Field to Change Text and Image */}
            <input
                type="text"
                value={text}
                onChange={handleInputChange}
                className="device-input"
                placeholder="Enter device name"
            />

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