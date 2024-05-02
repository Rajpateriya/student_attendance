import React from 'react';
import axios from 'axios';

function DeleteAttendanceButton({ id, onDelete }) {
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/attendance/${id}`);
      onDelete(id);
    } catch (error) {
      console.error('Error deleting attendance record:', error);
    }
  };

  return (
    <button onClick={handleDelete}>Delete</button>
  );
}

export default DeleteAttendanceButton;
