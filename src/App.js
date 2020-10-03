import React from "react";
import { setupAxios } from "./axiosSetup";
import { Home } from "./components/home/Home";
import { Search } from "./components/search/Search";
import { useCitiesDispatch } from "./components/city/context/useCities";
import { worldCities } from "./data/cities";
import "./App.scss";

setupAxios()
console.log('CODESANDBOX_SSE', process.env.CODESANDBOX_SSE)

export default function App() {
  const citiesDispatch = useCitiesDispatch();

  React.useEffect(() => {
    citiesDispatch({ type: "GET_CITIES", cities: worldCities.slice(0, 15) });
  }, [ citiesDispatch]);

  return (
    <div className="App">
      <Search />
      <Home />
    </div>
  );
}
