import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components';

const columns = [
  {
    title: 'Слово',
    name: 'word',
  },
  {
    title: 'Количество',
    name: 'count',
  },
];

export const VacanciesList = ({ data }) => {
  const tableData = Object.keys(data).map((item, index) => ({
    id: index,
    word: item,
    count: data[item],
  }));

  tableData.sort((a, b) => b.count - a.count);

  return (
    <Table columns={columns} data={tableData} />
  );
};

VacanciesList.propTypes = {
  data: PropTypes.object.isRequired,
};
