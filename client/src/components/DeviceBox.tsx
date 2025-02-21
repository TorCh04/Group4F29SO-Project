import React, { useState } from 'react';
import '../App.css';

interface DeviceBoxProps {
    initialName: string;
    initialImage: string;
}

export default function DeviceBox({ initialName, initialImage }: DeviceBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState(initialName); // State for text under the image
    const [image, setImage] = useState(initialImage); // State for image

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
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