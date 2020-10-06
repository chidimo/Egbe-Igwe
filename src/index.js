import React from 'react';
import ReactDOM from 'react-dom';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

import App from './App';
import { NotesProvider } from './components/notes/context/NotesCtx';
import { CitiesProvider } from './components/city/context/CitiesCtx';
import { WeatherProvider } from './components/city/context/WeatherCtx';
import { UserProvider } from './components/auth/context/UserCtx';

import * as serviceWorker from './serviceWorker';

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

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
