import { API_ENDPOINTS } from 'common/consts';
import { encodeQueryParams } from 'modules/api';

export const EVENTS_RUBRICS = {
  TYPE_RUBRICS_GET: 'TYPE_RUBRICS_GET',
  TYPE_RUBRICS_CLEAR: 'TYPE_RUBRICS_CLEAR',
};

export function getRubrics({ fields = [], geoId, period }) {
  const queries = encodeQueryParams({
    fields,
    params: [
      { geo_id: geoId },
      { period },
    ],
  });
  const shortUrl = `${API_ENDPOINTS.RUBRICS}${queries}`;

  return async function (dispatch, getState, apiFetch) {
    try {
      const data = await apiFetch(shortUrl);

      return dispatch({
        type: EVENTS_RUBRICS.TYPE_RUBRICS_GET,
        payload: data,
      });
    } catch (e) {
      throw e;
    }
  };
}

export function clearState() {
  return function (dispatch) {
    return dispatch({
      type: EVENTS_RUBRICS.TYPE_RUBRICS_CLEAR,
    });
  };
}
