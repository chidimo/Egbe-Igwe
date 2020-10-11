/* eslint-disable no-undef */

const schRes = {
  request: {
    query: 'enugu',
    results: 2,
  },
  results: [
    {
      name: 'Enugu',
      country: 'Nigeria',
      region: 'Enugu',
      lat: '6.433',
      lon: '7.483',
      timezone_id: 'Africa/Lagos',
      utc_offset: '1.0',
    },
  ],
};

const weatherInfo = {
  request: {
    type: 'City',
    query: 'Enugu, Nigeria',
    language: 'en',
    unit: 'm',
  },
  location: {
    name: 'Enugu',
    country: 'Nigeria',
    region: 'Enugu',
    lat: '6.433',
    lon: '7.483',
    timezone_id: 'Africa/Lagos',
    localtime: '2020-10-11 17:47',
    localtime_epoch: 1602438420,
    utc_offset: '1.0',
  },
  current: {
    observation_time: '04:47 PM',
    temperature: 30,
    weather_code: 116,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png',
    ],
    weather_descriptions: [ 'Partly cloudy' ],
    wind_speed: 11,
    wind_degree: 310,
    wind_dir: 'NW',
    pressure: 1010,
    precip: 0,
    humidity: 66,
    cloudcover: 75,
    feelslike: 36,
    uv_index: 7,
    visibility: 10,
    is_day: 'yes',
  },
};

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
    // Enugu coordinates
    case '/current?units=m&access_key=undefined&query=6.433,7.483':
      return Promise.resolve({ data: weatherInfo });
    case '/current?units=m&access_key=undefined&query=Enugu':
      return Promise.resolve({ data: weatherInfo });
      // search for Enugu
    case '/autocomplete?units=m&access_key=undefined&query=Enugu':
      return Promise.resolve({ data: schRes });
    default:
      // console.log(`UNMATCHED URL: ${url}`);
      throw new Error(`UNMATCHED URL: ${url}`);
    }
  }),
  defaults: {
    headers: {
      post: {
        'Content-Type': 'application/json',
      },
      common: {},
    },
    baseURL: '',
  },

  CancelToken: jest.fn(),
};
