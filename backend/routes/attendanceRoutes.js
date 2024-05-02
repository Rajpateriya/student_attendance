const express = require('express');
const router = express.Router();
const { getAllAttendance, createAttendance, updateAttendance, deleteAttendance ,getAttendanceById} = require('../controllers/attendance');

router.get('/', getAllAttendance);
router.get('/:id', getAttendanceById);
router.post('/', createAttendance);
router.put('/:id', updateAttendance);
router.delete('/:id', deleteAttendance);

module.exports = router;
