import plusIcon from '../assets/plus.svg';

interface AddDeviceBlockProps {
    onClick: () => void;
}

export default function AddDeviceBlock({ onClick }: AddDeviceBlockProps) {
    return (
        <div className="device__block add__device__block" onClick={onClick}>
            <img src={plusIcon} alt="Add Device" className="add__device__block__image"/>
            <p className="device__block__text">Add Device</p>
        </div>
    );
}