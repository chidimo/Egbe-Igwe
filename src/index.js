import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { NotesProvider } from './components/notes/context/NotesCtx';
import { CitiesProvider } from './components/city/context/CitiesCtx';
import { WeatherProvider } from './components/city/context/WeatherCtx';
import { UserProvider } from './components/auth/context/UserCtx';

import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <CitiesProvider>
        <NotesProvider>
          <UserProvider>
            <App />
          </UserProvider>
        </NotesProvider>
      </CitiesProvider>
    </WeatherProvider>
  </React.StrictMode>,
  rootElement,
);
