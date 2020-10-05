import axios from 'axios';
import { GET_W_DATA } from './aTypes';
const API_KEY = process.env.REACT_APP_WS_KEY;

export const getCurrentCityWeather = (Name) => async (dispatch) => {
  try {
    const { data } = await axios.get(
      `/current?units=m&access_key=${API_KEY}&query=${Name}`,
    );

    if (data.current) {
      dispatch({ type: GET_W_DATA, Name, data });
    }
    const cityName = data.location.name;
    return { success: true, cityName };
  } catch (e) {
    const { response } = e;
    return response?.data;
  }
};
