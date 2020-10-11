import React from 'react';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { getCityWeather } from '../city/actions';
import { CityCard } from '../city/CityCard';

import { Search } from '../search/Search';
import './home.scss';

const Home = () => {
  const {
    cities,
    currentUser: { likedCities },
  } = useStoreState();
  const storeDispatch = useStoreDispatch();

  React.useEffect(() => {
    cities.forEach((city) => {
      getCityWeather(city.Name, true)(storeDispatch);
    });
  }, [ cities, storeDispatch ]);

  return (
    <div className="direct-main-child home-container">
      <Search />
      <div className="cities-section">
        {cities.length === 0 ? (
          <p>No cities to display</p>
        ) : (
          <>
            {cities

              .sort((a, b) =>
                a.Name.localeCompare(b.Name, { sensitivity: 'base' }),
              )
              .sort(
                (a, b) =>
                  likedCities.includes(b.Name) - likedCities.includes(a.Name),
              )
              .map((city, i) => {
                const { Name } = city;
                return (
                  <CityCard
                    key={i}
                    city={city}
                    tabIndex={5 + i}
                    isLiked={likedCities.includes(Name)}
                  />
                );
              })}
          </>
        )}
      </div>
    </div>
  );
};

export default Home;
