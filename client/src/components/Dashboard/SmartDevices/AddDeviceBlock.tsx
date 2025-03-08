import AddBlock from './AddBlock';
import plusIcon from '../../../assets/plus.svg';

interface AddDeviceBlockProps {
    onClick: () => void;
}

export default function AddDeviceBlock({ onClick }: AddDeviceBlockProps) {
    return (
        <AddBlock onClick={onClick} text="Add Device" icon={plusIcon} />
    );
}