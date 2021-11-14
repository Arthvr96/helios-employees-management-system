import { heliosEmployes } from 'data/heliosEmployes';
import { employesDyspo } from 'data/employesDyspo';

export const getEmployeeInfo = (name) => {
  let result;
  heliosEmployes.forEach((employee) => {
    if (employee.name === name) {
      result = employee;
    }
  });
  return result;
};
export const getEmployeeDyspo = (name) => {
  let result;
  employesDyspo.forEach((employee) => {
    if (employee.name === name) {
      result = employee;
    }
  });
  return result;
};

export const getNameShift = (idexOfShift) => {
  let nameOfShift;
  switch (idexOfShift) {
    case 0:
      nameOfShift = 'bar1';
      break;
    case 1:
      nameOfShift = 'bar2';
      break;
    case 2:
      nameOfShift = 'obs1';
      break;
    case 3:
      nameOfShift = 'obs2';
      break;
    case 4:
      nameOfShift = 'coffee';
      break;
    case 5:
      nameOfShift = 'tickets';
      break;
    default:
      return null;
  }
  return nameOfShift;
};

export const getDataForDashboard = () => {
  const arr = [];
  let count = 0;
  const arr2 = [];
  let count2 = 0;
  employesDyspo.forEach((employee) => {
    if (employee.numberOfDyspo === 0) {
      arr.push(employee.name);
      count += 1;
    } else {
      arr2.push(employee.name);
      count2 += 1;
    }
  });

  return {
    arr,
    arr2,
    count,
    count2,
  };
};
