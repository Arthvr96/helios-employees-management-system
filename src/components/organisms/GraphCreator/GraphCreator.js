import React, { useEffect, useRef, useState } from 'react';
import DispoTableWindow from 'components/organisms/DispoTableWindow/DispoTableWindow';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import GraphDaysHeader from 'components/molecules/GraphDaysHeader/GraphDaysHeader';
import GraphBody from 'components/organisms/GraphBody/GraphBody';
import PropTypes from 'prop-types';
import { useGraphGenerator } from 'hooks/useGraphGenerator';
import { Button } from 'components/atoms/Button/Button';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { GraphTable } from 'components/atoms/GraphTable/GraphTable';
import { DispoWrapper, HideNavButton, ScrollWrapper, StyledButton } from './GraphCreator.style';

const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
const workplaces = ['obs1', 'obs2', 'bar1', 'bar2', 'coffee', 'tickets', 'help'];

const GraphCreator = ({
  mode,
  date,
  dispo,
  schema,
  workdays,
  isHidden,
  setHidden,
  closeCreator,
}) => {
  const { createGraph } = heliosAppSdk.firestore;
  const { users, graph } = useGraphGenerator(schema, dispo, workdays);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const tableRef = useRef(null);
  const dispoLeftRef = useRef(null);
  const dispoRightRef = useRef(null);

  const handleCancel = () => {
    setHidden(false);
    closeCreator();
  };

  const handleSave = () => {
    const data = {
      schema: JSON.stringify(schema),
      dispo: JSON.stringify(dispo),
      graph: JSON.stringify(graph),
      users: JSON.stringify(users),
      date,
    };
    createGraph(date, data)
      .then(() => {
        setHidden(false);
        closeCreator();
      })
      .catch((e) => alert(e.code));
  };

  useEffect(() => {
    if (graph.length) {
      graph.forEach((day, dayIndex) => {
        day.forEach((workplace, workplaceIndex) => {
          workplace.forEach((shift, shiftIndex) => {
            const address = `.${workplaces[workplaceIndex]}-${shiftIndex}-${days[dayIndex]}-name`;
            const target = tableRef.current.querySelector(address);
            if (workdays[days[dayIndex]]) {
              target.innerHTML = shift;
              if (shift === 'empty') {
                target.classList.add('empty');
              }
            } else {
              const addressTo = `.${workplaces[workplaceIndex]}-${shiftIndex}-${days[dayIndex]}-to`;
              const addressFrom = `.${workplaces[workplaceIndex]}-${shiftIndex}-${days[dayIndex]}-from`;
              const target2 = tableRef.current.querySelector(addressTo);
              const target3 = tableRef.current.querySelector(addressFrom);
              target.innerHTML = 'wolne';
              target.classList.add('freeDay');
              target2.classList.add('freeDay');
              target3.classList.add('freeDay');
            }
          });
        });
      });
    }
  }, [graph]);

  useEffect(() => {
    const percentFields1 = [...dispoLeftRef.current.querySelectorAll('.percentTarget')];
    const percentFields2 = [...dispoRightRef.current.querySelectorAll('.percentTarget')];

    const iterator = (el) => {
      const x = el.classList[1].split('-');
      const address = `.alias-row-${x[2]}`;
      const alias = dispoLeftRef.current.querySelector(address).innerHTML;
      const {
        temporaryInfo: { shiftsCount, dispoCount },
      } = users.find((u) => u.alias === alias);
      const percentage = (shiftsCount / dispoCount).toFixed(2);
      el.innerHTML = percentage;
      if (percentage < 0.3) {
        el.style.background = 'rgba(199,0,0,0.8)';
      } else if (percentage < 0.5) {
        el.style.background = 'rgba(246,236,46,0.8)';
      } else if (percentage < 0.7) {
        el.style.background = 'rgba(145,231,112,0.8)';
      } else if (percentage >= 0.7) {
        el.style.background = 'rgba(49,104,0,0.9)';
      }
    };

    if (percentFields1.length) {
      percentFields1.forEach(iterator);
    }

    if (percentFields2.length) {
      percentFields2.forEach(iterator);
    }

    users.forEach((user) => {
      const shifts = user.temporaryInfo.shiftTaken;
      const address = `.${user.alias.replace(' ', '')}`;
      const el1 = dispoLeftRef.current.querySelector(address);
      const el2 = dispoRightRef.current.querySelector(address);

      [...el1.children].forEach((el, index) => {
        if (index > 0 && index < 8) {
          if (shifts[days[index - 1]]) {
            el.classList.add('shift');
          } else {
            el.classList.remove('shift');
          }
        }
      });
      [...el2.children].forEach((el, index) => {
        if (index > 0 && index < 8) {
          if (shifts[days[index - 1]]) {
            el.classList.add('shift');
          } else {
            el.classList.remove('shift');
          }
        }
      });
    });
  }, [users]);

  return (
    <>
      <HideNavButton isHidden={isHidden} onClick={() => setHidden(!isHidden)}>
        {isHidden ? `↓` : '↑'}
      </HideNavButton>
      <StyledButton isLeft onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? '<' : '>'}
      </StyledButton>
      <StyledButton onClick={() => setIsOpen2(!isOpen2)}>{isOpen2 ? '>' : '<'}</StyledButton>
      <DispoWrapper isVisible={isOpen} isLeft isOpen={isOpen}>
        <DispoTableWindow
          ref={dispoLeftRef}
          selectedCycle={date}
          selectedDispo={Object.values(dispo)}
          handleShowMsg={() => {}}
          workDaysValues={workdays}
          margin="0"
          isShowCase
        />
      </DispoWrapper>
      <DispoWrapper isVisible={isOpen2} isOpen={isOpen2}>
        <DispoTableWindow
          ref={dispoRightRef}
          selectedCycle={date}
          selectedDispo={Object.values(dispo)}
          handleShowMsg={() => {}}
          workDaysValues={workdays}
          margin="0"
          isShowCase
        />
      </DispoWrapper>

      <ScrollWrapper isHidden={isHidden}>
        <CardTemplate margin="0 auto">
          <GraphTable ref={tableRef}>
            <GraphDaysHeader date={date} />
            {schema && <GraphBody schema={schema} />}
          </GraphTable>
          <div>
            <Button onClick={handleSave} type="button">
              Zapisz grafik
            </Button>
            <Button onClick={handleCancel} type="button" margin="2rem 0 0 1rem" isCancel>
              Anuluj
            </Button>
          </div>
        </CardTemplate>
      </ScrollWrapper>
    </>
  );
};

export default GraphCreator;

GraphCreator.propTypes = {
  closeCreator: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  workdays: PropTypes.objectOf(PropTypes.bool),
  dispo: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.bool,
        PropTypes.objectOf(
          PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.bool])),
        ),
      ]),
    ),
  ),
  schema: PropTypes.objectOf(
    PropTypes.objectOf(
      PropTypes.objectOf(
        PropTypes.oneOfType([
          PropTypes.bool,
          PropTypes.arrayOf(
            PropTypes.shape({
              from: PropTypes.number,
              to: PropTypes.number,
              id: PropTypes.string,
            }),
          ),
        ]),
      ),
    ),
  ),
};
