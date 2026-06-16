import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const DateSelector = ({ selectedDate, onDateChange }) => {
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="date-selector">
      <FaCalendarAlt className="date-icon" />
      <label>Select Date: </label>
      <input
        type="date"
        value={selectedDate}
        onChange={(e) => onDateChange(e.target.value)}
        max={today}
      />
    </div>
  );
};

export default DateSelector;
