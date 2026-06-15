import React from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

const ThemeToggle = ({ theme, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {theme === 'light' ? (
        <>
          <FaMoon />
          <span>Dark</span>
        </>
      ) : (
        <>
          <FaSun />
          <span>Light</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
