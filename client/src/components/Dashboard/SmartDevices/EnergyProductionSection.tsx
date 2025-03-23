import { useEffect, useState } from 'react';
import AddEnergySourceBlock from './AddEnergySourceBlock';
import EnergyProductionBlock from './EnergyProductionBlock';
import { EnergySource, EnergyProductionSectionProps } from '../../../types';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function EnergyProductionSection({ onAddEnergySourceClick, setFetchEnergySources }: EnergyProductionSectionProps) {
  const [energySources, setEnergySources] = useState<EnergySource[]>([]);

  const fetchEnergySources = async () => {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_BASE_URL}/getEnergySources`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    setEnergySources(data.energySources); // Ensure the property name matches the server response
  };

  useEffect(() => {
    fetchEnergySources();
    setFetchEnergySources(fetchEnergySources);
  }, [setFetchEnergySources]);

  const handleToggleStatus = async (energySourceId: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/toggleEnergySourceStatus/${energySourceId}`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setEnergySources(
      energySources.map((energySource) =>
        energySource._id === energySourceId
          ? { ...energySource, status: energySource.status === 'Connected' ? 'Not Connected' : 'Connected' }
          : energySource
      )
    );
  };

  const handleRemove = async (energySourceId: string) => {
    const token = localStorage.getItem('token');
    await fetch(`${API_BASE_URL}/removeEnergySource`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ energySourceId }),
    });

    setEnergySources(energySources.filter((energySource) => energySource._id !== energySourceId));
  };

  return (
    <>
      <h1 className="devices__heading">Energy Production Devices</h1>
      <div className="devices__container">
        {energySources.map((energySource) => (
          <EnergyProductionBlock
            key={energySource._id}
            _id={energySource._id}
            name={energySource.name}
            type={energySource.type}
            status={energySource.status}
            onToggleStatus={() => handleToggleStatus(energySource._id)}
            onRemove={handleRemove} // Pass the remove handler
          />
        ))}
        <AddEnergySourceBlock onClick={onAddEnergySourceClick} />
      </div>
    </>
  );
}