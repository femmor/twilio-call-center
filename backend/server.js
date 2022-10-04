const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const twilio = require('./Twilio');

// Initialize the app
const app = express();
const server = http.createServer(app);
const socket = socketIo(server);
const client = twilio.instance;

socket.on('connection', socket => {
  console.log('Socket connected', socket);
});

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.post('/login', async (req, res) => {
  // Receive verification code from twilio
  const { to, username, channel } = req.body;
  try {
    const data = await client.sendVerifyAsync(to, channel);
    res.send(data);
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/verify', async (req, res) => {
  // Send back verification code from twilio
  const { to, code } = req.body;

  try {
    const data = await client.verifyCodeAsync(to, code);
    res.send(data);
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
