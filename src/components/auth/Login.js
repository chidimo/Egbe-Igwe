import React from 'react';
import { toast } from 'react-toastify';

import './auth.scss';
import { useUserDispatch } from './context/useUsers';
import { LOGIN } from './aTypes';

const Login = () => {
  const userDispatch = useUserDispatch();
  const [ username, setUsername ] = React.useState('');

  const submit = () => {
    if (!username) {
      toast.error('Please enter a username');
    } else {
      userDispatch({ type: LOGIN, username });
    }
  };

  return (
    <div className="auth-container">
      <div className="login-page">
        <h2>Enter a username to continue</h2>

        <div className="div-input">
          <input
            type="text"
            value={username}
            placeholder="Enter a username"
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                submit();
              }
            }}
          />
        </div>
        <button className="pointer" onClick={() => submit()}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
