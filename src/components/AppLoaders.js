import React from 'react';
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
      <Loader type="Puff" />
    </div>
  );
};

export const LocatingLoader = () => {
  return <Loader type='Puff' height={25} width={25} />
}
