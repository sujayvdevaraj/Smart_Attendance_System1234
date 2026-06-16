import React from 'react';
import { FaHistory, FaUserPlus, FaUserCheck, FaUserTimes, FaEdit, FaTrash } from 'react-icons/fa';

const RecentActivity = ({ activities }) => {
  const getActivityIcon = (type) => {
    switch (type) {
      case 'add':
        return <FaUserPlus className="icon-add" />;
      case 'edit':
        return <FaEdit className="icon-edit" />;
      case 'delete':
        return <FaTrash className="icon-delete" />;
      case 'present':
        return <FaUserCheck className="icon-present" />;
      case 'absent':
        return <FaUserTimes className="icon-absent" />;
      default:
        return <FaHistory />;
    }
  };

  if (activities.length === 0) {
    return null;
  }

  return (
    <div className="recent-activity">
      <h3><FaHistory /> Recent Activity</h3>
      <ul className="activity-list">
        {activities.slice(0, 5).map((activity, index) => (
          <li key={index} className={`activity-item ${activity.type}`}>
            <div className="activity-icon">
              {getActivityIcon(activity.type)}
            </div>
            <div className="activity-details">
              <p>{activity.message}</p>
              <span className="activity-time">{activity.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentActivity;
