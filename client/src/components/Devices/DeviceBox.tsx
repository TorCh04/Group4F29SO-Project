import React, { useState } from 'react';

interface DeviceBoxProps {
    initialName: string;
    initialImage: string;
    onOpenSettings: () => void;
}

export default function DeviceBox({ initialName, initialImage, onOpenSettings }: DeviceBoxProps) {
    const [isSliderOn, setIsSliderOn] = useState(false); // State for slider
    const [text, setText] = useState(initialName); // State for text under the image
    const [image, setImage] = useState(initialImage); // State for image

    return (
        <div className={`device-box ${isSliderOn ? 'device-box-on' : 'device-box-off'}`}>
            <img src={initialImage} alt={initialName} />
            <p>{initialName}</p>
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
                <a href="#" className="settings-link" onClick={onOpenSettings}>Settings</a>
            </div>
        </div>
    );
}