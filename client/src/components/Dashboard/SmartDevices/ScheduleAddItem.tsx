import React from 'react';

interface ScheduleAddItemProps {
  addItem: () => void;
}

const ScheduleAddItem: React.FC<ScheduleAddItemProps> = ({ addItem }) => {
  return <button type="button" onClick={addItem}>Add Item</button>;
};

export default ScheduleAddItem;