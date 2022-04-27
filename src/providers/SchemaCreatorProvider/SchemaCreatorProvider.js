import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { schemaShape } from 'mocks/schemaShape';
import uniqid from 'uniqid';

const sort = (a, b) => (a.from === b.from ? a.to - b.to : a.from - b.from);
const initSelectedDay = { id: '', name: '' };
const initSelectedWorkplace = { workplaceId: '', workplaceName: '' };

const SchemaCreatorContext = React.createContext({});
export const useSchemaCreatorContext = () => {
  return useContext(SchemaCreatorContext);
};

const SchemaCreatorProvider = ({ children }) => {
  const [schemaPage, setSchemaPage] = useState('0');
  const [schemaInfo, setSchemaInfo] = useState({ id: '', name: '' });
  const [schemaData, setSchemaData] = useState({ ...JSON.parse(JSON.stringify(schemaShape)) });
  const [selectedDay, setSelectedDay] = useState(initSelectedDay);
  const [selectedWorkplace, setSelectedWorkplace] = useState(initSelectedWorkplace);

  const handleChangePage = (direct) => {
    switch (direct) {
      case 'goToMenu':
        setSchemaPage('0');
        break;
      case 'goToShapes':
        setSchemaPage('1');
        break;
      case 'goToCreateShape':
        setSchemaPage('2');
        break;
      case 'goToCreator':
        setSchemaPage('3');
        break;
      default:
        setSchemaPage('0');
    }
  };

  const handleInitSchemaCreator = (schemaName, initSchema = schemaShape) => {
    setSchemaInfo({ id: uniqid(), name: schemaName });
    setSchemaData({ ...JSON.parse(JSON.stringify(initSchema)) });
    setSelectedDay(initSelectedDay);
    setSelectedWorkplace(initSelectedWorkplace);
    handleChangePage('goToCreator');
    console.log(schemaInfo);
  };

  const handleSetSelectedDay = (values) => {
    if (selectedDay.id !== values.id) {
      setSelectedDay({ ...values });
      setSelectedWorkplace(initSelectedWorkplace);
    } else if (selectedDay.id === values.id) {
      setSelectedDay(initSelectedDay);
      setSelectedWorkplace(initSelectedWorkplace);
    }
  };

  const handleSetWorkplace = (values) => {
    if (selectedWorkplace.id !== values.id) {
      setSelectedWorkplace({ ...values });
    } else if (selectedWorkplace.id === values.id) {
      setSelectedWorkplace(initSelectedWorkplace);
    }
  };

  const handleUpdateSchemaDate = (action, values) => {
    if (action === 'createShift') {
      const obj = { ...JSON.parse(JSON.stringify(schemaData)) };
      obj[selectedDay.id][selectedWorkplace.id].shifts.push({
        id: uniqid(),
        ...values,
      });
      obj[selectedDay.id][selectedWorkplace.id].shifts.sort(sort);
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
    if (action === 'changeToggle') {
      const obj = { ...JSON.parse(JSON.stringify(schemaData)) };
      obj[selectedDay.id][selectedWorkplace.id].isActive = values.isActive;
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
    if (action === 'onDelete') {
      const obj = { ...JSON.parse(JSON.stringify(schemaData)) };
      const arr = [...obj[selectedDay.id][selectedWorkplace.id].shifts].filter(
        (el) => el.id !== values.id,
      );
      obj[selectedDay.id][selectedWorkplace.id].shifts = [...arr];
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
  };

  const values = {
    schemaData,
    selectedDay,
    selectedWorkplace,
    schemaPage,
    handleChangePage,
    handleSetSelectedDay,
    handleUpdateSchemaDate,
    handleSetWorkplace,
    handleInitSchemaCreator,
  };
  return <SchemaCreatorContext.Provider value={values}>{children}</SchemaCreatorContext.Provider>;
};

export default SchemaCreatorProvider;

SchemaCreatorProvider.propTypes = {
  children: PropTypes.node,
};
