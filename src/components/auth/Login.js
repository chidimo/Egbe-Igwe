import React from 'react';

import './auth.scss';
import { useUserDispatch } from './context/useUsers';
import { SET_USER } from './aTypes';

const Login = () => {
  const userDispatch = useUserDispatch();
  const [username, setUsername] = React.useState('');

  const submit = () => {
    if (!username) {
      alert('Please enter a username');
    } else {
      userDispatch({ type: SET_USER, username });
    }
  };

  return (
    <div className="auth-container">
      <div className='login-page'>
        <h2>Enter a username to continue</h2>

        <div className="div-input">
          <input
            type="text"
            value={username}
            placeholder="Enter an username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
          />
        </div>
        <button onClick={() => submit()}>Submit</button>
      </div>
    </div>
  );
};

export default Login;
