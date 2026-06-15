import React from 'react';
import { FaUsers, FaUserCheck, FaUserTimes, FaPercentage } from 'react-icons/fa';

const DashboardCards = ({ students, attendance, selectedDate }) => {
  // Get today's attendance
  const todayAttendance = attendance[selectedDate] || {};
  const presentCount = Object.values(todayAttendance).filter(status => status === 'present').length;
  const absentCount = Object.values(todayAttendance).filter(status => status === 'absent').length;
  const totalStudents = students.length;

  // Calculate overall attendance percentage
  const calculateOverallPercentage = () => {
    if (students.length === 0) return 0;
    const totalPossible = students.length * Object.keys(attendance).length;
    if (totalPossible === 0) return 0;
    let totalPresent = 0;
    Object.values(attendance).forEach(dayAttendance => {
      totalPresent += Object.values(dayAttendance).filter(status => status === 'present').length;
    });
    return ((totalPresent / totalPossible) * 100).toFixed(1);
  };

  const cards = [
    {
      title: 'Total Students',
      value: totalStudents,
      icon: <FaUsers />,
      color: '#1976D2'
    },
    {
      title: 'Present Today',
      value: presentCount,
      icon: <FaUserCheck />,
      color: '#2E7D32'
    },
    {
      title: 'Absent Today',
      value: absentCount,
      icon: <FaUserTimes />,
      color: '#D32F2F'
    },
    {
      title: 'Attendance %',
      value: `${calculateOverallPercentage()}%`,
      icon: <FaPercentage />,
      color: '#FF9800'
    }
  ];

  return (
    <div className="dashboard-cards">
      {cards.map((card, index) => (
        <div className="card" key={index}>
          <div className="card-icon" style={{ color: card.color }}>
            {card.icon}
          </div>
          <div className="card-content">
            <h3>{card.title}</h3>
            <p className="card-value" style={{ color: card.color }}>
              {card.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardCards;
