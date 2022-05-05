import { useEffect, useState } from 'react';
import heliosAppSdk from 'HeliosAppSdk/HeliosAppSdk';

export const useFetchDataForGraphPage = () => {
  const { getGraphArchive, getAllDispositions, getGraphSchemaShapes } = heliosAppSdk.firestore;

  const [graphs, setGraphs] = useState({});
  const [dispositions, setDispositions] = useState({});
  const [schema, setSchema] = useState({});
  const [optionsGraphs, setOptionsGraphs] = useState([]);
  const [optionsDispositions, setOptionsDispositions] = useState([]);
  const [optionsSchema, setOptionsSchema] = useState([]);

  const sortDates = (a, b) => {
    const date1 = new Date(a.slice(0, 10));
    const date2 = new Date(b.slice(0, 10));

    return date2 - date1;
  };

  useEffect(() => {
    getGraphArchive().then((respond) => {
      if (respond.size) {
        const arr = [];
        const obj = {};
        respond.forEach((el) => {
          arr.push(el.id);
          obj[el.id] = el.data();
        });
        arr.sort(sortDates);
        setOptionsGraphs([...arr]);
        setGraphs({ ...obj });
      }
    });
    getAllDispositions().then((respond) => {
      if (respond.size) {
        const arr = [];
        const obj = {};
        respond.forEach((el) => {
          arr.push(el.id);
          obj[el.id] = el.data();
        });
        arr.sort(sortDates);
        setOptionsDispositions([...arr]);
        setDispositions({ ...obj });
      }
    });
    getGraphSchemaShapes().then((respond) => {
      if (respond.size) {
        const arr = [];
        const obj = {};
        respond.forEach((el) => {
          arr.push({ id: el.id, name: el.data().name });
          obj[el.id] = el.data();
        });
        setOptionsSchema([...arr]);
        setSchema({ ...obj });
      }
    });
  }, []);

  return {
    graphs,
    dispositions,
    schema,
    optionsSchema,
    optionsDispositions,
    optionsGraphs,
  };
};
