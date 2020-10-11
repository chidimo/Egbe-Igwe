import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { LocatingLoader } from '../AppLoaders';

import './search.scss';
import { useRouteToCity } from '../hooks/useRouteToCity';

export const SearchCard = (props) => {
  const { city } = props;
  const { name, country, region } = city;

  const { routeToCity } = useRouteToCity();
  const [ fetching, setFetching ] = React.useState(false);

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
            routeToCity(name, true, setFetching);
          }}
        >
          <p className="name" role="heading">
            {name}
          </p>
          <p className="address">
            {region} - {country}
          </p>
        </div>
      )}
    </div>
  );
};

SearchCard.propTypes = {
  city: PropTypes.object,
};
