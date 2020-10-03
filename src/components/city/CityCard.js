import React from 'react';
import { IconSet } from '../IconSet';

import { DELIST_CITY } from './aTypes';
import './city.scss';
import { useCitiesDispatch } from './context/useCities';
import { useWeatherState } from './context/useWeather';

export const CityCard = (props) => {
  const { city } = props;
  const { rank, Name } = city;
  const wInfo = useWeatherState();
  const citiesDispatch = useCitiesDispatch();

  const {
    current: { temperature: celsius, weather_icons },
  } = wInfo[Name] || {
    current: {
      temperature: 0,
      weather_icons: [
        'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png',
      ],
    },
  };
  const fahrenheit = (celsius * 1.8 + 32).toFixed(2);

  return (
    <div className="city-card">
      <div className="name-section">
        <p>
          {Name}{' '}
          <img
            className="weather-icon"
            src={weather_icons[0]}
            alt="Weather icon"
          />{' '}
        </p>
        <p>
          {celsius} &#8451; | {fahrenheit} &#x2109;
        </p>
      </div>

      <div className="delist-city">
        <span onClick={() => citiesDispatch({ type: DELIST_CITY, rank })}>
          <IconSet name="cancel" color="maroon" size="2.5rem" />
        </span>
      </div>
    </div>
  );
};
