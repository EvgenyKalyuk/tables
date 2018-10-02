import { combineReducers } from 'redux';

import { geoReducer } from './geo.reducer';

export const reducers = combineReducers({
  geoState: geoReducer,
});
