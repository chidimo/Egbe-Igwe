import React from 'react';
import { setupAxios } from './axiosSetup';
import { useUserState } from './components/auth/context/useUsers';
import { useCitiesDispatch } from './components/city/context/useCities';
import { worldCities } from './data/cities';
import './App.scss';
import { Routes } from './components/routes/Routes';
import Login from './components/auth/Login';

setupAxios();

export default function App() {
  const { username } = useUserState();
  const citiesDispatch = useCitiesDispatch();

  React.useEffect(() => {
    citiesDispatch({ type: 'GET_CITIES', cities: worldCities.slice(0, 15) });
  }, [citiesDispatch]);

  console.log('usernamne', username);

  return (
    <div className="App">
      <>{username ? <Routes /> : <Login />}</>
    </div>
  );
}
