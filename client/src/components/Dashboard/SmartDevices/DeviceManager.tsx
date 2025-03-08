import React from 'react';

interface DeviceManagerProps {
    formType: 'device' | 'schedule' | 'energyProduction';
    onClose: () => void;
}

export default function DeviceManager({ formType, onClose }: DeviceManagerProps) {
    const renderForm = () => {
        switch (formType) {
            case 'device':
                return <DeviceForm />;
            case 'schedule':
                return <ScheduleForm />;
            case 'energyProduction':
                return <EnergyProductionForm />;
            default:
                return null;
        }
    };

    return (
        <div className="device-manager">
            <button onClick={onClose}>Close</button>
            <div className="form-container">
                {renderForm()}
            </div>
        </div>
    );
}

function DeviceForm() {
    return (
        <form>
            <h2>Add Device</h2>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Type:
                <input type="text" name="type" />
            </label>
            <label>
                Status:
                <input type="text" name="status" />
            </label>
            <button type="submit">Add Device</button>
        </form>
    );
}

function ScheduleForm() {
    return (
        <form>
            <h2>Add Schedule</h2>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Device:
                <input type="text" name="device" />
            </label>
            <label>
                Instructions:
                <textarea name="instructions"></textarea>
            </label>
            <button type="submit">Add Schedule</button>
        </form>
    );
}

function EnergyProductionForm() {
    return (
        <form>
            <h2>Add Energy Production</h2>
            <label>
                Name:
                <input type="text" name="name" />
            </label>
            <label>
                Type:
                <input type="text" name="type" />
            </label>
            <label>
                Capacity:
                <input type="text" name="capacity" />
            </label>
            <button type="submit">Add Energy Production</button>
        </form>
    );
}