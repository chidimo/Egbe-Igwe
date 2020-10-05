import React from 'react';
import { MyLocation } from './MyLocation';

import './search.scss';

export const Search = () => {
  return (
    <div className="search">
      <div className="input-container">
        <input
          tabIndex="3"
          type="text"
          className="search-city"
          placeholder="Find a city..."
          onChange={() => {
            console.log('searching');
          }}
        />
      </div>

      <MyLocation />
    </div>
  );
};
