import React from 'react';
import PropTypes from 'prop-types';

import './city.scss';
import { IconSet } from '../IconSet';
import { LIKE_CITY, UNLIKE_CITY } from '../../context/aTypes';
import { useStoreDispatch, useStoreState } from '../../context/useStore';

export const LikeACity = (props) => {
  const { Name } = props;
  const storeDispatch = useStoreDispatch();

  const {
    currentCity,
    currentUser: { likedCities },
  } = useStoreState();

  const {
    location: { country },
  } = currentCity.weatherInfo;

  return (
    <div>
      {likedCities.includes(Name) ? (
        <span className="pointer">
          <IconSet
            name="like"
            size={'1.7rem'}
            onClick={() => storeDispatch({ type: UNLIKE_CITY, Name })}
          />
        </span>
      ) : (
        <span className="pointer">
          <IconSet
            name="unlike"
            size={'1.7rem'}
            onClick={() => storeDispatch({ type: LIKE_CITY, Name, country })}
          />
        </span>
      )}
    </div>
  );
};

LikeACity.propTypes = {
  Name: PropTypes.string,
};
