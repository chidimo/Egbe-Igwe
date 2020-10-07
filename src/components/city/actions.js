import axios from 'axios';
import { gPlacesAPI, wSAPI } from '../../axiosSetup';
import { GET_W_DATA } from '../../context/aTypes';

const WS_API_KEY = process.env.REACT_APP_WS_KEY;
const GP_API_KEY = process.env.REACT_APP_GPLACES_KEY;

const fields = 'formatted_address,name,geometry';

export const getCityWeather = (Name) => async (dispatch) => {
  axios.defaults.baseURL = wSAPI;
  try {
    const { data } = await axios.get(
      `/current?units=m&access_key=${WS_API_KEY}&query=${Name}`,
    );

    if (data.current) {
      dispatch({ type: GET_W_DATA, Name, data });
    }
    return { success: true, data };
  } catch (e) {
    const { response } = e;
    return response?.data;
  }
};

let cancel;
const CancelToken = axios.CancelToken;

export const searchPlaces = async (query) => {
  axios.defaults.baseURL = gPlacesAPI;
  cancel && cancel('cancelled request');

  const canceller = {
    cancelToken: new CancelToken(function executor(c) {
      cancel = c;
    }),
  };

  const { data } = await axios.get(
    `json?input=${query}&inputtype=textquery&fields=${fields}&key=${GP_API_KEY}`,
    canceller,
  );
  return data;
};
