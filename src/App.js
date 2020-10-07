import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { setupAxios } from './axiosSetup';
import './App.scss';
import { Routes } from './components/routes/Routes';
import Login from './components/auth/Login';
import { useStoreDispatch, useStoreState } from './context/useStore';
import { LOAD_STORE_TO_MEMORY } from './context/aTypes';

setupAxios();

export default function App() {
  const {
    currentUser: { username },
  } = useStoreState();
  const storeDispatch = useStoreDispatch();

  React.useEffect(() => {
    storeDispatch({ type: LOAD_STORE_TO_MEMORY });
  }, [ storeDispatch ]);

  return (
    <div className="App">
      <ToastContainer />
      <>{username ? <Routes /> : <Login />}</>
    </div>
  );
}
