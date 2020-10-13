import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Note } from '../notes/Note';
import { useSaveNote } from './useSaveNote';
import { NoteEditor } from '../notes/NoteEditor';

import './city.scss';
import { GET_CITY, CLEAN_CITY } from '../../context/aTypes';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { getCityWeather } from './actions';
import { toast } from 'react-toastify';
import { FetchingLoader } from '../AppLoaders';

const getWindDir = (dir) => {
  const directions = {
    N: 'North',
    E: 'East',
    W: 'West',
    S: 'South',
  };
  const allDir = dir.split('').map((d) => directions[d]);
  return allDir.join('-');
};

export const CityBase = () => {
  const history = useHistory();
  const { Name } = useParams();
  const { saveNote } = useSaveNote();
  const storeDispatch = useStoreDispatch();

  const [ text, setText ] = React.useState('');

  const {
    fcngCity,
    currentCity,
    currentUser: { notes },
  } = useStoreState();

  const { current } = currentCity.weatherInfo;
  const cityNotes = notes?.filter((nt) => nt.city === Name);

  const {
    humidity,
    wind_dir,
    feelslike,
    wind_speed,
    weather_icons,
    observation_time,
    temperature: celcius,
    weather_descriptions,
  } = current;

  React.useEffect(() => {
    // I only have this in case API call fails,
    // I'll pull existing data and display on screen
    storeDispatch({ type: GET_CITY, Name });
    return () => storeDispatch({ type: CLEAN_CITY });
  }, [ Name, storeDispatch ]);

  React.useEffect(() => {
    getCityWeather(Name)(storeDispatch)
      .then((res) => {
        if (!res) {
          toast.error(
            'Unable to fetch latest data for this city. Please check your network connection.',
          );
        }
      })
      .catch((err) => err);
  }, [ Name, history, storeDispatch ]);

  return (
    <>
      {fcngCity ? (
        <FetchingLoader width={50} height={50} />
      ) : (
        <div className="direct-main-child city-page">
          <div className="city-info">
            <img
              className="weather-icon"
              src={weather_icons[0]}
              alt="Weather icon"
            />

            <div>
              {weather_descriptions.map((wd, i) => {
                return <p key={i}>{wd}</p>;
              })}
            </div>

            <div>
              <p>Humidity is at {humidity}%</p>
            </div>

            <div>
              <p>
                Wind is moving at {wind_speed}km/hr in a {getWindDir(wind_dir)}{' '}
                direction
              </p>
            </div>

            <div>
              <p className="temp">
                Temperature: {celcius}
                <span className="symbol">&#8451;</span> (
                {(celcius * 1.8 + 32).toFixed(1)} &#x2109;)
              </p>
            </div>

            <div>
              <p>
                But it feels like {feelslike}
                <span className="symbol">&#8451;</span> (
                {(feelslike * 1.8 + 32).toFixed(1)} &#x2109;)
              </p>
            </div>

            <div>
              <p>Readings taken at {observation_time}</p>
            </div>
          </div>

          <div className="city-notes-list">
            <NoteEditor
              dataTestId={'new-note'}
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
      )}
    </>
  );
};
