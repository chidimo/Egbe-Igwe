import React from 'react';
import { useParams } from 'react-router-dom';

import './city.scss';
import { useStoreState } from '../../context/useStore';
import { CityBase } from './CityBase';
import { LikeACity } from './LikeACity';

const City = () => {
  const { Name } = useParams();
  const { currentCity } = useStoreState();

  const {
    location: { country },
  } = currentCity.weatherInfo;

  return (
    <>
      <div className="city-country-name-cont">
        <p role="heading" className="page-heading">
          {Name}, {country}{' '}
        </p>

        <LikeACity />
      </div>
      <CityBase Name={Name} />
    </>
  );
};

export default City;
