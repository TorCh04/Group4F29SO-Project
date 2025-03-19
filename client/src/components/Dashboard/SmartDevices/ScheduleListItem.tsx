import React, { useRef, useState } from 'react';

interface ScheduleListItemProps {
  item: { id: number; action: string; hour: number; minute: number };
  removeItem: (id: number) => void;
  updateItem: (id: number, updatedItem: { action: string; hour: number; minute: number }) => void;
}

const ScheduleListItem: React.FC<ScheduleListItemProps> = ({ item, removeItem, updateItem }) => {
  const hourInputRef = useRef<HTMLInputElement>(null);
  const minuteInputRef = useRef<HTMLInputElement>(null);
  const [hour, setHour] = useState(item.hour.toString());
  const [minute, setMinute] = useState(item.minute.toString());

  const handleActionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateItem(item.id, { ...item, action: e.target.value });
  };

  const handleHourChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setHour(value);
    if (value === '') {
      updateItem(item.id, { ...item, hour: 0 });
    } else {
      const hour = parseInt(value, 10);
      if (!isNaN(hour) && hour >= 0 && hour < 24) {
        updateItem(item.id, { ...item, hour });
      }
    }
  };

  const handleMinuteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setMinute(value);
    if (value === '') {
      updateItem(item.id, { ...item, minute: 0 });
    } else {
      const minute = parseInt(value, 10);
      if (!isNaN(minute) && minute >= 0 && minute < 60) {
        updateItem(item.id, { ...item, minute });
      }
    }
  };

  const handleBlurHour = () => {
    let parsedHour = parseInt(hour, 10);
    if (isNaN(parsedHour) || parsedHour < 0) {
      parsedHour = 0;
    } else if (parsedHour >= 24) {
      parsedHour = 23;
    }
    setHour(parsedHour.toString());
    updateItem(item.id, { ...item, hour: parsedHour });
  };
  
  const handleBlurMinute = () => {
    let parsedMinute = parseInt(minute, 10);
    if (isNaN(parsedMinute) || parsedMinute < 0) {
      parsedMinute = 0;
    } else if (parsedMinute >= 60) {
      parsedMinute = 59;
    }
    setMinute(parsedMinute.toString());
    updateItem(item.id, { ...item, minute: parsedMinute });
  };

  const incrementHour = () => {
    const newHour = (item.hour + 1) % 24;
    setHour(newHour.toString());
    updateItem(item.id, { ...item, hour: newHour });
  };

  const decrementHour = () => {
    const newHour = (item.hour - 1 + 24) % 24;
    setHour(newHour.toString());
    updateItem(item.id, { ...item, hour: newHour });
  };

  const incrementMinute = () => {
    const newMinute = (item.minute + 1) % 60;
    const newHour = item.minute + 1 === 60 ? (item.hour + 1) % 24 : item.hour;
    setMinute(newMinute.toString());
    setHour(newHour.toString());
    updateItem(item.id, { ...item, minute: newMinute, hour: newHour });
  };

  const decrementMinute = () => {
    const newMinute = (item.minute - 1 + 60) % 60;
    const newHour = item.minute - 1 < 0 ? (item.hour - 1 + 24) % 24 : item.hour;
    setMinute(newMinute.toString());
    setHour(newHour.toString());
    updateItem(item.id, { ...item, minute: newMinute, hour: newHour });
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    e.target.select();
  };

  return (
    <div className="schedule__instruction__list__item">
      <select className="schedule__instruction__dropdown" value={item.action} onChange={handleActionChange}>
        <option value="Action" disabled>Action</option>
        <option value="Turn On">Turn On</option>
        <option value="Turn Off">Turn Off</option>
      </select>
      <span>At</span>
      <input
        type="number"
        value={hour}
        onChange={handleHourChange}
        onFocus={handleFocus}
        onBlur={handleBlurHour}
        ref={hourInputRef}
        className="list__spinner__box no-spinner"
      />
      <div className="spinner__container">
        <button type="button" onClick={incrementHour}>▲</button>
        <button type="button" onClick={decrementHour}>▼</button>
      </div>
      <span>At</span>
      <input
        type="number"
        value={minute}
        onChange={handleMinuteChange}
        onFocus={handleFocus}
        onBlur={handleBlurMinute}
        ref={minuteInputRef}
        className="list__spinner__box no-spinner"
      />
      <div className="spinner__container">
        <button type="button" onClick={incrementMinute}>▲</button>
        <button type="button" onClick={decrementMinute}>▼</button>
      </div>
      <button className="schedule__list__remove" type="button" onClick={() => removeItem(item.id)}>X</button>
    </div>
  );
};

export default ScheduleListItem;