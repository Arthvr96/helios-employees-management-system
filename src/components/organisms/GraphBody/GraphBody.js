import React, { useEffect, useState } from 'react';
import uniqid from 'uniqid';
import GraphWorkplace from 'components/molecules/GraphWorkplace/GraphWorkplace';
import GraphRowShifts from 'components/molecules/GraphRowShifts/GraphRowShifts';
import PropTypes from 'prop-types';

const GraphBody = ({ schema }) => {
  const [rowsValues, setRowsValues] = useState({});

  useEffect(() => {
    const initState = {
      bar1: 1,
      bar2: 1,
      obs1: 1,
      obs2: 1,
      coffee: 1,
      tickets: 1,
      help: 1,
    };

    for (const dayKey in schema) {
      if ({}.hasOwnProperty.call(schema, dayKey)) {
        for (const key in schema[dayKey]) {
          if ({}.hasOwnProperty.call(schema[dayKey], key)) {
            if (initState[key] < schema[dayKey][key].shifts.length) {
              initState[key] = schema[dayKey][key].shifts.length;
            }
          }
        }
      }
    }
    const obj = {};
    for (const key in initState) {
      if ({}.hasOwnProperty.call(initState, key)) {
        const arr = [];
        for (let i = 0; i <= initState[key]; i += 1) {
          arr.push(uniqid());
        }
        obj[key] = [...arr];
      }
    }
    setRowsValues({ ...obj });
  }, []);

  return (
    <tbody>
      <GraphWorkplace name="OBSLUGA" />
      {rowsValues.obs1
        ? rowsValues.obs1.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="obs1"
              shiftIndex={i}
              className={`obs1-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="BAR" />
      {rowsValues.bar1
        ? rowsValues.bar1.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="bar1"
              shiftIndex={i}
              className={`bar1-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="BAR2" />
      {rowsValues.bar2
        ? rowsValues.bar2.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="bar2"
              shiftIndex={i}
              className={`bar2-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="OBSLUGA2" />
      {rowsValues.obs2
        ? rowsValues.obs2.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="obs2"
              shiftIndex={i}
              className={`obs2-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="KASA" />
      {rowsValues.tickets
        ? rowsValues.tickets.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="tickets"
              shiftIndex={i}
              className={`tickets-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="KAWIARNIA" />
      {rowsValues.coffee
        ? rowsValues.coffee.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="coffee"
              shiftIndex={i}
              className={`coffee-${i}`}
              key={el}
            />
          ))
        : null}
      <GraphWorkplace name="Pomoc" />
      {rowsValues.help
        ? rowsValues.help.map((el, i) => (
            <GraphRowShifts
              schema={schema}
              workplace="help"
              shiftIndex={i}
              className={`help-${i}`}
              key={el}
            />
          ))
        : null}
    </tbody>
  );
};

export default GraphBody;

GraphBody.propTypes = {
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
