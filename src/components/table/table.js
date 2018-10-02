import React from 'react';
import PropTypes from 'prop-types';

export const Table = ({ columns, data }) => {
  const columnNames = columns.map(item => item.name);

  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>
              {column.title}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {!!data && !!data.length && data.map(row => (
          <tr key={row.id}>
            {columnNames.map(item => (
              <td>
                {row[item]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
};
