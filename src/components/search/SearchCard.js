import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { LocatingLoader } from '../AppLoaders';
import { getCurrentCityWeather } from '../city/actions';
import { useWeatherDispatch } from '../city/context/useWeather';

import './search.scss';

export const SearchCard = (props) => {
  const history = useHistory();
  const wDispatch = useWeatherDispatch();
  const [ fetching, setFetching ] = React.useState(false);

  const { city } = props;
  const { name, formatted_address, geometry } = city;
  const {
    location: { lat, lng },
  } = geometry;

  return (
    <div className="search-card pointer">
      {fetching ? (
        <LocatingLoader color="royalblue" height={40} width={40} />
      ) : (
        <div
          onClick={() => {
            setFetching(true);
            getCurrentCityWeather(`${lat}, ${lng}`)(wDispatch)
              .then((res) => {
                if (res.success) {
                  const { name, lat, lon } = res.data.location;
                  history.push({ pathname: `/city/${name}/${lat}, ${lon}` });
                }
              })
              .catch((err) => {
                alert('Unable to retrieve your location at this time.');
                setFetching(false);
                return err;
              });
          }}
        >
          <p className="name">{name}</p>
          <p className="address">{formatted_address}</p>
        </div>
      )}
    </div>
  );
};

SearchCard.propTypes = {
  city: PropTypes.object,
};
