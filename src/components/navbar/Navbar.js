import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { LOGOUT } from '../../context/aTypes';

import './navbar.scss';

export const Navbar = () => {
  const history = useHistory();
  const {
    currentUser: { username },
  } = useStoreState();
  const storeDispatch = useStoreDispatch();
  return (
    <header>
      <nav role="navigation">
        <div className="left-side">
          <Link to="/" className="branding">
            Egbe Igwe
          </Link>
        </div>

        <div className="right-side">
          <div className="username">
            <Link data-testid="username" to={'/notes'}>
              {username}
            </Link>
          </div>

          <div>
            <button
              data-testid="logout-btn"
              className="logout pointer"
              onClick={() => {
                storeDispatch({ type: LOGOUT });
                history.push({ pathname: '/' });
              }}
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
};
