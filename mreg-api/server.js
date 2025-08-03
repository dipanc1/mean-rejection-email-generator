const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

const searchRouter = require('./routes/search');
const authRouter = require('./routes/auth');

const protect = require('./middleware/authMiddleware');

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log('Connected to MongoDB Atlas');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error);
    });

app.get('/api/health', (req, res) => {
    res.status(200).json({ message: 'API is healthy' });
});

app.use('/api/auth', authRouter);
app.use('/api/search-companies', protect, searchRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});