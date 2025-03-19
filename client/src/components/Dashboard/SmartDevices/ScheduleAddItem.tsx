import React from 'react';

interface ScheduleAddItemProps {
  addItem: () => void;
}

const ScheduleAddItem: React.FC<ScheduleAddItemProps> = ({ addItem }) => {
  return <button type="button" className="schedule__table__add__button" onClick={addItem}>Add Item</button>;
};

export default ScheduleAddItem;