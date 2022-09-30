const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// Service tokens
const { PHONE_NUMBER } = require('./Twilio');

// Initialize the app
const app = express();

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/home', (req, res) => {
  res.send('Welcome to Twilio!');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
