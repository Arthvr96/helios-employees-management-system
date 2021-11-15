import TableEmployee from 'components/molecues/TableEmployee/TableEmployee';
import React from 'react';
import { employesDyspo } from 'data/employesDyspo';
import styled from 'styled-components';

const Table = styled.table`
  position: absolute;
  left: 145rem;
  border-bottom: 1px solid black;
  margin-left: 2rem;

  th {
    background-color: ${({ theme }) => theme.colors.grey};
    padding: 0.5rem 0;
  }

  td {
    width: 6rem;
    padding: 0.3rem 0.2rem;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
  }
  td:first-child {
    width: fit-content;
    text-align: center;
    background-color: ${({ theme }) => theme.colors.white};
  }
`;

const TableEmployess = () => {
  return (
    <Table>
      <thead>
        <tr>
          <th>Name</th>
          <th>PT</th>
          <th>SB</th>
          <th>ND</th>
          <th>PN</th>
          <th>WT</th>
          <th>SR</th>
          <th>CZ</th>
        </tr>
      </thead>
      <tbody>
        {employesDyspo.map((employee) => (
          <TableEmployee key={employee.name} employee={employee} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableEmployess;
