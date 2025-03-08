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