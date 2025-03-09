import AddBlock from './AddBlock';
import plusIcon from '../../../assets/plus.svg';

interface AddEnergySourceBlockProps {
    onClick: () => void;
}

export default function AddEnergySourceBlock({ onClick }: AddEnergySourceBlockProps) {
    return (
        <AddBlock onClick={onClick} text="Add Energy Source" icon={plusIcon} />
    );
}