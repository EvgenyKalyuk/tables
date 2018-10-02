import { reducerPresetData } from 'helpers/handlers';
import { EVENTS_RUBRICS } from '../actions/rubrics.actions';

const initState = {
  rubrics: [],
  metadata: {},
};

export function rubricsReducer(stateCopy = initState, action) {
  const state = { ...stateCopy };

  reducerPresetData({
    action,
    state,
    events: EVENTS_RUBRICS,
  });

  if (action.type === EVENTS_RUBRICS.TYPE_RUBRICS_CLEAR) {
    return { ...initState };
  }

  return state;
}