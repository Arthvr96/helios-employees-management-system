import React from 'react';
import PropTypes from 'prop-types';
import { getEmployeeInfo } from 'generatorGraph/helpers';
import { Employee, Avatar, Wrapper, AvatarFullName, AvatarMail } from './EmployeeListItem.style';

const EmployeeListItem = ({ name }) => {
  const employee = getEmployeeInfo(name);
  const fullName = employee.fullName.replace(' ', '.');

  return (
    <Employee>
      <Avatar>
        <span>{employee.name}</span>
      </Avatar>
      <Wrapper>
        <AvatarFullName>{employee.fullName}</AvatarFullName>
        <AvatarMail>{`${fullName}@gmail.com`}</AvatarMail>
      </Wrapper>
    </Employee>
  );
};

export default EmployeeListItem;

EmployeeListItem.propTypes = {
  name: PropTypes.string,
};
