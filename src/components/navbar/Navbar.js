import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { LOGOUT } from '../auth/aTypes';
import { useUserDispatch, useUserState } from '../auth/context/useUsers';

import './navbar.scss';

export const Navbar = () => {
  const history = useHistory();
  const { username } = useUserState();
  const userDispatch = useUserDispatch();
  return (
    <header>
      <nav role="navigation">
        <div className="left-side">
          <Link to="/" className="branding">
            Weather app
          </Link>
        </div>

        <div className="right-side">
          <div>
            <Link to={'/notes'}>{username}</Link>
          </div>

          <div>
            <p
              onClick={() => {
                userDispatch({ type: LOGOUT });
                history.push({ pathname: '/' });
              }}
            >
              Logout
            </p>
          </div>
        </div>
      </nav>
    </header>
  );
};
