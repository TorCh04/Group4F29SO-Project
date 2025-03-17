export { default as AddDeviceBlock } from '../components/Dashboard/SmartDevices/AddDeviceBlock';
export { default as AddEnergyProductionBlock } from '../components/Dashboard/SmartDevices/AddEnergySourceBlock';
export { default as AddScheduleBlock } from '../components/Dashboard/SmartDevices/AddScheduleBlock';
export { default as DeviceManager } from '../components/Dashboard/SmartDevices/DeviceManager';
export { default as AddBlock } from '../components/Dashboard/SmartDevices/AddBlock';

export type FormType = 'device' | 'schedule' | 'energyProduction';

export interface AddBlockProps {
    onClick: () => void;
    text: string;
    icon: string;
}

export interface Device {
    _id: string;
    name: string;
    type: string;
    status: string;
}

export interface EnergySource {
    _id: string;
    name: string;
    type: string;
    status: string;
}

export interface Instruction {
    action: string;
    hour: number;
    minute: number;
}

export interface Schedule {
    _id: string;
    name: string;
    device: Device;
    instructions: Instruction[];
    status: string;
}

export interface DevicesSectionProps {
    onAddDeviceClick: () => void;
    setFetchDevices: (fetchDevices: () => void) => void;
}

export interface EnergyProductionSectionProps {
    onAddEnergySourceClick: () => void;
    setFetchEnergySources: (fetchEnergySources: () => void) => void;
}

export interface SchedulesSectionProps {
    onAddScheduleClick: () => void;
    setFetchSchedules: (fetchSchedules: () => void) => void;
}