import React, { useState } from 'react';
import { FaUserPlus, FaEdit } from 'react-icons/fa';

const StudentForm = ({ addStudent, editStudent, editingStudent, cancelEdit }) => {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [error, setError] = useState('');

  // Populate form when editing
  React.useEffect(() => {
    if (editingStudent) {
      setName(editingStudent.name);
      setRollNumber(editingStudent.rollNumber);
    } else {
      setName('');
      setRollNumber('');
    }
  }, [editingStudent]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !rollNumber.trim()) {
      setError('Please fill in all fields');
      return;
    }

    if (editingStudent) {
      editStudent(editingStudent.id, { name: name.trim(), rollNumber: rollNumber.trim() });
      cancelEdit();
    } else {
      const success = addStudent({ name: name.trim(), rollNumber: rollNumber.trim() });
      if (success) {
        setName('');
        setRollNumber('');
        setError('');
      } else {
        setError('Roll number already exists');
      }
    }
  };

  return (
    <div className="form-container">
      <h2>{editingStudent ? 'Edit Student' : 'Add New Student'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student Name</label>
          <input
            type="text"
            placeholder="Enter student name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Roll Number</label>
          <input
            type="text"
            placeholder="Enter roll number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">
            {editingStudent ? <FaEdit /> : <FaUserPlus />}
            {editingStudent ? 'Update Student' : 'Add Student'}
          </button>
          {editingStudent && (
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
