import React from 'react';
import { toast } from 'react-toastify';

import { useHistory, useParams } from 'react-router-dom';
import { WA_WEATHER_DATA } from '../../utils/storeKeys';
import { getCityWeather } from './actions';
import { useWeatherDispatch, useWeatherState } from './context/useWeather';
import { useNotesDispatch, useNotesState } from '../notes/context/useNotes';
import { useUserDispatch, useUserState } from '../auth/context/useUsers';
import { LOAD_NOTES } from '../notes/aTypes';
import { Note } from '../notes/Note';
import { useSaveNote } from './useSaveNote';
import { NoteEditor } from '../notes/NoteEditor';
import { useCitiesDispatch } from './context/useCities';

import './city.scss';
import { GET_CITY } from './aTypes';
import { IconSet } from '../IconSet';
import { LIKE_CITY, UNLIKE_CITY } from '../auth/aTypes';
import { initWeatherData } from './data';

const City = () => {
  const { Name, coords } = useParams();
  const history = useHistory();
  const { username, likedCities } = useUserState();
  const userDispatch = useUserDispatch();

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

  const [ text, setText ] = React.useState('');

  const cityData = wInfo || JSON.parse(localStorage.getItem(WA_WEATHER_DATA));
  const cityWInfo = cityData[Name] || initWeatherData;

  const { location, current } = cityWInfo;
  const { country } = location;

  const { temperature: celcius, weather_descriptions, weather_icons } = current;
  const fahrenheit = (celcius * 1.8 + 32).toFixed(1);

  React.useEffect(() => {
    citiesDispatch({ type: GET_CITY, Name });
  }, [ Name, citiesDispatch ]);

  React.useEffect(() => {
    notesDispatch({ type: LOAD_NOTES, username });
  }, [ notesDispatch, username ]);

  React.useEffect(() => {
    let loc = Name;
    if (coords) {
      loc = coords;
    }
    getCityWeather(loc)(wDispatch)
      .then((res) => {
        if (!res) {
          toast.error(
            'Unable to fetch latest data for this city. Please check your network connection.',
          );
        }
      })
      .catch((err) => err);
  }, [ Name, coords, history, wDispatch ]);

  return (
    <div className="direct-main-child city-page">
      <div className="city-country-name-cont">
        <p className="city-country-name">
          {Name}, {country}{' '}
        </p>
        <div>
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
              onClick={() => userDispatch({ type: LIKE_CITY, Name, country })}
            >
              <IconSet name="unlike" size={'1.7rem'} />
            </span>
          )}
        </div>
      </div>

      <div className="city-info">
        <img src={weather_icons[0]} alt="Weather icon" />
        <div>
          {weather_descriptions.map((wd, i) => {
            return <p key={i}>{wd}</p>;
          })}
        </div>
        <p>
          Latitude {location.lat}, Longitude {location.lon}
        </p>
        <p>Local time: {location.localtime}</p>
        <div>
          <h4>Current weather conditions</h4>
          <p>
            {celcius} <span className="symbol">&#8451;</span> ({fahrenheit}{' '}
            &#x2109;)
          </p>
        </div>
      </div>

      <div className="city-notes-list">
        <NoteEditor
          value={text}
          onClick={() => {
            const { success } = saveNote(undefined, text, Name);
            if (success) {
              setText('');
            }
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
