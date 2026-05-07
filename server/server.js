const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './.env' });

// Connect to database
connectDB();

// Route files
const auth = require('./routes/auth');
const modules = require('./routes/modules');
const experiments = require('./routes/experiments');
const projects = require('./routes/projects');
const quiz = require('./routes/quiz');
const dashboard = require('./routes/dashboard');

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors());

// Set static folder (serve client)
app.use(express.static(path.join(__dirname, '../client')));

// Mount routers
app.use('/api/auth', auth);
app.use('/api/modules', modules);
app.use('/api/experiments', experiments);
app.use('/api/projects', projects);
app.use('/api/quiz', quiz);
app.use('/api/dashboard', dashboard);

// Fallback to index.html for any other route (SPA-like)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
