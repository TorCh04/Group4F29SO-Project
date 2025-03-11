import { useEffect, useState } from 'react';
import AddEnergySourceBlock from './AddEnergySourceBlock';
import EnergyProductionBlock from './EnergyProductionBlock';
import { EnergySource, EnergyProductionSectionProps } from '../../../types';

export default function EnergyProductionSection({ onAddEnergySourceClick, setFetchEnergySources }: EnergyProductionSectionProps) {
    const [energySources, setEnergySources] = useState<EnergySource[]>([]);

    const fetchEnergySources = async () => {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:8080/getEnergySources', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setEnergySources(data.energySources); // Ensure the property name matches the server response
    };

    useEffect(() => {
        fetchEnergySources();
        setFetchEnergySources(fetchEnergySources);
    }, []);

    const handleToggleStatus = async (energySourceId: string) => {
        const token = localStorage.getItem('token');
        await fetch(`http://localhost:8080/toggleEnergySourceStatus/${energySourceId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        setEnergySources(energySources.map(energySource => 
            energySource._id === energySourceId ? { ...energySource, status: energySource.status === 'Connected' ? 'Not Connected' : 'Connected' } : energySource
        ));
    };

    return (
        <>
            <h1 className="devices__heading">Smart Devices</h1>
            <div className="devices__container">
                {energySources.map(energySource => (
                    <EnergyProductionBlock
                        key={energySource._id}
                        name={energySource.name}
                        type={energySource.type}
                        status={energySource.status}
                        onToggleStatus={() => handleToggleStatus(energySource._id)}
                    />
                ))}
                <AddEnergySourceBlock onClick={onAddEnergySourceClick} />
            </div>
        </>
    );
}