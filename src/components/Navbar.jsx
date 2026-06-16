import React from 'react';
import { FaUserGraduate } from 'react-icons/fa';
import ThemeToggle from './ThemeToggle.jsx';

const Navbar = ({ theme, toggleTheme }) => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <FaUserGraduate className="navbar-icon" />
        <h1>Smart Attendance</h1>
      </div>
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </nav>
  );
};

export default Navbar;
