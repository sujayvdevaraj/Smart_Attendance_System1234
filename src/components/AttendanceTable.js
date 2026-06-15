import React from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa';

const AttendanceTable = ({
  students,
  attendance,
  selectedDate,
  toggleAttendance,
  searchTerm,
  filter
}) => {
  // Get attendance for selected date
  const dayAttendance = attendance[selectedDate] || {};

  // Filter and search students
  const filteredStudents = students.filter(student => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const status = dayAttendance[student.id];
    const matchesFilter =
      filter === 'all' ||
      (filter === 'present' && status === 'present') ||
      (filter === 'absent' && status === 'absent') ||
      (filter === 'all' && !status);

    return matchesSearch && matchesFilter;
  });

  if (students.length === 0) {
    return null;
  }

  return (
    <div className="attendance-table-container">
      <h2>Attendance - {selectedDate}</h2>
      <div className="attendance-table-wrapper">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Student Name</th>
              <th>Roll Number</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => {
              const status = dayAttendance[student.id];
              return (
                <tr key={student.id} className={status || ''}>
                  <td>{index + 1}</td>
                  <td>{student.name}</td>
                  <td>{student.rollNumber}</td>
                  <td>
                    <span className={`status-badge ${status || 'not-marked'}`}>
                      {status === 'present' && <><FaCheck /> Present</>}
                      {status === 'absent' && <><FaTimes /> Absent</>}
                      {!status && 'Not Marked'}
                    </span>
                  </td>
                  <td>
                    <div className="attendance-actions">
                      <button
                        className={`btn-status btn-present ${status === 'present' ? 'active' : ''}`}
                        onClick={() => toggleAttendance(student.id, 'present')}
                      >
                        <FaCheck />
                      </button>
                      <button
                        className={`btn-status btn-absent ${status === 'absent' ? 'active' : ''}`}
                        onClick={() => toggleAttendance(student.id, 'absent')}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {filteredStudents.length === 0 && students.length > 0 && (
        <p className="no-results">No students match your search criteria</p>
      )}
    </div>
  );
};

export default AttendanceTable;
