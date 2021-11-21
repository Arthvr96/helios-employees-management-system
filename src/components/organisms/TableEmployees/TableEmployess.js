import TableEmployee from 'components/molecues/TableEmployee/TableEmployee';
import React, { useContext } from 'react';
import styled from 'styled-components';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';

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
  const { employeesDispo } = useContext(AdminStateContext);
  React.useEffect(() => {
    const table = document.querySelector('.tableEmployeeDyspo');

    const handleClick = (e) => {
      e.target.style.background = 'red';
    };

    table.addEventListener('click', handleClick);

    return () => {
      table.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Table className="tableEmployeeDyspo">
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
        {employeesDispo.map((employee) => (
          <TableEmployee key={employee.name} employee={employee} />
        ))}
      </tbody>
    </Table>
  );
};

export default TableEmployess;
