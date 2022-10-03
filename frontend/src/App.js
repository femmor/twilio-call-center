import Login from './components/Login';
import { useImmer } from 'use-immer';

import './App.css';
import axios from './utils/axios';

const App = () => {
  const [user, setUser] = useImmer({
    username: '',
    mobileNumber: '',
  });

  const { username, mobileNumber } = user;

  const sendSmsCode = async () => {
    try {
      const response = await axios.post('/login', {
        to: mobileNumber,
        username,
      });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="App">
      <Login user={user} setUser={setUser} sendSmsCode={sendSmsCode} />
    </div>
  );
};

export default App;
