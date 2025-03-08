import AddBlock from './AddBlock';
import plusIcon from '../../../assets/plus.svg';

interface AddEnergyProductionBlockProps {
    onClick: () => void;
}

export default function AddEnergyProductionBlock({ onClick }: AddEnergyProductionBlockProps) {
    return (
        <AddBlock onClick={onClick} text="Add Energy Source" icon={plusIcon} />
    );
}