import { API_ENDPOINTS } from 'common/consts';
import { encodeQueryParams } from 'modules/api';

export const EVENTS_VACANCIES = {
  TYPE_VACANCIES_GET: 'TYPE_VACANCIES_GET',
  TYPE_VACANCIES_CLEAR: 'TYPE_VACANCIES_CLEAR',
};

export function getVacancies({ fields = [], geoId, period, isNewOnly, offset, limit, preData = [] }) {
  const queries = encodeQueryParams({
    fields,
    params: [
      { geo_id: geoId },
      { period },
      { is_new_only: isNewOnly },
      { offset },
      { limit },
    ],
  });
  const shortUrl = `${API_ENDPOINTS.VACANCIES}${queries}`;

  return async function (dispatch, getState, apiFetch) {
    try {
      const data = await apiFetch(shortUrl);

      return dispatch({
        type: EVENTS_VACANCIES.TYPE_VACANCIES_GET,
        payload: {
          ...data,
          vacancies: [
            ...preData,
            ...data.vacancies,
          ],
        },
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
