import { worldCities } from '../data/cities';
import { WA_GLOBAL } from '../utils/storeKeys';

export const initWeatherInfo = {
  current: {
    humidity: 1,
    wind_dir: 'N',
    feelslike: 20,
    wind_speed: 1,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png',
    ],
    temperature: 20,
    observation_time: '',
    weather_descriptions: [],
  },
  location: { country: '' },
};

export const initStoreState = {
  notes: {},
  likes: {},
  weather: {},
  cities: worldCities.slice(0, 15),

  // constructed
  fcngCity: false,
  currentUser: { username: '', notes: [], likedCities: [] },
  currentCity: { Name: '', weatherInfo: initWeatherInfo },
};

export const store = {
  getState: () => JSON.parse(localStorage.getItem(WA_GLOBAL)) || initStoreState,
  saveState: (state) => localStorage.setItem(WA_GLOBAL, JSON.stringify(state)),
};
