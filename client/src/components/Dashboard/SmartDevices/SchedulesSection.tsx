import AddScheduleBlock from './AddScheduleBlock';

interface SchedulesSectionProps {
    onAddSchedulesClick: () => void;
}

export default function SchedulesSection({ onAddSchedulesClick }: SchedulesSectionProps) {
    return (
        <div>
            <h1 className="devices__heading">Smart Schedules</h1>
            <AddScheduleBlock onClick={onAddSchedulesClick} />
        </div>
    );
}