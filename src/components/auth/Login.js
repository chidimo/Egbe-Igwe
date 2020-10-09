import React from 'react';
import { toast } from 'react-toastify';

import './auth.scss';
import { useStoreDispatch } from '../../context/useStore';
import { LOGIN } from '../../context/aTypes';

const Login = () => {
  const storeDispatch = useStoreDispatch();
  const [ username, setUsername ] = React.useState('');

  const submit = () => {
    if (!username) {
      toast.error('Please enter a username');
    } else {
      storeDispatch({ type: LOGIN, username });
    }
  };

  return (
    <div className="auth-container">
      <div className="login-page">
        <h2>Enter a username to continue</h2>

        <div className="div-input">
          <input
            type="text"
            data-testid="username-input"
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
        <button
          data-testid="login-btn"
          className="pointer"
          onClick={() => submit()}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
