import React, { useState } from 'react';
import roombaImage from '../assets/roomba.svg';

export default function DeviceBox() {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState("Roomba"); // State for text under the image

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
    };

    return (
        <div className="device-box">
            {/* Image */}
            <img
                src={roombaImage}
                alt="Roomba"
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
        </div>
    );
}