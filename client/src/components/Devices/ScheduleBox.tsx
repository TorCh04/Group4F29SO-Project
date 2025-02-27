import React, { useState } from 'react';

interface ScheduleBoxProps {
    initialTitle: string;
}

export default function ScheduleBox({ initialTitle }: ScheduleBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [title, setTitle] = useState(initialTitle); // State for title

    const toggleSlider = () => {
        setIsSliderOn(!isSliderOn);
    };

    return (
        <div className={`device-box ${isSliderOn ? 'device-box-on' : 'device-box-off'}`}>
            {/* Title */}
            <p className="schedule-title">
                {title}
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