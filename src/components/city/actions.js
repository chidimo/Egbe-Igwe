import axios from 'axios'
import { GET_W_DATA } from './aTypes';
const API_KEY = process.env.REACT_APP_WS_KEY

export const getCurrentCityWeather = Name => async dispatch => {
  console.log('Were here', Name)
  try {
    const { data } = await axios.get(`/current?units=m&access_key=${API_KEY}&query=${Name}`);
    console.log('weather data', data)
    dispatch({ type: GET_W_DATA, Name, data })
    localStorage.setItem('WEATEHR', JSON.stringify(data))
    return { success: true };
  } catch (e) {
    const { response } = e;
    return response?.data;
  }
}
