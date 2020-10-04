import React from 'react';
import { useParams } from 'react-router-dom';
import { WA_WEATHER_DATA } from '../../utils/storeKeys';
// import { getCurrentCityWeather } from './actions';
import { useWeatherDispatch, useWeatherState } from './context/useWeather';
import { useNotesDispatch, useNotesState } from '../notes/context/useNotes';
import { useUserState } from '../auth/context/useUsers';
import { LOAD_NOTES } from '../notes/aTypes';
import { Note } from '../notes/Note';
import { useSaveNote } from './useSaveNote';

const City = () => {
  const { Name } = useParams();
  const { username } = useUserState();

  const wInfo = useWeatherState();
  const wDispatch = useWeatherDispatch();

  const { saveNote } = useSaveNote();

  const notes = useNotesState();
  const notesDispatch = useNotesDispatch();
  const myNotes = notes[username];

  const cityNotes = myNotes
    ?.sort((a, b) => b.id - a.id)
    .filter((nt) => nt.city === Name);

  const [text, setText] = React.useState('');

  const cityData =
    wInfo || JSON.parse(localStorage.getItem(WA_WEATHER_DATA)) || {};
  const currentCity = cityData[Name] || { location: {} };
  const { location } = currentCity;

  React.useEffect(() => {
    notesDispatch({ type: LOAD_NOTES, username });
  }, [notesDispatch, username]);

  React.useEffect(() => {
    // getCurrentCityWeather(Name)(wDispatch);
  }, [Name, wDispatch]);

  return (
    <div>
      <h3>
        City of {Name}, {location.country}
      </h3>

      <div className="city-info">About city</div>

      <div className="note-editor">
        <textarea
          value={text}
          placeholder="Enter notes"
          onChange={(e) => setText(e.target.value)}
        />

        <div>
          <button
            onClick={() => {
              saveNote(undefined, text, Name);
              setText('');
            }}
          >
            Save
          </button>
        </div>
      </div>

      <div className="city-notes-list">
        {cityNotes?.length === 0 ? (
          <p>You have not saved any notes for {Name}</p>
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
