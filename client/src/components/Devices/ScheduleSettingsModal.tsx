import React from 'react';

interface ScheduleSettingsModalProps {
    onClose: () => void;
    onRemove: () => void;
}

export default function ScheduleSettingsModal({
    onClose,
    onRemove
}: ScheduleSettingsModalProps) {
    const handleRemoveClick = () => {
        onRemove();
        onClose();
    };

    return (
        <div className="modal-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Schedule Settings</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <div className="modal-body">
                <button onClick={handleRemoveClick} className="confirm-add-device-button" style={{ backgroundColor: 'red' }}>Remove Schedule</button>                
                </div>
            </div>
        </div>
    );
}