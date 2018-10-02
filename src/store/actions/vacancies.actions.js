import { API_ENDPOINTS } from 'common/consts';
import { encodeQueryParams } from 'modules/api';

export const EVENTS_VACANCIES = {
  TYPE_VACANCIES_GET: 'TYPE_VACANCIES_GET',
  TYPE_VACANCIES_CLEAR: 'TYPE_VACANCIES_CLEAR',
};

export function getVacancies({ fields = [], geoId, period }) {
  const queries = encodeQueryParams({
    fields,
    params: [
      { geo_id: geoId },
      { period },
    ],
  });
  const shortUrl = `${API_ENDPOINTS.VACANCIES}${queries}`;

  return async function (dispatch, getState, apiFetch) {
    try {
      const data = await apiFetch(shortUrl);

      return dispatch({
        type: EVENTS_VACANCIES.TYPE_VACANCIES_GET,
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
      type: EVENTS_VACANCIES.TYPE_VACANCIES_CLEAR,
    });
  };
}
