import { getEmployeeInfo } from './helpers';

const validateEmployee = (nameEmployee, workplaceID, shiftEnd, employeesInfo) => {
  const { bar1, bar2, obs1, obs2, coffee, tickets, sex } = getEmployeeInfo(
    nameEmployee,
    employeesInfo,
  );
  let respone;

  switch (workplaceID) {
    case 0:
      respone = bar1;
      break;
    case 1:
      respone = bar2;
      break;
    case 2:
      if (obs1) {
        if (shiftEnd > 23) {
          respone = sex === 'male';
          break;
        }
        respone = true;
        break;
      }
      respone = false;
      break;
    case 3:
      if (obs2) {
        if (shiftEnd > 23) {
          respone = sex === 'male';
          break;
        }
        respone = true;
        break;
      }
      respone = false;
      break;
    case 4:
      respone = coffee;
      break;
    case 5:
      respone = tickets;
      break;
    default:
      break;
  }
  return respone;
};

// Returns an object with people who can take a shift at work. Object is splited on days. Each day is an array. Day keeps next arrays. This arrays represent the type of workplace. Workplace is array too, which holds other arrays that represent separate shifts. Shift array holds short names of employees who gave disposition in line with this shift.
export const getPeoplePerShift = (employeesDispo, shiftsSchema, employeesInfo) => {
  const days = Object.keys(shiftsSchema);
  const peoplePerShift = {
    friday: [],
    saturday: [],
    sunday: [],
    monday: [],
    tuesday: [],
    wednesday: [],
    thursday: [],
  };

  // Iterating through all the days of the week
  days.forEach((dayName) => {
    const workplaces = shiftsSchema[dayName];
    const daySchemaShifts = Object.values(workplaces);
    const employeesPerShiftWholeDay = [];

    daySchemaShifts.forEach((workplaceType, workplaceID) => {
      const workplaceShifts = [];

      if (workplaceType) {
        workplaceType.forEach((shift) => {
          const shiftStart = shift[0];
          const shiftEnd = shift[1];
          const employeesPerShift = [];

          employeesDispo.forEach(({ dyspo, name }) => {
            const employeeDispoStart = parseFloat(dyspo[dayName].from) - 0.75;
            const employeeDispoEnd = parseFloat(dyspo[dayName].to) + 0.75;
            if (employeeDispoStart <= shiftStart && employeeDispoEnd >= shiftEnd) {
              if (validateEmployee(name, workplaceID, shiftEnd, employeesInfo)) {
                employeesPerShift.push(name);
              }
            }
          });

          workplaceShifts.push(employeesPerShift);
        });

        employeesPerShiftWholeDay.push(workplaceShifts);
      } else {
        employeesPerShiftWholeDay.push(false);
      }
    });

    peoplePerShift[dayName].push(...employeesPerShiftWholeDay);
  });

  return peoplePerShift;
};
