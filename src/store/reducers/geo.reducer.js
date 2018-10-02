import { EVENTS_GEO } from '../actions/geo.actions';

const initState = {
  geo: [],
  metadata: {},
};

export function geoReducer(state = initState, { type, payload }) {
  switch (type) {
    case EVENTS_GEO.TYPE_GEO_GET:
      return {
        ...payload,
      };
    default:
      return state;
  }
}
