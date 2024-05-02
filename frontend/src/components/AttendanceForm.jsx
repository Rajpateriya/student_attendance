import React, { useState } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%',
    maxWidth: 400,
    marginTop: theme.spacing(2),
  },
  formControl: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  button: {
    marginTop: theme.spacing(2),
  },
}));

function AttendanceForm() {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    studentName: '',
    status: 'present',
    date: new Date().toISOString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/attendance', formData);
      console.log('Attendance record created:', response.data);
    } catch (error) {
      console.error('Error creating attendance record:', error);
    }
  };

  return (
    <div className={classes.root}>
      <h2>Mark Attendance</h2>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          className={classes.formControl}
          label="Student Name"
          variant="outlined"
          name="studentName"
          value={formData.studentName}
          onChange={handleChange}
          required
        />
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel>Status</InputLabel>
          <Select
            label="Status"
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >

            
            <MenuItem value="present">Present</MenuItem>
            <MenuItem value="absent">Absent</MenuItem>
          </Select>
        </FormControl>
        <Button className={classes.button} variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AttendanceForm;
