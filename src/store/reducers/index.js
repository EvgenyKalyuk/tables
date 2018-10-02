import { combineReducers } from 'redux';

import { geoReducer } from './geo.reducer';
import { rubricsReducer } from './rubrics.reducer';
import { vacanciesReducer } from './vacancies.reducer';

export const reducers = combineReducers({
  geoState: geoReducer,
  rubricsState: rubricsReducer,
  vacanciesState: vacanciesReducer,
});
