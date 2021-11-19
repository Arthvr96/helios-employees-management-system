import React, { useEffect, useContext } from 'react';
import TableGraph from 'components/organisms/TableGraph/TableGraph';
import TableEmployess from 'components/organisms/TableEmployees/TableEmployess';
import { useGraph } from 'generatorGraph/useGraph';
import { getNameShift, getHourFormat } from 'generatorGraph/helpers';
import { shiftsSchema } from 'data/shiftsSchema';
import { AdminStateContext } from 'providers/AdminStateProvider/AdminStateProvider';
import { Wrapper, WrapperButtons, Button, WrapperTabs } from './GraphGeneratorView.style';

const GraphGeneratorView = () => {
  const graph = useGraph();
  const { employesDyspo, getEmployesDyspo, resetEmployesDyspo } = useContext(AdminStateContext);

  const handleGetGraph = () => {
    getEmployesDyspo();
    const days = Object.keys(graph);
    const cells = [...document.querySelectorAll('.shiftCell')];
    const cells2 = [];

    cells.forEach((cell) => {
      cells2.push(cell.classList[1]);
    });

    days.forEach((dayName, dayNumber) => {
      const day = graph[dayName];

      day.forEach((shiftType, i) => {
        if (shiftType) {
          shiftType.forEach((shift, j) => {
            const employeeName = shift[0];
            const shiftStart = getHourFormat(shiftsSchema[dayName][getNameShift(i)][j][0]);
            const shiftEnd = getHourFormat(shiftsSchema[dayName][getNameShift(i)][j][1]);
            const cellAdressStart = `cell-${dayNumber}-${i}-${j}-0`;
            const cellAdressEnd = `cell-${dayNumber}-${i}-${j}-1`;
            const cellAdressEmployee = `cell-${dayNumber}-${i}-${j}-2`;
            cells[cells2.indexOf(cellAdressStart)].innerHTML = shiftStart;
            cells[cells2.indexOf(cellAdressEnd)].innerHTML = shiftEnd;
            cells[cells2.indexOf(cellAdressEmployee)].innerHTML = employeeName;
            if (employeeName === 'empty') {
              cells[cells2.indexOf(cellAdressEmployee)].style.background = 'red';
            }
          });
        }
      });
    });

    employesDyspo.forEach((employee) => {
      days.forEach((day, i) => {
        if (employee.shift[day].length) {
          const cell = document.querySelector(`.${employee.name.replace(' ', '')}${i}`);
          cell.style.background = 'green';
        }
      });
    });
  };

  const handleClearGraph = () => {
    resetEmployesDyspo();
    const cells = [...document.querySelectorAll('.shiftCell')];

    cells.forEach((cell) => {
      cell.innerHTML = '';
    });
  };

  useEffect(() => {
    const graphWrapper = document.querySelector('.graph');

    const handleClick = (e) => {
      if (e.target.classList.contains('shiftCell')) {
        // const el = e.target;
      }
    };

    graphWrapper.addEventListener('click', handleClick);

    return () => {
      graphWrapper.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <Wrapper>
      <WrapperButtons>
        <Button onClick={handleGetGraph}>
          {employesDyspo.length > 0 ? 'generuj grafik' : 'pobierz dyspozycje'}
        </Button>
        <Button disabled>Spróbuj uzupełnic luki</Button>
        <Button onClick={handleClearGraph}>Wyczyśc grafik</Button>
      </WrapperButtons>
      <WrapperTabs>
        <TableGraph />
        <TableEmployess />
      </WrapperTabs>
    </Wrapper>
  );
};

export default GraphGeneratorView;
