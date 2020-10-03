import axios from 'axios';

export const setupAxios = () => {
  axios.defaults.baseURL = 'http://api.weatherstack.com/'
  axios.defaults.headers.post['Content-Type'] = 'application/json';
};


