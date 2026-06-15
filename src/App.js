import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import DashboardCards from './components/DashboardCards';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import AttendanceTable from './components/AttendanceTable';
import DateSelector from './components/DateSelector';
import SearchFilter from './components/SearchFilter';
import QuickActions from './components/QuickActions';
import AttendanceStats from './components/AttendanceStats';
import RecentActivity from './components/RecentActivity';
import './App.css';

const App = () => {
  // Initialize state from localStorage
  const [students, setStudents] = useState(() => {
    const saved = localStorage.getItem('smartAttendance_students');
    return saved ? JSON.parse(saved) : [];
  });

  const [attendance, setAttendance] = useState(() => {
    const saved = localStorage.getItem('smartAttendance_attendance');
    return saved ? JSON.parse(saved) : {};
  });

  const [activities, setActivities] = useState(() => {
    const saved = localStorage.getItem('smartAttendance_activities');
    return saved ? JSON.parse(saved) : [];
  });

  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('smartAttendance_theme');
    return saved || 'light';
  });

  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem('smartAttendance_students', JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem('smartAttendance_attendance', JSON.stringify(attendance));
  }, [attendance]);

  useEffect(() => {
    localStorage.setItem('smartAttendance_activities', JSON.stringify(activities));
  }, [activities]);

  useEffect(() => {
    localStorage.setItem('smartAttendance_theme', theme);
    document.body.className = theme;
  }, [theme]);

  // Add activity
  const addActivity = (type, message) => {
    const newActivity = {
      type,
      message,
      time: new Date().toLocaleString()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 20));
  };

  // Student CRUD operations
  const addStudent = (student) => {
    // Check for duplicate roll number
    const exists = students.some(s => s.rollNumber.toLowerCase() === student.rollNumber.toLowerCase());
    if (exists) {
      return false;
    }

    const newStudent = {
      id: Date.now().toString(),
      ...student
    };
    setStudents(prev => [...prev, newStudent]);
    addActivity('add', `Added student: ${student.name} (${student.rollNumber})`);
    return true;
  };

  const editStudent = (id, updatedData) => {
    // Check for duplicate roll number (excluding current student)
    const exists = students.some(
      s => s.id !== id && s.rollNumber.toLowerCase() === updatedData.rollNumber.toLowerCase()
    );
    if (exists) {
      alert('Roll number already exists');
      return;
    }

    setStudents(prev =>
      prev.map(s => (s.id === id ? { ...s, ...updatedData } : s))
    );
    addActivity('edit', `Updated student: ${updatedData.name}`);
  };

  const deleteStudent = (id) => {
    const student = students.find(s => s.id === id);
    if (window.confirm(`Delete ${student.name}?`)) {
      setStudents(prev => prev.filter(s => s.id !== id));
      // Also remove from attendance records
      setAttendance(prev => {
        const updated = {};
        Object.keys(prev).forEach(date => {
          const dayAttendance = { ...prev[date] };
          delete dayAttendance[id];
          updated[date] = dayAttendance;
        });
        return updated;
      });
      addActivity('delete', `Deleted student: ${student.name}`);
    }
  };

  // Attendance operations
  const toggleAttendance = (studentId, status) => {
    setAttendance(prev => {
      const dayAttendance = prev[selectedDate] || {};
      const currentStatus = dayAttendance[studentId];

      // If clicking same status, remove it
      const newStatus = currentStatus === status ? null : status;

      return {
        ...prev,
        [selectedDate]: {
          ...dayAttendance,
          ...(newStatus ? { [studentId]: newStatus } : Object.fromEntries(
            Object.entries(dayAttendance).filter(([id]) => id !== studentId)
          ))
        }
      };
    });

    const student = students.find(s => s.id === studentId);
    addActivity(status, `Marked ${student.name} as ${status}`);
  };

  const markAllPresent = () => {
    if (students.length === 0) return;

    const dayAttendance = {};
    students.forEach(s => {
      dayAttendance[s.id] = 'present';
    });

    setAttendance(prev => ({
      ...prev,
      [selectedDate]: dayAttendance
    }));

    addActivity('present', `Marked all students present for ${selectedDate}`);
  };

  const markAllAbsent = () => {
    if (students.length === 0) return;

    const dayAttendance = {};
    students.forEach(s => {
      dayAttendance[s.id] = 'absent';
    });

    setAttendance(prev => ({
      ...prev,
      [selectedDate]: dayAttendance
    }));

    addActivity('absent', `Marked all students absent for ${selectedDate}`);
  };

  const resetAttendance = () => {
    if (window.confirm('Reset all attendance for today?')) {
      setAttendance(prev => {
        const updated = { ...prev };
        delete updated[selectedDate];
        return updated;
      });
      addActivity('absent', `Reset attendance for ${selectedDate}`);
    }
  };

  // Export to CSV
  const exportCSV = () => {
    if (students.length === 0) {
      alert('No students to export');
      return;
    }

    let csvContent = 'Roll Number,Name';
    const dates = Object.keys(attendance).sort();
    dates.forEach(date => {
      csvContent += `,${date}`;
    });
    csvContent += '\n';

    students.forEach(student => {
      let row = `${student.rollNumber},${student.name}`;
      dates.forEach(date => {
        const status = attendance[date]?.[student.id];
        row += `,${status || 'N/A'}`;
      });
      csvContent += row + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `attendance_${selectedDate}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    addActivity('export', 'Exported attendance to CSV');
  };

  // Theme toggle
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app ${theme}`}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      <main className="main-content">
        <DashboardCards students={students} attendance={attendance} selectedDate={selectedDate} />

        <div className="content-grid">
          <div className="left-panel">
            <StudentForm
              addStudent={addStudent}
              editStudent={editStudent}
              editingStudent={editingStudent}
              cancelEdit={() => setEditingStudent(null)}
            />
            <StudentList
              students={students}
              editStudent={setEditingStudent}
              deleteStudent={deleteStudent}
            />
            <RecentActivity activities={activities} />
          </div>

          <div className="right-panel">
            <DateSelector selectedDate={selectedDate} onDateChange={setSelectedDate} />
            <SearchFilter
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              filter={filter}
              setFilter={setFilter}
            />
            <QuickActions
              markAllPresent={markAllPresent}
              markAllAbsent={markAllAbsent}
              resetAttendance={resetAttendance}
              exportCSV={exportCSV}
            />
            <AttendanceTable
              students={students}
              attendance={attendance}
              selectedDate={selectedDate}
              toggleAttendance={toggleAttendance}
              searchTerm={searchTerm}
              filter={filter}
            />
            <AttendanceStats students={students} attendance={attendance} />
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2024 Smart Attendance System - Final Year Project</p>
      </footer>
    </div>
  );
};

export default App;
