import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { getEmployeeInfo } from 'generatorGraph/helpers';
import { OLDAdminStateContext } from 'providers/OLDAdminStateProvider/OLDAdminStateProvider';
import { Employee, Avatar, Wrapper, AvatarFullName, AvatarMail } from './EmployeeListItem.style';

const EmployeeListItem = ({ name }) => {
  const { employeesInfo } = useContext(OLDAdminStateContext);
  const employee = getEmployeeInfo(name, employeesInfo);
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
