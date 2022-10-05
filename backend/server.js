const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const http = require('http');
const socketIo = require('socket.io');
const jwt = require('./utils/jwt');
const twilio = require('./Twilio');

// Initialize the app
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const client = twilio.instance;

// Middleware
app.use(cors());
app.options('*', cors());
app.use(express.json());
app.use(morgan('dev'));

io.on('connection', socket => {
  socket.on('disconnect', () => {
    console.log('Socket disconnected', socket.id);
  });
});

// Routes
app.post('/login', async (req, res) => {
  // Receive verification code from twilio
  const { to, username, channel } = req.body;
  try {
    const data = await client.sendVerifyAsync(to, channel);
    res.send('Sent code');
  } catch (error) {
    console.log(error.message);
  }
});

app.post('/verify', async (req, res) => {
  // Send back verification code from twilio
  const { to, code, username } = req.body;

  try {
    const data = await client.verifyCodeAsync(to, code);
    if (data.status === 'approved') {
      const token = jwt.createJwt(username);
      return res.send({ token });
    }
    res.status(401).send('invalid token');
  } catch (error) {
    console.log(error);
  }
});

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
