import React, { useState } from 'react';
import ScheduleSettingsModal from './ScheduleSettingsModal';

interface ScheduleBoxProps {
    initialTitle: string;
    initialRoom: string;
    initialDevice: string;
    initialAction: string;
    initialTime: string;
    onRemove: () => void;
}

export default function ScheduleBox({
    initialTitle,
    onRemove
}: ScheduleBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false);
    const [isSettingsModalOpen, setIsSettingsModalOpen] = useState(false);

    const handleOpenSettingsModal = () => {
        setIsSettingsModalOpen(true);
    };

    const handleCloseSettingsModal = () => {
        setIsSettingsModalOpen(false);
    };

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
                <a href="#" className="settings-link" onClick={handleOpenSettingsModal}>Settings</a>
            </div>
            {isSettingsModalOpen && (
                <ScheduleSettingsModal
                    onClose={handleCloseSettingsModal}
                    onRemove={onRemove}
                />
            )}
        </div>
    );
}