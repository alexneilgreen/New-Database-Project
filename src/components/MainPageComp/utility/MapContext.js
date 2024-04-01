// MapContext.js

//Not in use

import React, { useContext } from 'react';

let MapContext = React.createContext({
  mapRef: null,
  iconLayer: null,
});

export default MapContext;