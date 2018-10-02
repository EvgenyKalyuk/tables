import { API_ENDPOINTS } from 'common/consts';
import { apiFetch } from 'modules/api';

export const EVENTS_GEO = {
  TYPE_GEO_GET: 'TYPE_GEO_GET',
};

export function getGeoData() {
  const shortUrl = API_ENDPOINTS.GEO;

  return async function (dispatch) {
    try {
      const data = await apiFetch(shortUrl, {
        method: 'post',
        body: {},
      });

      return dispatch({
        type: EVENTS_GEO.TYPE_GEO_GET,
        payload: data,
      });
    } catch (e) {
      throw e;
    }
  };
}
