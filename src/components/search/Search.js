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
  const reducer = (state = {}, action) => {
    switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.query };
    case 'SET_ERROR':
      return { ...state, error: action.error };
    case 'SET_RESULTS':
      return { ...state, results: action.results };
    case 'SET_OFFLINE':
      return { ...state, isOffline: action.isOffline };
    case 'SET_SEARCHING':
      return { ...state, searching: action.searching };
    default:
      return state;
    }
  };

  const initState = {
    query: '',
    error: '',
    results: [],
    isOffline: false,
    searching: false,
  };

  const [ info, dispatch ] = React.useReducer(reducer, initState);

  const isQuerying = info.query.length > 2;

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
      dispatch({ type: 'SET_SEARCHING', searching: true });
      searchPlaces(term)
        .then((res) => {
          dispatch({ type: 'SET_OFFLINE', isOffline: false });
          dispatch({ type: 'SET_SEARCHING', searching: false });
          dispatch({ type: 'SET_RESULTS', results: res.candidates.slice(0, 4) });
        })
        .catch((err) => {
          dispatch({ type: 'SET_SEARCHING', searching: false });
          if (Object.values(err).includes('cancelled request')) {
            //
          } else {
            dispatch({ type: 'SET_OFFLINE', isOffline: true });
          }
          return err;
        });
    }, 250),
    [],
  );

  React.useEffect(() => {
    if (isQuerying) doSearch(info.query);
  }, [ info.query, isQuerying, doSearch ]);

  return (
    <div className="search">
      <div>
        <div id="input-container" className="input-container">
          <input
            ref={(node) => (inputCont.current = node)}
            tabIndex="3"
            type="text"
            data-testid="search"
            value={info.query}
            className={'search-city'}
            placeholder="Find a city..."
            onChange={(e) => {
              const text = e.target.value;
              if (text.length > 0 && text.length < 3) {
                dispatch({
                  type: 'SET_ERROR',
                  error: 'Please enter at least 3 characters',
                });
              } else {
                dispatch({ type: 'SET_ERROR', error: '' });
              }
              dispatch({ type: 'SET_QUERY', query: text });

              if (text.length < 1) {
                dispatch({ type: 'SET_OFFLINE', isOffline: false });
              }
            }}
          />
        </div>
        {info.error && <span className="error">{info.error}</span>}
        <MyLocation />
      </div>

      <div
        ref={(node) => (searchRsCont.current = node)}
        id="display-search-results"
        className="display-search-results"
      >
        {info.searching ? (
          <LocatingLoader width={40} height={40} />
        ) : (
          <>
            {info.isOffline && (
              <p>It seems you are offline. Please check your connection.</p>
            )}
            {isQuerying && !info.isOffline && info.results.length === 0 && (
              <p>No matching location</p>
            )}
            {info.results.map((sc, i) => {
              return <SearchCard key={i} city={sc} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};
