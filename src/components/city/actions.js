import axios from 'axios';
import {gPlacesAPI, wSAPI} from '../../axiosSetup';
import {GET_W_DATA} from './aTypes';

const WS_API_KEY = process.env.REACT_APP_WS_KEY;
const GP_API_KEY = process.env.REACT_APP_GPLACES_KEY;

const fields = 'formatted_address,name,geometry';

export const getCurrentCityWeather = (Name) => async (dispatch) => {
  axios.defaults.baseURL = wSAPI;
  try {
    const {data} = await axios.get(
      `/current?units=m&access_key=${WS_API_KEY}&query=${Name}`,
    );

    if (data.current) {
      dispatch({type: GET_W_DATA, Name, data});
    }
    const cityName = data.location.name;
    return {success: true, cityName};
  } catch (e) {
    const {response} = e;
    return response?.data;
  }
};

export const searchPlaces = async (text) => {
  axios.defaults.baseURL = gPlacesAPI;

  const {data} = await axios.get(
    `json?input=${text}&inputtype=textquery&fields=${fields}&key=${GP_API_KEY}`,
  );
  return data;
};
