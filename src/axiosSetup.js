import axios from 'axios';

export const wSAPI = 'http://api.weatherstack.com/';
export const gPlacesAPI =
  'https://maps.googleapis.com/maps/api/place/findplacefromtext/';

export const setupAxios = () => {
  // axios.defaults.baseURL = wSAPI;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};
