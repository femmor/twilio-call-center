import { useState, useEffect } from 'react';
import Login from './components/Login';

import './App.css';
import axios from './utils/axios';
import { socket } from './utils/socketio';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState({
    username: '',
    mobileNumber: '',
    verificationCode: '',
    verificationSent: false,
  });

  useEffect(() => {
    socket.on('disconnected', () => {
      console.log('Socket disconnected');
    });
    return () => {};
  }, []);

  const sendSmsCode = async () => {
    try {
      const response = await axios.post('/login', {
        to: user.mobileNumber,
        username: user.username,
        channel: 'sms',
      });

      setUser({
        ...user,
        verificationSent: true,
      });

      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const sendVerificationCode = async () => {
    try {
      const response = await axios.post('/verify', {
        to: user.mobileNumber,
        code: user.verificationCode,
        username: user.username,
      });
      console.log('Received token:', response.data.token);
      setToken(response.data.token);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Login
        user={user}
        setUser={setUser}
        sendSmsCode={sendSmsCode}
        sendVerificationCode={sendVerificationCode}
      />
    </div>
  );
};

export default App;
