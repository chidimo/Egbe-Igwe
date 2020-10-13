/* eslint-disable no-unused-vars */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { Note } from '../notes/Note';
import { useSaveNote } from './useSaveNote';
import { NoteEditor } from '../notes/NoteEditor';

import './city.scss';
import { IconSet } from '../IconSet';
import {
  GET_CITY,
  LIKE_CITY,
  CLEAN_CITY,
  UNLIKE_CITY,
} from '../../context/aTypes';
import { useStoreDispatch, useStoreState } from '../../context/useStore';
import { getCityWeather } from './actions';
import { toast } from 'react-toastify';
import { FetchingLoader } from '../AppLoaders';

const MyLocation = () => {
  const history = useHistory();
  const { saveNote } = useSaveNote();
  const { Name } = useParams();

  const [ text, setText ] = React.useState('');

  const {
    fcngCity,
    currentCity,
    currentUser: { likedCities, notes },
  } = useStoreState();
  const storeDispatch = useStoreDispatch();

  const {
    current,
    location: { country },
  } = currentCity.weatherInfo;

  const cityNotes = notes?.filter((nt) => nt.city === Name);
  const {
    temperature: celcius,
    observation_time,
    weather_descriptions,
    weather_icons,
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
          <div className="city-country-name-cont">
            <p role="heading" className="page-heading">
              Current location {Name}, {country}{' '}
            </p>

            <div>
              {likedCities.includes(Name) ? (
                <span className="pointer">
                  <IconSet
                    name="like"
                    size={'1.7rem'}
                    onClick={() => storeDispatch({ type: UNLIKE_CITY, Name })}
                  />
                </span>
              ) : (
                <span className="pointer">
                  <IconSet
                    name="unlike"
                    size={'1.7rem'}
                    onClick={() =>
                      storeDispatch({ type: LIKE_CITY, Name, country })
                    }
                  />
                </span>
              )}
            </div>
          </div>

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
              <p className="temp">
                {celcius} <span className="symbol">&#8451;</span> (
                {(celcius * 1.8 + 32).toFixed(1)} &#x2109;)
              </p>
            </div>

            <div>
              <p>Temperature reading at {observation_time}</p>
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

export default MyLocation;
