import React from 'react';
import { FaCheckDouble, FaTimes, FaRedo, FaFileExport } from 'react-icons/fa';

const QuickActions = ({ markAllPresent, markAllAbsent, resetAttendance, exportCSV }) => {
  return (
    <div className="quick-actions">
      <h3>Quick Actions</h3>
      <div className="action-buttons">
        <button className="btn btn-success" onClick={markAllPresent}>
          <FaCheckDouble /> Mark All Present
        </button>
        <button className="btn btn-danger" onClick={markAllAbsent}>
          <FaTimes /> Mark All Absent
        </button>
        <button className="btn btn-warning" onClick={resetAttendance}>
          <FaRedo /> Reset Today
        </button>
        <button className="btn btn-info" onClick={exportCSV}>
          <FaFileExport /> Export CSV
        </button>
      </div>
    </div>
  );
};

export default QuickActions;
