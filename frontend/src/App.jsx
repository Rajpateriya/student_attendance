// src/App.js
import React from 'react';
import AttendanceForm from './components/AttendanceForm';
import AttendanceList from './components/AttendanceList';
import ClassSelector from './components/ClassSelector';
// import UpdateAttendanceForm from './components/UpdateAttendanceForm';


function App() {
  return (
    <div className="app-container">
      <h1>Student Attendance System</h1>
      <ClassSelector />
      <AttendanceForm />
      <AttendanceList />
      
    </div>
  );
}

export default App;
