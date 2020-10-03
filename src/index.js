import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import { NotesProvider } from './context/NotesCtx';
import { CitiesProvider } from './components/city/context/CitiesCtx';
import { UsersProvider } from './context/UsersCtx';
import { WeatherProvider } from './components/city/context/WeatherCtx';

import './index.css';

const rootElement = document.getElementById('root');

ReactDOM.render(
  <React.StrictMode>
    <WeatherProvider>
      <CitiesProvider>
        <NotesProvider>
          <UsersProvider>
            <App />
          </UsersProvider>
        </NotesProvider>
      </CitiesProvider>
    </WeatherProvider>
  </React.StrictMode>,
  rootElement,
);
