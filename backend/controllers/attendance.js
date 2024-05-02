const pool = require('../db');

const getAllAttendance = async (req, res) => {
    try {
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM attendance_records');
        const attendance = result.rows;
        client.release();
        res.json(attendance);
    } catch (error) {
        console.error('Error retrieving attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const createAttendance = async (req, res) => {
    const { studentName, date, status } = req.body; 
    try {
        const client = await pool.connect();
        const result = await client.query('INSERT INTO attendance_records (student_name, date, status) VALUES ($1, $2, $3) RETURNING *', [studentName, date, status]); 
        const newAttendance = result.rows[0];
        client.release();
        res.status(201).json(newAttendance);
    } catch (error) {
        console.error('Error creating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const getAttendanceById = async (req, res) => {
    const id = req.params.id;
    try {
      const client = await pool.connect();
      const result = await client.query('SELECT * FROM attendance_records WHERE id = $1', [id]);
      const attendance = result.rows[0];
      client.release();
      res.json(attendance); 
    } catch (error) {
      console.error('Error fetching attendance by ID:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };



const updateAttendance = async (req, res) => {
    const id = req.params.id; 
    const { status } = req.body;
    try {
        const client = await pool.connect();
        const result = await client.query('UPDATE attendance_records SET status = $1 WHERE id = $2 RETURNING *', [status, id]); // Correct the query to use "id"
        const updatedAttendance = result.rows[0];
        client.release();
        res.json(updatedAttendance);
    } catch (error) {
        console.error('Error updating attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteAttendance = async (req, res) => {
    const id = req.params.id; 
    try {
        const client = await pool.connect();
        
        if (!id) {
            return res.status(400).json({ error: 'Invalid or missing id parameter' });
        }
        await client.query('DELETE FROM attendance_records WHERE student_id = $1', [id]); 
        client.release();
        res.json({ message: 'Attendance record deleted successfully' });
    } catch (error) {
        console.error('Error deleting attendance:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllAttendance,
    createAttendance,
    getAttendanceById,
    updateAttendance,
    deleteAttendance
};
