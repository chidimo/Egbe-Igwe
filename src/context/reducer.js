import { v4 as uuidv4 } from 'uuid';

import {
  LOGIN,
  LOGOUT,
  GET_CITY,
  LIKE_CITY,
  CLEAN_CITY,
  DELIST_CITY,
  ENLIST_CITY,
  UNLIKE_CITY,
  GET_W_DATA,
  NEW_NOTE,
  EDIT_NOTE,
  DELETE_NOTE,
  LOAD_STORE_TO_MEMORY,
  FCNG_CITY,
} from './aTypes';
import { initStoreState, store, initWeatherInfo } from './store';

export const reducer = (state = {}, action) => {
  switch (action.type) {
  case LOAD_STORE_TO_MEMORY: {
    const name = state.currentUser.username;

    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        notes: state.notes[name] || [],
        likedCities: state.likes[name] || [],
      },
    };
  }

  case LOGIN: {
    const name = action.username;
    const u = {
      ...state,
      currentUser: {
        username: name,
        notes: state.notes[name] || [],
        likedCities: state.likes[name] || [],
      },
    };
    store.saveState(u);
    return u;
  }

  case LOGOUT: {
    const updated = {
      ...state,
      currentUser: initStoreState.currentUser,
      currentCity: initStoreState.currentCity,
    };
    store.saveState(updated);
    return updated;
  }

  case GET_W_DATA: {
    let locName = action.Name;
    if (action.data.request.type === 'LatLon') {
      locName = action.data.location.name;
    }
    const updated = {
      ...state,
      weather: { ...state.weather, [locName]: action.data },
      currentCity: {
        ...state.currentCity,
        weatherInfo: action.data,
        Name: action.data.location.name,
      },
    };
    store.saveState(updated);
    return updated;
  }

  case FCNG_CITY: {
    return { ...state, fcngCity: action.isTrue };
  }

  case GET_CITY: {
    const updated = {
      ...state,
      currentCity: {
        ...state.currentCity,
        Name: action.Name,
        weatherInfo: state.weather[action.Name] || initWeatherInfo,
      },
    };
    store.saveState(updated);
    return updated;
  }

  case CLEAN_CITY: {
    const updated = {
      ...state,
      currentCity: initStoreState.currentCity,
    };
    return updated;
  }

  case ENLIST_CITY: {
    const updated = {
      ...state,
      cities: state.cities
        .filter((ct) => ct.Name !== action.city.Name)
        .concat(action.city),
    };
    store.saveState(updated);
    return updated;
  }
  case DELIST_CITY: {
    const updated = {
      ...state,
      cities: state.cities.filter((ct) => ct.Name !== action.Name),
    };
      // this will update cities in global state
      // use this if you want to overwrite what's in localStorage
      // store.saveState(updated);
    return updated;
  }

  case LIKE_CITY: {
    const user = state.currentUser.username;
    const userLikes = state.likes[user] || [];
    const updatedLikes = userLikes.concat(action.Name);

    const newState = {
      ...state,
      likes: { ...state.likes, [user]: updatedLikes },
    };

    const updated = {
      ...newState,
      currentUser: {
        ...state.currentUser,
        likedCities: updatedLikes,
      },
    };
    store.saveState(newState);
    return updated;
  }

  case UNLIKE_CITY: {
    const user = state.currentUser.username;
    const userLikes = state.likes[user] || [];
    const updatedLikes = userLikes.filter((ul) => ul !== action.Name);

    const newState = {
      ...state,
      likes: { ...state.likes, [user]: updatedLikes },
    };

    const updated = {
      ...newState,
      currentUser: {
        ...state.currentUser,
        likedCities: updatedLikes,
      },
    };
    store.saveState(newState);
    return updated;
  }

  case NEW_NOTE: {
    const user = state.currentUser.username;
    const userNotes = state.notes[user] || [];
    const updatedNotes = [
      {
        id: uuidv4(),
        text: action.text,
        city: action.Name,
        timeStamp: new Date().toISOString(),
      },
    ].concat(userNotes);

    const newState = {
      ...state,
      notes: { ...state.notes, [user]: updatedNotes },
    };

    const updated = {
      ...newState,
      currentUser: {
        ...state.currentUser,
        notes: updatedNotes,
      },
    };
    store.saveState(newState);
    return updated;
  }
  case EDIT_NOTE: {
    const user = state.currentUser.username;
    const myNotes = state.notes[user];

    const note = myNotes.filter((nt) => nt.id === action.id)[0];

    if (note) {
      note.text = action.text;
    }

    const updated = {
      ...state,
      notes: {
        ...state.notes,
        [user]: myNotes.map((n) =>
          n.id === action.id ? { ...n, text: action.text } : n,
        ),
      },
    };
    store.saveState(updated);
    return updated;
  }
  case DELETE_NOTE: {
    const user = state.currentUser.username;
    const myNotes = state.notes[user];

    const userNotes = myNotes.filter((nt) => nt.id !== action.id);
    const newState = { ...state, notes: { ...state.notes, [user]: userNotes } };
    const updated = {
      ...newState,
      currentUser: {
        ...state.currentUser,
        notes: userNotes,
      },
    };
    store.saveState(newState);
    return updated;
  }
  default:
    break;
  }
};
