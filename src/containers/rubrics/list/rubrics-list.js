import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components';

const columns = [
  {
    title: 'Рубрика',
    name: 'rubric',
  },
  {
    title: 'Количество вакансий',
    name: 'count',
  },
];

export const RubricsList = ({ data }) => {
  const tableData = data.map(({ title, counts = {}, id }) => ({
    id,
    rubric: title,
    count: counts.vacancy,
  }));

  tableData.sort((a, b) => b.count - a.count);

  return (
    <Table
      columns={columns}
      data={tableData}
    />
  );
};

RubricsList.propTypes = {
  data: PropTypes.array.isRequired,
};
