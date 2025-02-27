import React, { useState } from 'react';

interface ScheduleBoxProps {
    initialTitle: string;
}

export default function ScheduleBox({ initialTitle }: ScheduleBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false);

    return (
        <div className={`device-box ${isSliderOn ? 'device-box-on' : 'device-box-off'}`}>
            <p className="schedule-title">{initialTitle}</p>
            <div className="slider-container">
                <label className="slider-label">
                    <input
                        type="checkbox"
                        checked={isSliderOn}
                        onChange={() => setIsSliderOn(!isSliderOn)}
                        className="slider-input"
                    />
                    <span className="slider-span"></span>
                </label>
            </div>
            <div className="settings-container">
                <a href="/settings" className="settings-link">Settings</a>
            </div>
        </div>
    );
}