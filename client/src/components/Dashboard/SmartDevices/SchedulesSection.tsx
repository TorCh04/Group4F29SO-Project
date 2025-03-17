import { useEffect, useState } from 'react';
import AddScheduleBlock from './AddScheduleBlock';
import ScheduleBlock from './ScheduleBlock';
import { Schedule, SchedulesSectionProps } from '../../../types';

export default function SchedulesSection({ onAddScheduleClick, setFetchSchedules }: SchedulesSectionProps) {
    const [schedules, setSchedules] = useState<Schedule[]>([]);

    const fetchSchedules = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/getSchedules', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setSchedules(data.schedules); // Ensure the property name matches the server response
    };

    useEffect(() => {
        fetchSchedules();
        setFetchSchedules(fetchSchedules);
    }, [setFetchSchedules]);

    const handleToggleStatus = async (scheduleId: string) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8080/toggleScheduleStatus/${scheduleId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        setSchedules(schedules.map(schedule => 
            schedule._id === scheduleId ? { ...schedule, status: schedule.status === 'Active' ? 'Inactive' : 'Active' } : schedule
        ));
    };

    return (
        <>
            <h1 className="devices__heading">Schedules</h1>
            <div className="devices__container">
                {schedules.map(schedule => (
                    <ScheduleBlock
                        key={schedule._id}
                        name={schedule.name}
                        status={schedule.status}
                        device={schedule.device}
                        instructions={schedule.instructions}
                        onToggleStatus={() => handleToggleStatus(schedule._id)}
                    />
                ))}
                <AddScheduleBlock onClick={onAddScheduleClick} />
            </div>
        </>
    );
}