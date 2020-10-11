import React from 'react';
import PropTypes from 'prop-types';
import {WA_RETRY} from './utils/storeKeys';

class ErrorBoundary extends React.Component {
  state = {
    error: '',
    hasError: false,
    reloadCount: 1,
    reloadThreshold: Number(localStorage.getItem(WA_RETRY)) || 0,
  };

  // during initialization, reloadThreshold is set on state
  // as it mounts, it is reset to 0
  // once component catches an error, it reloads and
  // takes the previously saved state and increments it.
  // this continues till the threshold is reached.

  componentDidMount() {
    localStorage.setItem(WA_RETRY, Number(localStorage.getItem(WA_RETRY)) || 0);
  }

  static getDerivedStateFromError(error) {
    return {hasError: true, error};
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.log({error, info});

    const {reloadThreshold, reloadCount} = this.state;
    if (reloadThreshold < reloadCount) {
      localStorage.setItem(WA_RETRY, reloadThreshold + 1);
      window.location.reload();
    }
  }

  render() {
    const {hasError} = this.state;
    if (hasError) {
      return (
        <div className="error__boundary--parent">
          <div className="error__boundary--body">
            <p>
              There was an error in loading this page.{' '}
              <span
                style={{cursor: 'pointer', color: '#0077FF'}}
                onClick={() => {
                  window.location.reload();
                }}
              >
                Reload this page
              </span>{' '}
            </p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

export {ErrorBoundary};
