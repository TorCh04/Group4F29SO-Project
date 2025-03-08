import AddDeviceBlock from './AddDeviceBlock';

interface DevicesSectionProps {
    onAddDeviceClick: () => void;
}

export default function DevicesSection({ onAddDeviceClick }: DevicesSectionProps) {
    return (
        <div>
            <h1 className="devices__heading">Smart Devices</h1>
            <AddDeviceBlock onClick={onAddDeviceClick} />
        </div>
    );
}