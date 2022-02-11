import React, { useState } from 'react';
import PropTypes from 'prop-types';
import uniqid from 'uniqid';
import { ArrowIcone } from 'components/atoms/ArowIcone/ArowIcone';
import {
  DropDownList,
  WrappingButton,
  StyledInterfaceWindowTemplate,
  StyledInterfaceWindowTitle,
  EmployeeWrapper,
  EmployeeAvatar,
  EmployeeInfo,
  EmployeeName,
  EmployeeMail,
  ContentDropDownListWrapper,
} from './DropDownListWindow.style';

const HeaderDropDownList = ({ title, countEmployees, isOpen, handleToggle }) => {
  return (
    <WrappingButton onClick={handleToggle}>
      <StyledInterfaceWindowTemplate isOpen={isOpen}>
        <StyledInterfaceWindowTitle fontSize="s">{`${title} (${countEmployees})`}</StyledInterfaceWindowTitle>
        <ArrowIcone isRotate={isOpen} />
      </StyledInterfaceWindowTemplate>
    </WrappingButton>
  );
};
HeaderDropDownList.propTypes = {
  title: PropTypes.string,
  countEmployees: PropTypes.number,
  isOpen: PropTypes.bool,
  handleToggle: PropTypes.func,
};

const Employee = ({ firstName, lastName, email }) => {
  return (
    <EmployeeWrapper>
      <EmployeeAvatar>
        <span>{firstName.slice(0, 3)}</span>
        <span>{firstName.slice(0, 3)}</span>
      </EmployeeAvatar>
      <EmployeeInfo>
        <EmployeeName>{`${lastName} ${firstName}`}</EmployeeName>
        <EmployeeMail>{email}</EmployeeMail>
      </EmployeeInfo>
    </EmployeeWrapper>
  );
};

Employee.propTypes = {
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  email: PropTypes.string,
};

const ContentDropDownList = ({ isOpen, data }) => {
  return (
    <ContentDropDownListWrapper isOpen={isOpen} isScrollable={data.length > 5}>
      {data.map((item) => (
        <Employee
          firstName={item.firstName}
          lastName={item.lastName}
          email={item.email}
          key={uniqid()}
        />
      ))}
    </ContentDropDownListWrapper>
  );
};
ContentDropDownList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  isOpen: PropTypes.bool,
};

const DropDownListWindow = ({ title, data }) => {
  const [isOpen, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <DropDownList>
      <HeaderDropDownList
        title={title}
        countEmployees={data.length}
        isOpen={isOpen}
        handleToggle={handleToggle}
      />
      <ContentDropDownList isOpen={isOpen} data={data} />
    </DropDownList>
  );
};

export default DropDownListWindow;

DropDownListWindow.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
};
