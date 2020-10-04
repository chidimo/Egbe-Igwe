import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconSet } from '../IconSet';

import { DELIST_CITY } from './aTypes';
import './city-card.scss';
import { useCitiesDispatch } from './context/useCities';
import { useWeatherState } from './context/useWeather';

export const CityCard = (props) => {
  const history = useHistory();
  const { city } = props;
  const { rank, Name } = city;
  const wInfo = useWeatherState();
  const citiesDispatch = useCitiesDispatch();

  const {
    current: { temperature: celsius, weather_icons, observation_time },
  } = wInfo[Name] || {
    current: {
      temperature: 20,
      observation_time: '',
      weather_icons: [
        'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png',
      ],
    },
  };
  const fahrenheit = (celsius * 1.8 + 32).toFixed(2);

  return (
    <div className="city-card">
      <div className="city-cart--1-3">
        <div className="name-section">
          <p
            className="city-name"
            onClick={() => {
              history.push({ pathname: `/city/${Name}` });
            }}
          >
            {Name}
          </p>

          <div className="close-container">
            <span onClick={() => citiesDispatch({ type: DELIST_CITY, rank })}>
              <IconSet name="cancel" color="maroon" size="1.5rem" />
            </span>
          </div>
        </div>
      </div>

      <div className="city-cart--2-3">
        <img
          className="weather-icon"
          src={weather_icons[0]}
          alt="Weather icon"
        />
      </div>

      <div className="city-card--3-3">
        <p className="main-temp">
          {celsius} <span className="symbol">&#8451;</span>
        </p>
        <p className="minor-temp">{fahrenheit} &#x2109;</p>
      </div>
      <p>Prevailing conditions at {observation_time}</p>
    </div>
  );
};
