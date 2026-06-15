import React from 'react';
import { FaEdit, FaTrash, FaUser } from 'react-icons/fa';

const StudentList = ({ students, editStudent, deleteStudent }) => {
  if (students.length === 0) {
    return (
      <div className="empty-state">
        <FaUser className="empty-icon" />
        <p>No students added yet</p>
      </div>
    );
  }

  return (
    <div className="student-list-container">
      <h2>Student List ({students.length})</h2>
      <div className="student-list">
        {students.map((student) => (
          <div className="student-card" key={student.id}>
            <div className="student-info">
              <FaUser className="student-avatar" />
              <div>
                <h4>{student.name}</h4>
                <p>Roll No: {student.rollNumber}</p>
              </div>
            </div>
            <div className="student-actions">
              <button
                className="btn-icon btn-edit"
                onClick={() => editStudent(student)}
                title="Edit"
              >
                <FaEdit />
              </button>
              <button
                className="btn-icon btn-delete"
                onClick={() => deleteStudent(student.id)}
                title="Delete"
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StudentList;
