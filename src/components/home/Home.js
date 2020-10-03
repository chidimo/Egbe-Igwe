import React from "react";
import { getCurrentCityWeather } from "../city/actions";
import { CityCard } from "../city/CityCard";

import { useCitiesState } from "../city/context/useCities";
import { useWeatherDispatch } from "../city/context/useWeather";
import "./home.scss";

export const Home = () => {
  const { cities } = useCitiesState();
  const wDispatch = useWeatherDispatch();

  React.useEffect(() => {
    cities.slice(0, 3).forEach(city => {
      getCurrentCityWeather(city.Name)(wDispatch)
    });
  }, [ cities, wDispatch ]) 

  return (
    <div className="home">
      <div className="cities-section">
        {cities.length === 0 ? (
          <p>No cities to display</p>
        ) : (
          <>
            {cities
              .sort((a, b) =>
                a.Name.localeCompare(b.Name, { sensitivity: "base" })
              )
              .map((city) => {
                return <CityCard key={city.rank} city={city} />;
              })}
          </>
        )}
      </div>
    </div>
  );
};
