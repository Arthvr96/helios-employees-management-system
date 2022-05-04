import React, { useState } from 'react';
import DispoTableWindow from 'components/organisms/DispoTableWindow/DispoTableWindow';
import { CardTemplate } from 'components/templates/CardTemplate/CardTemplate';
import GraphDaysHeader from 'components/molecules/GraphDaysHeader/GraphDaysHeader';
import GraphBody from 'components/organisms/GraphBody/GraphBody';
import PropTypes from 'prop-types';
import { useGraphGenerator } from 'hooks/useGraphGenerator';
import {
  DispoWrapper,
  HideNavButton,
  ScrollWrapper,
  StyledButton,
  Table,
} from './GraphCreator.style';

const GraphCreator = ({ mode, date, dispo, schema, workdays, isHidden, setHidden }) => {
  const { users, graph } = useGraphGenerator(schema, dispo);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);

  console.log(users);
  console.log(graph);

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
          <Table>
            <GraphDaysHeader date={date} />
            {schema && <GraphBody schema={schema} />}
          </Table>
        </CardTemplate>
      </ScrollWrapper>
    </>
  );
};

export default GraphCreator;

GraphCreator.propTypes = {
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
