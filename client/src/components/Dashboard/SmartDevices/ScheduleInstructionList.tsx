import React from 'react';
import ScheduleListItem from './ScheduleListItem';
import ScheduleAddItem from './ScheduleAddItem';

interface ScheduleInstructionListProps {
  instructions: { id: number; action: string; hour: number; minute: number }[];
  setInstructions: React.Dispatch<React.SetStateAction<{ id: number; action: string; hour: number; minute: number }[]>>;
}

const ScheduleInstructionList: React.FC<ScheduleInstructionListProps> = ({ instructions, setInstructions }) => {
  const addItem = () => {
    setInstructions([...instructions, { id: Date.now(), action: 'Action', hour: 0, minute: 0 }]);
  };

  const removeItem = (id: number) => {
    setInstructions(instructions.filter(item => item.id !== id));
  };

  const updateItem = (id: number, updatedItem: { action: string; hour: number; minute: number }) => {
    setInstructions(instructions.map(item => (item.id === id ? { ...item, ...updatedItem } : item)));
  };

  return (
    <div className="schedule__instruction__list">
      {instructions.map(item => (
        <ScheduleListItem key={item.id} item={item} removeItem={removeItem} updateItem={updateItem} />
      ))}
      <ScheduleAddItem addItem={addItem} />
    </div>
  );
};

export default ScheduleInstructionList;