import AddEnergySourceBlock from './AddEnergySourceBlock';

interface EnergyProductionSectionProps {
    onAddEnergySourceClick: () => void;
}

export default function EnergyProduction({ onAddEnergySourceClick }: EnergyProductionSectionProps) {
    return (
        <>
            <h1 className="devices__heading">Add Energy Source</h1>
            <AddEnergySourceBlock onClick={onAddEnergySourceClick} />
        </>
    );
}