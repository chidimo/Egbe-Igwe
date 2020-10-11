/* eslint-disable no-undef */

const schRes = {
  candidates: [
    {
      formatted_address: 'Benin City, Nigeria',
      geometry: {
        location: {
          lat: 6.334986,
          lng: 5.6037465,
        },
        viewport: {
          northeast: {
            lat: 6.4590254,
            lng: 5.738639699999999,
          },
          southwest: {
            lat: 6.236124999999999,
            lng: 5.5462932,
          },
        },
      },
      name: 'Benin City',
    },
  ],
  status: 'OK',
};

const bnWeather = {
  request: {
    type: 'LatLon',
    query: 'Lat 6.33 and Lon 5.60',
    language: 'en',
    unit: 'm',
  },
  location: {
    name: 'Benin city',
    country: 'Nigeria',
    region: 'Edo',
    lat: '6.250',
    lon: '5.500',
    timezone_id: 'Africa/Lagos',
    localtime: '2020-10-11 03:32',
    localtime_epoch: 1602387120,
    utc_offset: '1.0',
  },
  current: {
    observation_time: '02:32 AM',
    temperature: 23,
    weather_code: 143,
    weather_icons: [
      'https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0006_mist.png',
    ],
    weather_descriptions: ['Mist'],
    wind_speed: 3,
    wind_degree: 197,
    wind_dir: 'SSW',
    pressure: 1013,
    precip: 0,
    humidity: 97,
    cloudcover: 41,
    feelslike: 26,
    uv_index: 1,
    visibility: 2,
    is_day: 'no',
  },
};

export default {
  get: jest.fn().mockImplementation((url) => {
    switch (url) {
      // benin city coordinates
      case '/current?units=m&access_key=undefined&query=6.334986,5.6037465':
        return Promise.resolve({data: bnWeather});
      // search for benin city
      case 'json?input=benin city&inputtype=textquery&fields=formatted_address,name,geometry&key=undefined':
        return Promise.resolve({data: schRes});
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
