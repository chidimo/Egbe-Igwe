import React from 'react';

import './search.scss';

export const Search = () => {
  return (
    <div className="search">
      <input
        className="search-cities"
        type="text"
        placeholder="Find your city..."
        onChange={() => {
          console.log('searching');
        }}
      />
    </div>
  );
};
