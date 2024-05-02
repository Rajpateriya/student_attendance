// AttendanceDetail.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateAttendanceForm from './UpdateAttendanceForm';

function AttendanceDetail({ attendanceId }) {
  const [attendance, setAttendance] = useState(null);

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/attendance/${attendanceId}`);
        setAttendance(response.data);
      } catch (error) {
        console.error('Error fetching attendance:', error);
      }
    };

    fetchAttendance();
  }, [attendanceId]);

  return (
    <div>
      <h1>Attendance Detail</h1>
      {attendance && <UpdateAttendanceForm attendance={attendance} />}
    </div>
  );
}

export default AttendanceDetail;
