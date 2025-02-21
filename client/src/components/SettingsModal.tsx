import React from 'react';
import '../App.css';

interface SettingsModalProps {
    onClose: () => void;
}

export default function SettingsModal({ onClose }: SettingsModalProps) {
    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-content">
                <div className="modal-header">
                    <h2>Settings</h2>
                    <button onClick={onClose} className="close-modal-button">X</button>
                </div>
                <div className="modal-body">
                    {/* Add your settings form or content here */}
                    <p>Settings content goes here...</p>
                </div>
            </div>
        </div>
    );
}