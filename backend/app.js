const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const errorHandler = require('./middleware/error');

// Route files
const auth = require('./routes/authRoutes');
const books = require('./routes/bookRoutes');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', auth);
app.use('/api/books', books);

// Error handler
app.use(errorHandler);

module.exports = app;