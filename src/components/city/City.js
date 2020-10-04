import React from 'react';
import { useParams } from 'react-router-dom';
import { WA_WEATHER_DATA } from '../../utils/storeKeys';
// import { getCurrentCityWeather } from './actions';
import { useWeatherDispatch, useWeatherState } from './context/useWeather';
import { useNotesDispatch, useNotesState } from '../notes/context/useNotes';
import { useUserDispatch, useUserState } from '../auth/context/useUsers';
import { LOAD_NOTES } from '../notes/aTypes';
import { Note } from '../notes/Note';
import { useSaveNote } from './useSaveNote';
import { NoteEditor } from '../notes/NoteEditor';
import { useCitiesDispatch, useCitiesState } from './context/useCities';
import { formatAsNumber } from '../../utils/formatters';
import './city.scss';
import { GET_CITY } from './aTypes';
import { IconSet } from '../IconSet';
import { LIKE_CITY, UNLIKE_CITY } from '../auth/aTypes';

const City = () => {
  const { Name } = useParams();
  const { username, likedCities } = useUserState();
  const userDispatch = useUserDispatch();

  const { currentCity } = useCitiesState();
  const citiesDispatch = useCitiesDispatch();

  const wInfo = useWeatherState();
  const wDispatch = useWeatherDispatch();

  const { saveNote } = useSaveNote();

  const notes = useNotesState();
  const notesDispatch = useNotesDispatch();
  const myNotes = notes[username];

  const cityNotes = myNotes
    // ?.sort((a, b) => b.id - a.id)
    ?.filter((nt) => nt.city === Name);

  const [text, setText] = React.useState('');

  const cityData = wInfo || JSON.parse(localStorage.getItem(WA_WEATHER_DATA));
  const cityWInfo = cityData[Name] || { location: {} };
  const { location } = cityWInfo;

  React.useEffect(() => {
    citiesDispatch({ type: GET_CITY, Name });
  }, [Name, citiesDispatch]);

  React.useEffect(() => {
    notesDispatch({ type: LOAD_NOTES, username });
  }, [notesDispatch, username]);

  React.useEffect(() => {
    // getCurrentCityWeather(Name)(wDispatch);
  }, [Name, wDispatch]);

  return (
    <div className="city-page">
      <h2 className="city-country-name">
        {Name}, {location.country}{' '}
        {likedCities.includes(Name) ? (
          <span
            className="pointer"
            onClick={() => {
              userDispatch({ type: UNLIKE_CITY, Name });
            }}
          >
            <IconSet name="like" size={'1.7rem'} />
          </span>
        ) : (
          <span
            className="pointer"
            onClick={() => {
              userDispatch({ type: LIKE_CITY, Name });
            }}
          >
            <IconSet name="unlike" size={'1.7rem'} />
          </span>
        )}
      </h2>

      <div className="city-info">
        <p>Population: {formatAsNumber(currentCity.Population)}</p>
        <p>
          Latitude {location.lat}, Longitude {location.lon}
        </p>
        <p>Local time: {location.localtime}</p>
        <div>
          <p>Current weather conditions</p>
        </div>
      </div>

      <div className="city-notes-list">
        <NoteEditor
          value={text}
          onClick={() => {
            saveNote(undefined, text, Name);
            setText('');
          }}
          onChange={(e) => setText(e.target.value)}
        />

        {cityNotes?.length === 0 ? (
          <p>Add your first note for {Name}</p>
        ) : (
          <>
            {cityNotes?.map((n) => {
              return <Note key={n.id} note={n} />;
            })}
          </>
        )}
      </div>
    </div>
  );
};

export default City;
