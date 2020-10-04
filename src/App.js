import React from 'react';
import { setupAxios } from './axiosSetup';
import { useUserState } from './components/auth/context/useUsers';
import { useCitiesDispatch } from './components/city/context/useCities';
import { worldCities } from './data/cities';
import './App.scss';
import { Routes } from './components/routes/Routes';
import Login from './components/auth/Login';
import { GET_CITIES, LOAD_CACHED_WEATHER } from './components/city/aTypes';
import { useWeatherDispatch } from './components/city/context/useWeather';

setupAxios();

export default function App() {
  const { username } = useUserState();
  const wDispatch = useWeatherDispatch();
  const citiesDispatch = useCitiesDispatch();

  React.useEffect(() => {
    wDispatch({ type: LOAD_CACHED_WEATHER });
  }, [wDispatch]);

  React.useEffect(() => {
    citiesDispatch({ type: GET_CITIES, cities: worldCities.slice(0, 15) });
  }, [citiesDispatch]);

  return (
    <div className="App">
      <>{username ? <Routes /> : <Login />}</>
    </div>
  );
}
