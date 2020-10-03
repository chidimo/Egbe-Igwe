import axios from 'axios'
import { GET_W_DATA } from './aTypes';
const API_KEY = process.env.REACT_APP_WS_KEY

console.log('API_KEY', API_KEY, process.env.NODE_ENV)

export const getCurrentCityWeather = Name => async dispatch => {
  try {
    const { data } = await axios.get('`/current?units=m&access_key=${API_KEY}&query=${Name}`');
    console.log('weather data', data)
    dispatch({ type: GET_W_DATA, Name, data })
    localStorage.setItem('WEATEHR', JSON.stringify(data))
    return { success: true };
  } catch (e) {
    const { response } = e;
    return response?.data;
  }
}
