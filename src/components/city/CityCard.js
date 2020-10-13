import React from 'react';
import PropTypes from 'prop-types';

import { IconSet } from '../IconSet';
import { Link } from 'react-router-dom';

import './city-card.scss';
import { initWeatherData } from './data';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { DELIST_CITY } from '../../context/aTypes';
import { LikeACity } from './LikeACity';

export const CityCard = (props) => {
  const { tabIndex, Name } = props;
  const { weather } = useStoreState();
  const storeDispatch = useStoreDispatch();

  const {
    current: { temperature: celcius, weather_icons },
  } = weather[Name] || initWeatherData;

  return (
    <div className="city-card" data-testid="city-card">
      <div className="city-cart--1-3">
        <div className="name-section">
          <Link
            to={`/city/${Name}`}
            tabIndex={tabIndex}
            className="city-name"
            data-testid={`city-link-${tabIndex}`}
          >
            {Name}
          </Link>

          <LikeACity Name={Name} />

          <div className="close-container pointer">
            <span
              data-testid={`remove-city-${tabIndex}`}
              onClick={() => storeDispatch({ type: DELIST_CITY, Name })}
            >
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
        <p className="minor-temp">
          ({(celcius * 1.8 + 32).toFixed(1)} &#x2109;)
        </p>
      </div>{' '}
    </div>
  );
};

CityCard.propTypes = {
  Name: PropTypes.string,
  isLiked: PropTypes.bool,
  tabIndex: PropTypes.number,
};
