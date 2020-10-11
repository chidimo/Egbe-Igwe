import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

export const FallBack = () => {
  return (
    <div
      style={{
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Loader color="royalblue" type="Oval" />
    </div>
  );
};

export const LocatingLoader = (props) => {
  const { width, height, color } = props;
  return (
    <Loader
      type="Oval"
      width={width}
      height={height}
      color={color || 'royalblue'}
    />
  );
};

LocatingLoader.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};

export const FetchingLoader = (props) => {
  const { width, height, color } = props;
  return (
    <Loader
      type="Oval"
      width={width}
      height={height}
      color={color || 'royalblue'}
    />
  );
};

FetchingLoader.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
};
