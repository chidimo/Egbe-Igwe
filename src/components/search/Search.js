import React from 'react';
import { searchPlaces } from '../city/actions';
import { MyLocation } from './MyLocation';
import { SearchCard } from './SearchCard';

import './search.scss';

const dum = [
  // {
  //   formatted_address: 'Benin',
  //   geometry: {
  //     location: {
  //       lat: 9.30769,
  //       lng: 2.315834,
  //     },
  //     viewport: {
  //       northeast: {
  //         lat: 12.4086111,
  //         lng: 3.8433429,
  //       },
  //       southwest: {
  //         lat: 6.2061001,
  //         lng: 0.7754124000000001,
  //       },
  //     },
  //   },
  //   name: 'Benin',
  // },
  // {
  //   formatted_address: 'C/590, Boulevard Saint Michel, Cotonou, Benin',
  //   geometry: {
  //     location: {
  //       lat: 6.363815,
  //       lng: 2.425785,
  //     },
  //     viewport: {
  //       northeast: {
  //         lat: 6.365158179892722,
  //         lng: 2.427140129892722,
  //       },
  //       southwest: {
  //         lat: 6.362458520107278,
  //         lng: 2.424440470107277,
  //       },
  //     },
  //   },
  //   name: 'Accès Canada Benin',
  // },
];

export const Search = () => {
  const [error, setError] = React.useState('yihuihuihuiyugygy');
  const [searches, setSearches] = React.useState(dum);

  return (
    <div className="search">
      {error && <span className="error">{error}</span>}

      <div className="input-container">
        <input
          tabIndex="3"
          type="text"
          className={'search-city'}
          placeholder="Find a city..."
          onChange={(e) => {
            const text = e.target.value;
            if (text.length < 3) {
              setError('Please enter at least 3 characters');
              return;
            }
            setError('');
            searchPlaces(text)
              .then((res) => {
                console.log('search res', res);
                setSearches(res.candidates.slice(0, 5));
              })
              .catch((err) => {
                console.log('search error', err);
              });
          }}
        />
      </div>

      <div className="display-search-results">
        {searches.map((sc, i) => {
          return <SearchCard key={i} city={sc} />;
        })}
      </div>

      <MyLocation />
    </div>
  );
};
