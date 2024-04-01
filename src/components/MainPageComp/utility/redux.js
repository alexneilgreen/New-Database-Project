// redux.js

//Not in use

import { createStore } from 'redux';

// Action types
const STORE_MAP_REFERENCE = 'STORE_MAP_REFERENCE';
const STORE_ICONLAYER_REFERENCE = 'STORE_ICONLAYER_REFERENCE';

// Actions
export const storeMapReference = (map) => ({
  type: STORE_MAP_REFERENCE,
  payload: map,
});

export const storeIconLayerReference = (iconLayer) => ({
  type: STORE_ICONLAYER_REFERENCE,
  payload: iconLayer,
});

// Reducer
const initialState = {
  map: null,
  iconLayer: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case STORE_MAP_REFERENCE:
      return {
        ...state,
        map: action.payload,
      };
    case STORE_ICONLAYER_REFERENCE:
      return {
        ...state,
        iconLayer: action.payload,
      };
    default:
      return state;
  }
};

// Redux store
const store = createStore(reducer);

export default store;