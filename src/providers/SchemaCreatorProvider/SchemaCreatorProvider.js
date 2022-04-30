import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { schemaShape } from 'mocks/schemaShape';
import uniqid from 'uniqid';
import HeliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';
import { useGlobalState } from 'providers/GlobalStateProvider/GlobalStateProvider';

const sort = (a, b) => (a.from === b.from ? a.to - b.to : a.from - b.from);
const initSelectedDay = { id: '', name: '' };
const initSelectedWorkplace = { workplaceId: '', workplaceName: '' };

const SchemaCreatorContext = React.createContext({});
export const useSchemaCreatorContext = () => {
  return useContext(SchemaCreatorContext);
};

const SchemaCreatorProvider = ({ children }) => {
  const { authAdmin } = useGlobalState();
  const [schemaShapesData, setSchemaShapesData] = useState([]);
  const [schemaShapesList, setSchemaShapesList] = useState([]);
  const [inProgress, setInProgress] = useState(false);
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
  };

  const handleInitSchemaCreatorUpdate = (id) => {
    const schema = schemaShapesData.find((el) => el.id === id);
    setSchemaInfo({ id: schema.id, name: schema.name });
    setSchemaData({ ...JSON.parse(JSON.stringify(schema.schema)) });
    setSelectedDay(initSelectedDay);
    setSelectedWorkplace(initSelectedWorkplace);
    handleChangePage('goToCreator');
  };

  const fetchGraphSchemaShapes = () => {
    const { getGraphSchemaShapes } = HeliosAppSdk.firestore;
    if (schemaPage === '0' && authAdmin) {
      getGraphSchemaShapes()
        .then((docs) => {
          if (docs.size) {
            const arr = [];
            const arr2 = [];
            docs.forEach((doc) => {
              arr2.push(doc.data());
              arr.push({ id: doc.id, name: doc.data().name });
              console.log(doc.data());
            });
            setSchemaShapesList(arr);
            setSchemaShapesData(arr2);
          } else {
            setSchemaShapesList([]);
            setSchemaShapesData([]);
          }
        })
        .catch((e) => {
          window.alert(e.code);
        });
    }
  };

  const handleSaveNewSchema = () => {
    const { createGraphSchemaShape } = HeliosAppSdk.firestore;
    setInProgress(true);
    const data = {
      id: schemaInfo.id,
      name: schemaInfo.name,
      schema: { ...JSON.parse(JSON.stringify(schemaData)) },
    };
    createGraphSchemaShape(schemaInfo.id, data)
      .then(() => {
        setInProgress(false);
        handleChangePage('goToMenu');
      })
      .catch((e) => {
        setInProgress(false);
        window.alert(e.code);
      });
  };

  const handleUpdateSchema = () => {
    const { updateGraphSchemaShape } = HeliosAppSdk.firestore;
    setInProgress(true);
    const data = {
      id: schemaInfo.id,
      name: schemaInfo.name,
      schema: { ...JSON.parse(JSON.stringify(schemaData)) },
    };
    updateGraphSchemaShape(schemaInfo.id, data)
      .then(() => {
        setInProgress(false);
        handleChangePage('goToMenu');
      })
      .catch((e) => {
        setInProgress(false);
        window.alert(e.code);
      });
  };

  const handleDeleteSchema = (id) => {
    const { deleteGraphSchemaShape } = HeliosAppSdk.firestore;
    setInProgress(true);
    deleteGraphSchemaShape(id)
      .then(() => {
        handleChangePage('goToMenu');
        setInProgress(false);
      })
      .catch((e) => {
        setInProgress(false);
        window.alert(e.code);
      });
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
    const obj = { ...JSON.parse(JSON.stringify(schemaData)) };
    if (action === 'createShift') {
      obj[selectedDay.id][selectedWorkplace.id].shifts.push({
        id: uniqid(),
        ...values,
      });
      obj[selectedDay.id][selectedWorkplace.id].shifts.sort(sort);
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }

    if (action === 'clearShifts') {
      obj[selectedDay.id][selectedWorkplace.id].shifts = [];
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
    if (action === 'changeToggle') {
      obj[selectedDay.id][selectedWorkplace.id].isActive = values.isActive;
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
    if (action === 'onDelete') {
      const arr = [...obj[selectedDay.id][selectedWorkplace.id].shifts].filter(
        (el) => el.id !== values.id,
      );
      obj[selectedDay.id][selectedWorkplace.id].shifts = [...arr];
      setSchemaData({ ...JSON.parse(JSON.stringify(obj)) });
    }
  };

  useEffect(() => {
    fetchGraphSchemaShapes();
  }, [schemaPage, authAdmin]);

  const values = {
    schemaShapesData,
    schemaShapesList,
    inProgress,
    schemaData,
    selectedDay,
    selectedWorkplace,
    schemaPage,
    setInProgress,
    handleChangePage,
    handleSetSelectedDay,
    handleUpdateSchemaDate,
    handleSetWorkplace,
    handleInitSchemaCreator,
    handleSaveNewSchema,
    handleDeleteSchema,
    handleUpdateSchema,
    handleInitSchemaCreatorUpdate,
  };
  return <SchemaCreatorContext.Provider value={values}>{children}</SchemaCreatorContext.Provider>;
};

export default SchemaCreatorProvider;

SchemaCreatorProvider.propTypes = {
  children: PropTypes.node,
};
