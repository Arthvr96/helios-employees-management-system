export const getEmployeeInfo = (name, employeesInfo) => {
  let result;
  employeesInfo.forEach((employee) => {
    if (employee.name === name) {
      result = employee;
    }
  });
  return result;
};
export const getEmployeeDispo = (name, employesDispo) => {
  let result;
  employesDispo.forEach((employee) => {
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

export const getDataForDashboard = (employeesDispo) => {
  const arr = [];
  let count = 0;
  const arr2 = [];
  let count2 = 0;
  employeesDispo.forEach((employee) => {
    if (employee.numberOfDispo === 0) {
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

export const getHourFormat = (value) => {
  let result = 0;
  if (value % 1 === 0) {
    result = `${value}:00`;
  } else {
    if (value % 1 === 0.5) {
      result = `${parseInt(`${value}`, 10)}:30`;
    }
    if (value % 1 === 0.25) {
      result = `${parseInt(`${value}`, 10)}:15`;
    }
    if (value % 1 === 0.75) {
      result = `${parseInt(`${value}`, 10)}:45`;
    }
  }
  return result;
};
