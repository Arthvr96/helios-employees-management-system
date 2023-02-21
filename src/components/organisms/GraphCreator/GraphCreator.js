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
import { cloneDeep } from 'lodash';
import { DispoWrapper, HideNavButton, ScrollWrapper, StyledButton } from './GraphCreator.style';

const days = ['day1', 'day2', 'day3', 'day4', 'day5', 'day6', 'day7'];
const workplaces = ['obs1', 'obs2', 'bar1', 'bar2', 'coffee', 'tickets', 'help'];

const GraphCreator = ({
  closeCreator,
  isHidden,
  setHidden,
  mode,
  isPreview,
  date,
  schema,
  dispo,
  workdays,
  graphGeneratorData = { usersGenerated: [], graphGenerated: [] },
}) => {
  const { createGraph } = heliosAppSdk.firestore;
  const { users, graph } = useGraphGenerator(schema, dispo, workdays, mode);
  const { usersGenerated, graphGenerated } = graphGeneratorData;
  const [usersData, setUsersData] = useState([]);
  const [graphData, setGraphData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const tableRef = useRef(null);
  const dispoLeftRef = useRef(null);
  const dispoRightRef = useRef(null);

  useEffect(() => {
    console.log('-graph creator-');
    console.log(`user data`);
    console.log(usersData);
    console.log(`graph Data`);
    console.log(graphData);
  }, [usersData]);

  useEffect(() => {
    console.log(`user data`);
    console.log(usersData);
  }, [usersData]);

  useEffect(() => {
    console.log(`graph Data`);
    console.log(graphData);
  }, [graphData]);

  const handleCancel = () => {
    setHidden(false);
    closeCreator();
  };

  const handleSave = () => {
    const data = {
      schema: JSON.stringify(schema),
      dispo: JSON.stringify(dispo),
      graph: JSON.stringify(graphData),
      users: JSON.stringify(usersData),
      workdays: JSON.stringify(workdays),
      date,
    };
    createGraph(date, data)
      .then(() => {
        setHidden(false);
        closeCreator();
      })
      .catch((e) => alert(e.code));
  };
  // TODO: fix it !
  // useEffect(() => {
  //   const elements = [...tableRef.current.querySelectorAll('.aliasGraph')];
  //   const elements2 = [...dispoLeftRef.current.querySelectorAll('.alias')];
  //   const elements3 = [...dispoRightRef.current.querySelectorAll('.alias')];
  //   const handleClick = (e) => {
  //     if (e.target.classList.value.includes('name') || e.target.classList.value.includes('alias')) {
  //       if (e.target.innerHTML !== 'empty') {
  //         if (e.target.classList.value.includes('highlight')) {
  //           elements.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //           elements2.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //           elements3.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //         } else {
  //           elements.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //           elements2.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //           elements3.forEach((el) => {
  //             el.classList.remove('highlight');
  //           });
  //           elements.forEach((el) => {
  //             if (el.innerHTML === e.target.innerHTML) {
  //               el.classList.add('highlight');
  //             }
  //           });
  //           elements2.forEach((el) => {
  //             if (el.innerHTML === e.target.innerHTML) {
  //               el.classList.add('highlight');
  //             }
  //           });
  //           elements3.forEach((el) => {
  //             if (el.innerHTML === e.target.innerHTML) {
  //               el.classList.add('highlight');
  //             }
  //           });
  //         }
  //       }
  //     }
  //   };
  //
  //   tableRef.current.addEventListener('click', handleClick);
  //   dispoLeftRef.current.addEventListener('click', handleClick);
  //   dispoRightRef.current.addEventListener('click', handleClick);
  // }, []);

  useEffect(() => {
    if (mode === 'create' && users.length) {
      setUsersData(cloneDeep(users));
    }
    if (mode === 'create' && graph.length) {
      setGraphData(cloneDeep(graph));
    }
  }, [users, graph]);

  useEffect(() => {
    if (mode === 'edit' && usersGenerated.length) {
      setUsersData(cloneDeep(usersGenerated));
    }
    if (mode === 'edit' && graphGenerated.length) {
      setGraphData(cloneDeep(graphGenerated));
    }
  }, [usersGenerated, graphGenerated]);

  useEffect(() => {
    if (graphData.length) {
      graphData.forEach((day, dayIndex) => {
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
  }, [graphData]);

  useEffect(() => {
    const percentFields1 = [...dispoLeftRef.current.querySelectorAll('.percentTarget')];
    const percentFields2 = [...dispoRightRef.current.querySelectorAll('.percentTarget')];

    const iterator = (el) => {
      const x = el.classList[1].split('-');
      const address = `.alias-row-${x[2]}`;
      const alias = dispoLeftRef.current.querySelector(address).innerHTML;
      const {
        temporaryInfo: { shiftsCount, dispoCount },
      } = usersData.find((u) => u.alias === alias);
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

    usersData.forEach((user) => {
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
  }, [usersData]);

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
          {isPreview ? (
            <Button onClick={closeCreator} type="button" margin="2rem 0 0 1rem" isCancel>
              Zamknij
            </Button>
          ) : (
            <div>
              <Button onClick={handleSave} type="button">
                Zapisz grafik
              </Button>
              <Button onClick={handleCancel} type="button" margin="2rem 0 0 1rem" isCancel>
                Anuluj
              </Button>
            </div>
          )}
        </CardTemplate>
      </ScrollWrapper>
    </>
  );
};

export default GraphCreator;

GraphCreator.propTypes = {
  isPreview: PropTypes.bool,
  closeCreator: PropTypes.func.isRequired,
  isHidden: PropTypes.bool.isRequired,
  setHidden: PropTypes.func.isRequired,
  mode: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  workdays: PropTypes.objectOf(PropTypes.bool),
  graphGeneratorData: PropTypes.shape({
    graphGenerated: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))),
    usersGenerated: PropTypes.arrayOf(PropTypes.object),
  }),
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
