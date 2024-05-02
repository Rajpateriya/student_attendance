const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/attendanceRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/attendance', routes);

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
