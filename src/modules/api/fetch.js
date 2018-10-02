import { API_URL } from 'common/consts';

export async function apiFetch(shortUrl, params = { method: 'get' }) {
  if (!shortUrl) {
    throw new Error('You should add shortUrl to api request function');
  }

  const url = `${API_URL}/${shortUrl}`;

  const reqMethod = params.method.toUpperCase();

  const headers = {
    'Content-type': 'application/json',
  };

  const fetchArgs = {
    headers,
    method: reqMethod,
  };

  let body = {};

  if (['post', 'put'].some(method => params.method.toLowerCase() === method)) {
    try {
      body = JSON.stringify(params.body);
    } catch (e) {
      throw new Error(`Please check object in body for ${shortUrl}`);
    }

    fetchArgs.body = body;
  }

  try {
    const response = await fetch(url, fetchArgs);
    const data = await response.json();

    return data;
  } catch (e) {
    throw e;
  }
}