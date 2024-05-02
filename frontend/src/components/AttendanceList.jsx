import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Paper, Table, TableHead, TableBody, TableRow, TableCell, Button, CircularProgress } from '@material-ui/core';
import UpdateAttendanceForm from './UpdateAttendanceForm';
import DeleteAttendanceButton from './DeleteAttendanceButton';

function AttendanceList() {
  const [attendanceData, setAttendanceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAttendanceRecords();
  }, []);

  const fetchAttendanceRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/attendance');
      setAttendanceData(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance records:', error);
      setError(error);
      setLoading(false);
    }
  };

  const handleUpdate = (updatedAttendance) => {
    const updatedData = attendanceData.map(record => {
      if (record.id === updatedAttendance.id) {
        return updatedAttendance;
      }
      return record;
    });
    setAttendanceData(updatedData);
  };

  const handleDelete = (id) => {
    const updatedData = attendanceData.filter(record => record.id !== id);
    setAttendanceData(updatedData);
  };

  const handleReload = async () => {
    setLoading(true); 
    try {
      await fetchAttendanceRecords(); 
    } catch (error) {
      console.error('Error reloading attendance records:', error);
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="attendance-list">
      <h2>Attendance Records</h2>
      <Button variant="contained" color="primary" onClick={handleReload}>Reload</Button>
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Student Name</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {attendanceData.map((record) => (
              <TableRow key={record.id}>
                <TableCell>{record.student_name}</TableCell>
                <TableCell>{record.status}</TableCell>
                <TableCell>{record.date}</TableCell>
                <TableCell>
                  <UpdateAttendanceForm attendance={record} onUpdate={handleUpdate} />
                  <DeleteAttendanceButton id={record.id} onDelete={handleDelete} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}

export default AttendanceList;
