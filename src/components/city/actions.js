import axios from 'axios';
import { gPlacesAPI, wSAPI } from '../../axiosSetup';
import { FCNG_CITY, GET_W_DATA } from '../../context/aTypes';

const WS_API_KEY = process.env.REACT_APP_WS_KEY;
const GP_API_KEY = process.env.REACT_APP_GPLACES_KEY;

const fields = 'formatted_address,name,geometry';

export const getCityWeather = (Name, isHomePage) => async (dispatch) => {
  dispatch({ type: FCNG_CITY, isTrue: true });
  axios.defaults.baseURL = wSAPI;

  try {
    const { data } = await axios.get(
      `/current?units=m&access_key=${WS_API_KEY}&query=${Name}`,
    );

    if (data.current) {
      dispatch({ type: GET_W_DATA, Name, data, isHomePage });
    }
    dispatch({ type: FCNG_CITY, isTrue: false });
    return { success: true, data };
  } catch (e) {
    const { response } = e;
    dispatch({ type: FCNG_CITY, isTrue: false });
    return response?.data;
  }
};

let cancel;
const CancelToken = axios.CancelToken;

export const pinpointLocation = (query) => async (dispatch) => {
  axios.defaults.baseURL = wSAPI;

  cancel && cancel('cancelled request');

  const canceller = {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    }),
  };
  try {
    const { data } = await axios.get(
      `/autocomplete?units=m&access_key=${WS_API_KEY}&query=${query}`,
      canceller,
    );
    return data;
  } catch (e) {
    const { response } = e;
    dispatch({ type: FCNG_CITY, isTrue: false });
    return response?.data;
  }
};

export const searchPlaces = (query) => async (dispatch) => {
  axios.defaults.baseURL = gPlacesAPI;
  cancel && cancel('cancelled request');

  const canceller = {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    }),
  };

  try {
    const { data } = await axios.get(
      `json?input=${query}&inputtype=textquery&fields=${fields}&key=${GP_API_KEY}`,
      canceller,
    );
    return data;
  } catch (e) {
    const { response } = e;
    dispatch({ type: FCNG_CITY, isTrue: false });
    return response?.data;
  }
};
