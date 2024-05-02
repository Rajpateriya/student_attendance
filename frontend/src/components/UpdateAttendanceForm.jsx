import React, { useState } from 'react';
import axios from 'axios';

function UpdateAttendanceForm({ attendance, onUpdate }) {
  const [status, setStatus] = useState(attendance.status || '');

  const handleUpdate = async () => {
    try {
      if (!attendance || !attendance.id) {
        console.error('Attendance data or ID not provided');
        return;
      }

      const response = await axios.put(`http://localhost:3000/api/attendance/${attendance.id}`, { status });
      onUpdate(response.data);
    } catch (error) {
      console.error('Error updating attendance record:', error);
      
    }
  };

  return (
    <div>
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>
          <option value="absent">Absent</option>
        </select>
      </label>
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}

export default UpdateAttendanceForm;


