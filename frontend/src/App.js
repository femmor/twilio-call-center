import { useState } from 'react';
import Login from './components/Login';

import './App.css';
import axios from './utils/axios';

const App = () => {
  const [user, setUser] = useState({
    username: '',
    mobileNumber: '',
    verificationCode: '',
    verificationSent: false,
  });

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
      });
      console.log(response);
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
