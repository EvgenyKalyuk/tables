export function encodeQueryParams({ params = [], fields = [] }) {
  if (!params.length && !fields.length) {
    return '';
  }

  const queriesParams = createQueryParams(params);
  const fieldsParams = createFieldsParams(fields);

  return [fieldsParams, queriesParams].reduce((acc, item) => {
    return acc.length
      ? `${acc}&${item}`
      : `?${item}`;
  }, '');
}

export function createFieldsParams(fields) {
  return fields.reduce((acc, field) => {
    return acc.length
      ? `${acc}&fields[]=${field}`
      : `fields[]=${field}`;
  }, '');
}

export function createQueryParams(params) {
  return params.reduce((acc, param) => {
    const name = Object.keys(param)[0];
    const value = param[name];

    if (!value) {
      return acc;
    }

    return acc.length
      ? `${acc}&${name}=${value}`
      : `${name}=${value}`;
  }, '');
}
