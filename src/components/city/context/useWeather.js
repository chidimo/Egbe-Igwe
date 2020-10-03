import React from 'react';

import { WeatherStateCtx, WeatherDispatchCtx } from './WeatherCtx';

export const useWeatherState = () => {
  const ctx = React.useContext(WeatherStateCtx);
  if (ctx === undefined) {
    throw new Error('useWeatherState must be used within a WeatherProvider');
  }
  return ctx;
};

export const useWeatherDispatch = () => {
  const ctx = React.useContext(WeatherDispatchCtx);
  if (ctx === undefined) {
    throw new Error('useWeatherDispatch must be used within a WeatherProvider');
  }
  return ctx;
};
