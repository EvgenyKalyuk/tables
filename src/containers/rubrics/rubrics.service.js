import React from 'react';
import { apiFetch, encodeQueryParams } from 'modules/api';
import { API_ENDPOINTS } from 'common/consts';

async function getRubrics({ fields = [], geoId, period }) {
  const queries = encodeQueryParams({
    fields,
    params: [
      { geo_id: geoId },
      { period },
    ],
  });
  const shortUrl = `${API_ENDPOINTS.RUBRICS}${queries}`;

  try {
    const data = await apiFetch(shortUrl);

    return data;
  } catch (e) {
    throw e;
  }
}

export function rubricsService(WrappedComponent) {
  return function (props) {
    return (
      <WrappedComponent
        {...props}
        getRubrics={getRubrics}
      />
    );
  };
}
