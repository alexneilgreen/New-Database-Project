// MapContext.js
import React, { useContext } from 'react';

let MapContext = React.createContext({
  mapRef: null,
  iconLayer: null,
});

export default MapContext;