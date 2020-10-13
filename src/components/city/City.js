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

        <LikeACity Name={Name} />
      </div>
      <CityBase
        Name={Name}
        style={{ backgroundColor: '#f3f3f3', color: '#000' }}
      />
    </>
  );
};

export default City;
