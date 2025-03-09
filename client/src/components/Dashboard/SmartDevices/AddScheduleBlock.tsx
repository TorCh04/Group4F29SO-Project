import AddBlock from './AddBlock';
import plusIcon from '../../../assets/plus.svg';

interface AddScheduleBlockProps {
    onClick: () => void;
}

export default function AddScheduleBlock({ onClick }: AddScheduleBlockProps) {
    return (
        <AddBlock onClick={onClick} text="Add Schedule" icon={plusIcon} />
    );
}