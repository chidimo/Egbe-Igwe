import React from 'react';
import { searchPlaces } from '../city/actions';
import { MyLocation } from './MyLocation';
import { SearchCard } from './SearchCard';

import './search.scss';
import { LocatingLoader } from '../AppLoaders';

function debounce(fn, delay) {
  let timeout;
  return (...rest) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn.apply(this, rest), delay);
  };
}

export const Search = () => {
  const [ query, setQuery ] = React.useState('');
  const [ error, setError ] = React.useState('');
  const [ searches, setSearches ] = React.useState([]);
  const [ searching, setSearching ] = React.useState(false);

  const isQuerying = query.length > 2;

  const searchRsCont = React.useRef();
  const inputCont = React.useRef();
  const inpDivStyle = React.useRef();

  React.useEffect(() => {
    const resizeResultsDiv = () => {
      inpDivStyle.current = window.getComputedStyle(inputCont.current, null);
      const inpDivWidth = inpDivStyle.current.getPropertyValue('width');
      searchRsCont.current.style.width = inpDivWidth;
    };
    resizeResultsDiv();

    window.addEventListener('resize', resizeResultsDiv);
    return () => window.removeEventListener('resize', resizeResultsDiv);
  }, []);

  const doSearch = React.useCallback(
    debounce((term) => {
      setSearching(true);
      searchPlaces(term)
        .then((res) => {
          setSearching(false);
          setSearches(res.candidates.slice(0, 4));
        })
        .catch((err) => {
          setSearching(false);
          return err;
        });
    }, 250),
    [],
  );

  React.useEffect(() => {
    if (isQuerying) doSearch(query);
  }, [ query, isQuerying, doSearch ]);

  return (
    <div className="search">
      <div>
        <div id="input-container" className="input-container">
          <input
            ref={(node) => (inputCont.current = node)}
            tabIndex="3"
            type="text"
            value={query}
            className={'search-city'}
            placeholder="Find a city..."
            onChange={(e) => {
              const text = e.target.value;
              if (text.length > 0 && text.length < 3) {
                setError('Please enter at least 3 characters');
              } else {
                setError('');
              }
              setQuery(text);
            }}
          />
        </div>
        {error && <span className="error">{error}</span>}
        <MyLocation />
      </div>

      <div
        ref={(node) => (searchRsCont.current = node)}
        id="display-search-results"
        className="display-search-results"
      >
        {searching ? (
          <LocatingLoader width={40} height={40} />
        ) : (
          <>
            {isQuerying && searches.length === 0 && <p>No matching location</p>}
            {searches.map((sc, i) => {
              return <SearchCard key={i} city={sc} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
