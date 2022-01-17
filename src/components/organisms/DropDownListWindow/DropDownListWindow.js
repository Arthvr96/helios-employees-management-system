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

const Employee = () => {
  return (
    <EmployeeWrapper>
      <EmployeeAvatar>
        <span>Kuj</span>
        <span>Mac</span>
      </EmployeeAvatar>
      <EmployeeInfo>
        <EmployeeName>Kujawiński Maciej</EmployeeName>
        <EmployeeMail>kujawinski.maciej@gmail.com</EmployeeMail>
      </EmployeeInfo>
    </EmployeeWrapper>
  );
};

const ContentDropDownList = ({ isOpen, data }) => {
  return (
    <ContentDropDownListWrapper isOpen={isOpen} isScrollable={data.length > 5}>
      {data.map((item) => (
        <Employee key={uniqid()} />
      ))}
    </ContentDropDownListWrapper>
  );
};
ContentDropDownList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string),
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
  data: PropTypes.arrayOf(PropTypes.string),
};
