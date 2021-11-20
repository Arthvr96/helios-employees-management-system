import React, { useContext } from 'react';
import TableShifts from 'components/molecues/TableShifts/TableShifts';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { Table } from './TableGraph.style';

const TableGraph = () => {
  const { shiftsSchema } = useContext(AdminStateContext);
  const days = Object.keys(shiftsSchema);
  const daysSizes = {
    bar1: [],
    bar2: [],
    obs1: [],
    obs2: [],
    coffee: [],
    tickets: [],
  };

  days.forEach((dayName) => {
    const day = shiftsSchema[dayName];
    const typesOfShift = Object.keys(shiftsSchema[dayName]);

    typesOfShift.forEach((shiftName) => {
      if (day[shiftName]) {
        daysSizes[shiftName].push(day[shiftName].length);
      } else {
        daysSizes[shiftName].push(0);
      }
    });
  });

  return (
    <Table className="graph">
      <thead>
        <tr className="daysName">
          <th>friday</th>
          <th>saturday</th>
          <th>sunday</th>
          <th>monday</th>
          <th>tuesday</th>
          <th>wednesday</th>
          <th>thursday</th>
        </tr>
        <tr className="daysNumber">
          <th>12 Nov</th>
          <th>13 Nov</th>
          <th>14 Nov</th>
          <th>15 Nov</th>
          <th>16 Nov</th>
          <th>17 Nov</th>
          <th>18 Nov</th>
        </tr>
      </thead>
      <tbody>
        <TableShifts shiftName="obsługa" shiftId="2" maxShifts={Math.max(...daysSizes.obs1)} />
        <TableShifts shiftName="bar" shiftId="0" maxShifts={Math.max(...daysSizes.bar1)} />
        <TableShifts shiftName="bar2" shiftId="1" maxShifts={Math.max(...daysSizes.bar2)} />
        <TableShifts shiftName="obsługa2" shiftId="3" maxShifts={Math.max(...daysSizes.obs2)} />
        <TableShifts shiftName="kasa" shiftId="5" maxShifts={Math.max(...daysSizes.tickets)} />
        <TableShifts shiftName="kawiarnia" shiftId="4" maxShifts={Math.max(...daysSizes.coffee)} />
      </tbody>
    </Table>
  );
};

export default TableGraph;
