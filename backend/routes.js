// routes.js
const express = require('express');
const router = express.Router();
const attendanceController = require('./controllers/attendance');

router.put('/attendance/:id', attendanceController.updateAttendance);
router.delete('/attendance/:id', attendanceController.deleteAttendance);

module.exports = router;
