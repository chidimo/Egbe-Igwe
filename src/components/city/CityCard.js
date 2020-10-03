import React from "react";
import { IconSet } from "../IconSet";

import { DELIST_CITY } from "./aTypes";
import "./city.scss";
import { useCitiesDispatch } from "./context/useCities";
import { useWeatherState } from "./context/useWeather";

export const CityCard = (props) => {
  const { city } = props;
  const { rank, Name } = city;
  const citiesDispatch = useCitiesDispatch();
  const wInfo = useWeatherState();

  const { current } = wInfo[Name] || {
    current: {
      temperature: "",
      weather_icons: [
        "https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
      ]
    }
  };
  
  console.log('current', current);

  return (
    <div className="city-card">
      <div className="name-section">
        <p>
          {Name}{" "}
          <img
            className="weather-icon"
            src={current.weather_icons[0]}
            alt="Weather icon"
          />{" "}
        </p>
        <p>{current.temperature} &#8451; 21 &#x2109;</p>
      </div>

      <div className="delist-city">
        <span onClick={() => citiesDispatch({ type: DELIST_CITY, rank })}>
          <IconSet name="cancel" color="maroon" size="2.5rem" />
        </span>
      </div>
    </div>
  );
};
