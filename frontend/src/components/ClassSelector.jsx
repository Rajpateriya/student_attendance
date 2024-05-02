// src/components/ClassSelector.js
import React, { useState } from 'react';

function ClassSelector() {
  const [selectedClass, setSelectedClass] = useState('');

  const handleChange = (e) => {
    setSelectedClass(e.target.value);
    // Implement logic to fetch attendance records for the selected class
    console.log('Selected class:', e.target.value);
  };

  return (
    <div className="class-selector">
      <h2>Select Class/Grade</h2>
      <select value={selectedClass} onChange={handleChange}>
        <option value="">Select Class</option>
        <option value="class1">Class 1</option>
        <option value="class2">Class 2</option>
      </select>
    </div>
  );
}

export default ClassSelector;
