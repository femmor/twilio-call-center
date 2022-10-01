const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const twilio = require('./Twilio');

// Initialize the app
const app = express();
const client = twilio.instance;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.get('/login', async (req, res) => {
  // Receive verification code from twilio
  try {
    const data = await client.sendVerifyAsync(process.env.MOBILE, 'sms');
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.get('/verify', async (req, res) => {
  // Send back verification code from twilio
  try {
    const data = await client.verifyCodeAsync(
      process.env.MOBILE,
      req.query.code
    );
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
