import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Error404 = () => {
  const location = useLocation();

  React.useEffect(() => {
    document.title = 'Error 404';
  });

  return (
    <div data-testid="error-404" className="error__404--parent">
      <div>
        <p>
          The requested url{' '}
          <span style={{ color: 'red' }}>{location.pathname}</span> was not
          found on this server.
        </p>

        <Link to="/">Back to homepage</Link>
      </div>
    </div>
  );
};
