import React from 'react';
import { apiFetch, encodeQueryParams } from 'modules/api';
import { API_ENDPOINTS } from 'common/consts';

async function getVacancies({ fields = [], geoId, period, isNewOnly, limit, offset }) {
  const fieldParams = encodeQueryParams({
    fields,
    params: [
      { geo_id: geoId },
      { period },
      { is_new_only: isNewOnly },
      { limit },
      { offset },
    ],
  });
  const shortUrl = `${API_ENDPOINTS.VACANCIES}${fieldParams}`;

  try {
    const data = await apiFetch(shortUrl);

    return data;
  } catch (e) {
    throw e;
  }
}

export function vacanciesService(WrappedComponent) {
  return function (props) {
    return (
      <WrappedComponent
        {...props}
        getVacancies={getVacancies}
      />
    );
  };
}
