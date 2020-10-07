import React from 'react';
import PropTypes from 'prop-types';

import { IconSet } from '../IconSet';
import { Link } from 'react-router-dom';

import './city-card.scss';
import { initWeatherData } from './data';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { DELIST_CITY } from '../../context/aTypes';

export const CityCard = (props) => {
  const { city, isLiked, tabIndex } = props;
  const { Name } = city;
  const { weather } = useStoreState();
  const storeDispatch = useStoreDispatch();

  const wInfo = weather[Name] || initWeatherData;

  const {
    current: { temperature: celcius, weather_icons, observation_time },
  } = wInfo;
  const fahrenheit = (celcius * 1.8 + 32).toFixed(1);

  return (
    <div className="city-card">
      <div className="city-cart--1-3">
        <div className="name-section">
          <Link to={`/city/${Name}`} tabIndex={tabIndex} className="city-name">
            {Name}
          </Link>

          {isLiked && (
            <span>
              <IconSet name="like" size={'1.7rem'} />
            </span>
          )}

          <div className="close-container pointer">
            <span onClick={() => storeDispatch({ type: DELIST_CITY, Name })}>
              <IconSet name="cancel" color="red" size="1.7rem" />
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
          {celcius} <span className="symbol">&#8451;</span>
        </p>
        <p className="minor-temp">{fahrenheit} &#x2109;</p>
      </div>
      <p>Prevailing conditions at {observation_time}</p>
    </div>
  );
};

CityCard.propTypes = {
  city: PropTypes.object,
  isLiked: PropTypes.bool,
  tabIndex: PropTypes.number,
};
