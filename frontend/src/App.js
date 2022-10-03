import Login from './components/Login';
import { useImmer } from 'use-immer';

import './App.css';

const App = () => {
  const [user, setUser] = useImmer({
    username: '',
    mobileNumber: '',
  });

  return (
    <div className="App">
      <Login user={user} setUser={setUser} />
    </div>
  );
};

export default App;
