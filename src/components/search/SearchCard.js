import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { LocatingLoader } from '../AppLoaders';

import './search.scss';
import { useRouteToCity } from '../hooks/useRouteToCity';

export const SearchCard = (props) => {
  const [ fetching, setFetching ] = React.useState(false);

  const { routeToCity } = useRouteToCity();

  const { city } = props;
  const { name, formatted_address, geometry } = city;
  const {
    location: { lat, lng },
  } = geometry;
  const coords = `${lat},${lng}`;

  return (
    <div className="search-card pointer">
      {fetching ? (
        <LocatingLoader color="royalblue" height={40} width={40} />
      ) : (
        <div
          role="link"
          data-testid={name}
          onClick={() => {
            setFetching(true);
            toast.success('Location obtained. Redirecting');
            routeToCity(coords, setFetching);
          }}
        >
          <p className="name" role="heading">
            {name}
          </p>
          <p className="address">{formatted_address}</p>
        </div>
      )}
    </div>
  );
};

SearchCard.propTypes = {
  city: PropTypes.object,
};
