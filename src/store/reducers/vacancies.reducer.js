import { reducerPresetData } from 'helpers/handlers';
import { EVENTS_VACANCIES } from '../actions/vacancies.actions';

const initState = {
  vacancies: [],
  metadata: {},
};

export function vacanciesReducer(stateCopy = initState, action) {
  const state = { ...stateCopy };

  reducerPresetData({
    action,
    state,
    events: EVENTS_VACANCIES,
  });

  if (action.type === EVENTS_VACANCIES.TYPE_VACANCIES_CLEAR) {
    return { ...initState };
  }

  return state;
}