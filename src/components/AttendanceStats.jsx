import React from 'react';
import { FaExclamationTriangle, FaTrophy } from 'react-icons/fa';

const AttendanceStats = ({ students, attendance }) => {
  // Calculate attendance percentage for each student
  const getStudentAttendancePercentage = (studentId) => {
    const totalDays = Object.keys(attendance).length;
    if (totalDays === 0) return 0;

    let presentDays = 0;
    Object.values(attendance).forEach(dayAttendance => {
      if (dayAttendance[studentId] === 'present') {
        presentDays++;
      }
    });

    return ((presentDays / totalDays) * 100).toFixed(1);
  };

  if (students.length === 0) {
    return null;
  }

  return (
    <div className="attendance-stats">
      <h2>Student Attendance Statistics</h2>
      <div className="stats-table-wrapper">
        <table className="stats-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Attendance %</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => {
              const percentage = getStudentAttendancePercentage(student.id);
              const isLow = parseFloat(percentage) < 75;
              const isExcellent = parseFloat(percentage) >= 90;

              return (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <div className="percentage-bar">
                      <div
                        className="percentage-fill"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: isLow ? '#D32F2F' : isExcellent ? '#2E7D32' : '#1976D2'
                        }}
                      >
                        <span>{percentage}%</span>
                      </div>
                    </div>
                  </td>
                  <td>
                    {isLow && (
                      <span className="status-warning">
                        <FaExclamationTriangle /> Warning
                      </span>
                    )}
                    {isExcellent && (
                      <span className="status-excellent">
                        <FaTrophy /> Excellent
                      </span>
                    )}
                    {!isLow && !isExcellent && parseFloat(percentage) >= 75 && (
                      <span className="status-good">Good</span>
                    )}
                    {percentage == 0 && (
                      <span className="status-na">No Records</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceStats;
