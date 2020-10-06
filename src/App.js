import React from 'react';
import { setupAxios } from './axiosSetup';
import {
  useUserDispatch,
  useUserState,
} from './components/auth/context/useUsers';
import { useCitiesDispatch } from './components/city/context/useCities';
import { worldCities } from './data/cities';
import './App.scss';
import { Routes } from './components/routes/Routes';
import Login from './components/auth/Login';
import { GET_CITIES, LOAD_CACHED_WEATHER } from './components/city/aTypes';
import { useWeatherDispatch } from './components/city/context/useWeather';
import { LOAD_USER } from './components/auth/aTypes';
import { WA_CITIES } from './utils/storeKeys';

setupAxios();

export default function App() {
  const { username } = useUserState();
  const userDispatch = useUserDispatch();
  const wDispatch = useWeatherDispatch();
  const citiesDispatch = useCitiesDispatch();

  React.useEffect(() => {
    userDispatch({ type: LOAD_USER });
  }, [ userDispatch ]);

  React.useEffect(() => {
    wDispatch({ type: LOAD_CACHED_WEATHER });
  }, [ wDispatch ]);

  React.useEffect(() => {
    let cities = worldCities.slice(0, 15);
    const existing = JSON.parse(localStorage.getItem(WA_CITIES));

    if (existing.cities) cities = existing.cities;
    citiesDispatch({ type: GET_CITIES, cities });
  }, [ citiesDispatch ]);

  return (
    <div className="App">
      <>{username ? <Routes /> : <Login />}</>
    </div>
  );
}
