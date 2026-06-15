# Smart Attendance - Student Attendance Management System

A clean, practical Student Attendance Management System built with React.js. This project is designed as a final-year engineering student project - simple enough to understand and explain, yet impressive enough to showcase in interviews.

## Features

### Student Management
- Add new students (Name + Roll Number)
- Edit student details
- Delete students
- Prevents duplicate roll numbers

### Attendance Marking
- Mark students as Present/Absent
- Toggle buttons per student
- Color-coded status (Green = Present, Red = Absent)

### Bulk Actions
- Mark all students present
- Mark all students absent
- Reset today's attendance

### Dashboard Summary
- Total Students count
- Present Today count
- Absent Today count
- Overall Attendance Percentage

### Date-wise Attendance
- Select any date using date picker
- View and edit attendance for any date
- Attendance stored separately per date in localStorage

### Search & Filter
- Search by student name or roll number
- Filter by: All, Present, or Absent

### Attendance Statistics
- Calculate attendance percentage per student
- Warning badge if attendance < 75%
- Excellent badge if attendance > 90%
- Visual percentage bars

### Additional Features
- **Export to CSV**: Download attendance data as CSV file
- **Dark/Light Mode**: Toggle theme with smooth transitions
- **Recent Activity**: View last 5 actions
- **Responsive Design**: Works on mobile, tablet, laptop, and desktop
- **Data Persistence**: All data saved in localStorage

## Tech Stack

- **React.js** (Functional Components)
- **JavaScript** (ES6+)
- **CSS** (CSS Variables, Flexbox, Grid)
- **localStorage** (Data persistence)
- **react-icons** (Icon library)

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation

1. Clone or download this repository

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Open your browser and navigate to:
```
http://localhost:3000
```

## Project Structure

```
smart-attendance/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── Navbar.js
│   │   ├── ThemeToggle.js
│   │   ├── StudentForm.js
│   │   ├── StudentList.js
│   │   ├── DashboardCards.js
│   │   ├── DateSelector.js
│   │   ├── SearchFilter.js
│   │   ├── AttendanceTable.js
│   │   ├── AttendanceStats.js
│   │   ├── QuickActions.js
│   │   └── RecentActivity.js
│   ├── App.js
│   ├── App.css
│   └── index.js
├── package.json
└── README.md
```

## Component Description

| Component | Purpose |
|-----------|---------|
| Navbar | Top navigation bar with logo and theme toggle |
| ThemeToggle | Button to switch between dark and light mode |
| StudentForm | Form to add/edit students |
| StudentList | Display all students with edit/delete options |
| DashboardCards | Summary cards showing key metrics |
| DateSelector | Date picker for selecting attendance date |
| SearchFilter | Search box and filter buttons |
| AttendanceTable | Table showing students with attendance actions |
| AttendanceStats | Statistics table with percentage bars |
| QuickActions | Bulk action buttons |
| RecentActivity | List of recent actions taken |

## Data Storage

All data is stored in browser's localStorage:
- `smartAttendance_students` - List of all students
- `smartAttendance_attendance` - Attendance records by date
- `smartAttendance_activities` - Recent activity log
- `smartAttendance_theme` - User's theme preference

## Key Features for Interviews

1. **CRUD Operations**: Create, Read, Update, Delete students
2. **State Management**: useState and useEffect hooks
3. **Data Persistence**: localStorage integration
4. **Component Architecture**: Reusable, modular components
5. **Responsive Design**: Mobile-first approach
6. **Dark Mode**: Theme switching with CSS variables
7. **Search & Filter**: Filtering and searching functionality
8. **CSV Export**: Data export feature
9. **Date-wise Tracking**: Historical attendance records
10. **Percentage Calculations**: Dynamic statistics

## Scripts

- `npm start` - Run development server
- `npm build` - Build for production
- `npm test` - Run tests

## Browser Support

Works in all modern browsers:
- Chrome
- Firefox
- Safari
- Edge

## License

This project is open-source and free to use for educational purposes.

---

**Developed as a Final Year Engineering Project**
