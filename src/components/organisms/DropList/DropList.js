import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import EmployeeListItem from 'components/molecues/EmployeeListItem/EmployeeListItem';
import { Wrapper, Header, TitleDropList, Arrow, Content } from './DropList.style';

const DropList = ({ numberOfEmployees, name, className, listEmployees }) => {
  const [height, setHeight] = useState(55);
  const [isOpen, setOpen] = useState(false);

  const onClick = () => {
    setOpen(!isOpen);
  };

  useEffect(() => {
    const item = document.querySelector(`.${className}`);
    if (isOpen) {
      if (numberOfEmployees > 6) {
        setHeight(55 + 50 * 6);
      } else {
        setHeight(55 + 50 * numberOfEmployees);
      }
    } else {
      setHeight(55);
      item.scrollTo(0, 0);
    }
  }, [isOpen]);

  return (
    <Wrapper
      numberOfEmployees={numberOfEmployees}
      className={className}
      isOpen={isOpen}
      heightBox={height}
      onClick={onClick}
    >
      <Header>
        <TitleDropList>{`${name} (${numberOfEmployees})`}</TitleDropList>
        <Arrow isOpen={isOpen} />
      </Header>
      <Content>
        {listEmployees.map((employee) => (
          <EmployeeListItem key={employee} name={employee} />
        ))}
      </Content>
    </Wrapper>
  );
};

export default DropList;

DropList.propTypes = {
  numberOfEmployees: PropTypes.number,
  name: PropTypes.string,
  className: PropTypes.string,
  listEmployees: PropTypes.arrayOf(PropTypes.string),
};
